const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com", // or your SMTP provider
    // port: 587,
    // secure: false,
    auth: {
        user: config.get('EmailCredentials.email'), // your email
        pass: config.get('EmailCredentials.password'),  // app password
    }
});

transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP connection error:", error.message);
    } else {
      console.log("SMTP server is ready to send emails!");
    }
});
  

exports.sendEmail = async (to, subject, html) => {
  return transporter.sendMail({
    from: `"MyApp" <${config.get('databaseSettings.EmailCredentials.email')}>`,
    to,
    subject,
    html
  });
};
