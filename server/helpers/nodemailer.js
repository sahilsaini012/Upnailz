// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });
// const mailer = async (emails, subject, message) => {
//   try {
//     const emailPromises = emails.map((email) =>
//       transporter.sendMail({
//         from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_FROM_ADDRESS}>`,
//         to: email,
//         subject: subject,
//         text: message,
//       })
//     );
//     await Promise.all(emailPromises);
//     res.json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send emails" });
//   }
// };
// module.exports = { mailer };



const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});
const mailer = async (template) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: template.to,
      subject: template.subject,
      html: template.html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    return { success: false, message: "Failed to send emails" };

  }
};
module.exports = { mailer };