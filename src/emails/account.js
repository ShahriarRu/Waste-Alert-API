const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "shahriarcse26@gmail.com",
    subject: "Thanks for joining Greenary Waste Management community",
    text: `Hey ${name}, We welcome you to contribute to our community. Your contribution will help us to keep your residential area free of waste.`,
  });
};

module.exports = { sendWelcomeEmail };
