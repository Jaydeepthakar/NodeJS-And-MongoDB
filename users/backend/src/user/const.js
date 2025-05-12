const fs = require("fs");
const path = require("path");


const OTP_EMAIL = {
subject: "our OTP for Password Reset",
  html1: fs.readFileSync(path.join(__dirname, "..","..","public","emailformat","html1.txt")),
  html2: fs.readFileSync(path.join(__dirname, "..","..","public","emailformat","html2.txt"))
};

module.exports = {OTP_EMAIL};