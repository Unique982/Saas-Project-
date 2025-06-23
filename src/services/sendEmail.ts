import nodemailer from "nodemailer";

import { config } from "dotenv";
config();
// interface
interface IMailInformation {
  to: string;
  subject: string;
  text: string;
}
const sendMail = async (mailInformation: IMailInformation) => {
  //mailInformation: IMailInformation
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const mailFormatObject = {
    from: `Saas Project 2 $<{process.env.NODEMAILER_EMAIL}>`,
    to: mailInformation.to,
    subject: mailInformation.subject,
    html: mailInformation.text,
  };
  try {
    await transporter.sendMail(mailFormatObject);
  } catch (err) {
    console.log(err);
  }
};
export default sendMail;
