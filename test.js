/* const bcrypt = require('bcrypt')

async function hashPassword() {
  const mypassword = 'admin123'
  const hash = await bcrypt.hash(mypassword, 7)
  console.log(hash)
}

async function verifyPassword() {
  const mypassword = 'admin123'
  const hash = '$2b$07$txAA/Az5BJ8ORWjraNvPF.oX3cVtGt3Jj8YfJtT87LbzgNKlSxzym'
  const isMatch = await bcrypt.compare(mypassword, hash)
  console.log(isMatch)
}

verifyPassword() */

/* +++++++++token-sign +++++++++++++++++++++*/
const jwt = require('jsonwebtoken')

const secret = 'Dios'

const payload = {
  sub: 1,
  role: 'superadmin'
}

const signToken = (payload, secret) => {
  return jwt.sign(payload, secret)
}
signToken(payload, secret)
/* console.log(signToken(payload, secret)) */

/* +++++++++++verifyToken +++++++++++++++++++++*/

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjQ1ODQ3OTQ2fQ.pYUVfQYW3m1d2oTbECkeGMTcB1KsYyt5Jyg1IDyYvM0'

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret)
}
verifyToken(token, secret)
/* console.log(verifyToken(token, secret)) */

module.exports = {
  signToken,
  verifyToken
}
