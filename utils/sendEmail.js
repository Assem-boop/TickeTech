const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,        // ✅ use smtp.gmail.com
    port: process.env.EMAIL_PORT,        // ✅ use 587
    secure: false,                       // ❗ Gmail requires STARTTLS, so use false
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
    }
;

module.exports = sendEmail;
