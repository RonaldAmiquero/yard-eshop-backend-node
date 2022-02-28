const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'roamz.developer@gmail.com',
      pass: 'oqpreyewtyzjqqpa'
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'roamz.developer@gmail.com', // sender address
    to: 'roamz.2017@gmail.com', // list of receivers
    subject: 'Que Dios te bendiga ✔', // Subject line
    text: 'vamos con todo, esto es enviado desde node app', // plain text body
    html: '<b>vamos con todo, esto es enviado desde node app</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail()
