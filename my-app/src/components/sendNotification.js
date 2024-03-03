const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.KEY);
// export function sendNotification(task, userCredentials) {
//   const msg = {
//     to: userCredentials.email,
//     from: "stemtaskmanagement@gmail.com",
//     subject: "Task Reminder:" + task.subject + "is due today.",
//     text:
//       "Your task, " +
//       task.description +
//       ", is due on " +
//       task.date +
//       ". Visit STEMTask to complete your task",
//   };
//   sgMail
//     .send(msg)
//     .then(() => console.log("Email sent successfully"))
//     .catch((error) => console.error("Error sending email:", error));
// }
const msg = {
    to: "qmw9849@gmail.com",
    from: "stemtaskmanagement@gmail.com",
    subject: "Task Reminder:is due today.",
    text:
      "Your task, " +
     
      ", is due on " +
     
      ". Visit STEMTask to complete your task",
  };
  sgMail
    .send(msg)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Error sending email:", error));


// // Import necessary modules
// import sgMail from "@sendgrid/mail";

// // Function to send email notification
// export const sendNotification = (task, user) => {
//   const msg = {
//     to: user.email,
//     from: "stemtaskmanagement@gmail.com",
//     subject: "Task Reminder: " + task.subject,
//     text: `Hi there!\n\nJust a reminder that your task "${task.subject}" is due today.\n\nTask Description: ${task.description}\nTask Deadline: ${task.date}\n\nRegards,\nThe STEMTask Team`,
//   };

//   sgMail.setApiKey(process.env.KEY); // Set SendGrid API key here

//   sgMail
//     .send(msg)
//     .then(() => console.log("Email sent successfully"))
//     .catch((error) => console.error("Error sending email:", error));
// };

// // Function to check for due tasks and send notifications
// export const checkDueTasksAndNotify = (tasks, userCredentials) => {
//   const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format

//   tasks.forEach((task) => {
//     if (task.date === currentDate) {
//       sendNotification(task, userCredentials); // Pass userCredentials to sendNotification
//     }
//   });
// };
