const boom = require('@hapi/boom')
const nodemailer = require('nodemailer')
const { UserService } = require('../services/user.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

const userService = new UserService()

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw boom.unauthorized()
    }

    delete user.dataValues.password
    delete user.dataValues.recoveryToken
    return user
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    }
  }

  async sendRecovery(email) {
    const user = await userService.findByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })
    const link = `http://myfrontend.com/recovery?token=${token}`
    await userService.update(user.id, { recoveryToken: token })
    const mail = {
      from: config.smtpEmail,
      to: user.email,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    })
    await transporter.sendMail(infoMail)
    return { message: 'mail sent' }
  }

  async changePassword(token, newPassword) {
    try {
      const payload = await jwt.verify(token, config.jwtSecret)

      const user = await userService.findOne(payload.sub)

      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }
      const hashedPassword = await bcrypt.hash(newPassword, 7)
      await userService.update(user.id, {
        recoveryToken: null,
        password: hashedPassword
      })
      return { message: 'password changed' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = { AuthService }
