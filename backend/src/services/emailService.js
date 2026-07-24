const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (email, name) => {
  // Test SMTP setup (e.g. Mailtrap or console mock)
  console.log(`[Email Service] Welcome email sent to ${name} (${email})`);
};

module.exports = { sendWelcomeEmail };