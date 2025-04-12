const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Ticketech Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

        console.log("📨 Email sent to", to);
    } catch (error) {
        console.error("❌ Email send failed:", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;
