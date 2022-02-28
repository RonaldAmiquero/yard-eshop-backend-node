const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('./../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 7)
    const newUser = await models.User.create({
      ...data,
      password: hashedPassword
    })
    delete newUser.dataValues.password
    return newUser
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    })
    return rta
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    })
    return rta
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const rta = await user.update(changes)
    return rta
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

module.exports = { UserService }
