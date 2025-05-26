const db = require("../db/index");
const cron = require("node-cron");
const moment = require("moment");
const { ReminderTemplate } = require("./Template/ReminderTemplate");
const { sendReminderEmail } = require("../helpers/sendReminderEmail");
async function remindermail() {
  try {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("Current Date and Time:", currentDateTime);
    let time48HoursAgo = moment()
      .add(48, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    console.log("Appointments from:", time48HoursAgo, "to", currentDateTime);
    const appointments = await db("appointments")
      .select("id", "name", "appointment_on", "email", "time", "treatment")
      .where({ status: 1 })
      .where("appointment_schedule_on", ">=", currentDateTime)
      .andWhere("appointment_schedule_on", "<=", time48HoursAgo)
      .andWhere({ is_reminder_sent: 0 });
    console.log("Appointments in Reminder Window:", appointments);
    if (appointments.length > 0) {
      for (const appointment of appointments) {
        const { id, name, appointment_on, email, time, treatment } =
          appointment;
        console.log(`Sending reminder to: ${name} (${email})`);
        const emailContent = ReminderTemplate({
          name,
          appointment_on: moment(appointment_on).format("DD MMMM YYYY"),
          time: moment(time, "HH:mm").format("HH:mm"),
          treatment,
        });
        try {
          await sendReminderEmail({
            to: email,
            subject: "Upnailz: Appointment Reminder",
            html: emailContent,
          });
          await db("appointments")
            .where({ id })
            .update({ is_reminder_sent: 1 });
          console.log(`Reminder email successfully sent to ${email}`);
        } catch (emailError) {
          console.error(
            `Failed to send reminder email to ${email}:`,
            emailError.message
          );
        }
      }
    } else {
      console.log("No appointments in the reminder window.");
    }
  } catch (error) {
    console.error(
      "Error fetching appointments or sending mail:",
      error.message
    );
  }
}
module.exports = {
  remindermail,
};