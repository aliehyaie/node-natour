const nodeMailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      password: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Ali Ehyaie <aliehyaie9470@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports=sendEmail;