const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendReminderEmail = async (template) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: template.to,
      subject: template.subject,
      html: template.html,
    });
    console.log("Email sent successfully: %s", info.messageId);
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
};

module.exports = { sendReminderEmail };
