const transporter = require("../config/emailConfig");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendEmail = async (receiver, subject, msg) => {
  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: receiver,
    subject: subject,
    html: msg,
  };
  await transporter.sendMail(emailOptions);
};



module.exports = {
  sendEmail,
  generateOTP,
};
