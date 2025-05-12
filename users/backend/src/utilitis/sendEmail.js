const transporter = require("../config/emailConfig");

const sendEmail = async (receiver, subject, msg) => {
    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver,
        subject: subject,
        html: msg,
    };
    await transporter.sendMail(emailOptions);
};

module.exports = { sendEmail };