const express = require('express')
const passport = require('passport')
const router = express.Router()
const { AuthService } = require('../services/auth.service')
const autoService = new AuthService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const rta = await autoService.singToken(user)
      res.json(rta)
    } catch (error) {
      next(error)
    }
  }
)
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body
    const rta = await autoService.sendRecovery(email)
    res.json(rta)
  } catch (error) {
    next(error)
  }
})

router.post('/change-passport', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const rta = await autoService.changePassword(token, newPassword)
    res.json(rta)
  } catch (error) {
    next(error)
  }
})

module.exports = router
