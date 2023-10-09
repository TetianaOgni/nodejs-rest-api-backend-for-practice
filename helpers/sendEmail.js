const nodemailer = require("nodemailer");
const { URK_NET_EMAIL_FROM, URK_NET_EMAIL_PASSWORD } = process.env; //получаем переменные окружения из объекта process.env благодаря require("dotenv").config();
const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: URK_NET_EMAIL_FROM,
    pass: URK_NET_EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: URK_NET_EMAIL_FROM };
  return transport.sendMail(email);
};

module.exports = sendEmail;
