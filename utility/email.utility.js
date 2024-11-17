import nodemailer from 'nodemailer';
import logger from './logger.utility.js';

const sendEmail = async (recipientEmail, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'mediboard.care@gmail.com',
        pass: 'fsbfirczuyjrxorp',
      },
    });

    const mailOptions = {
      from: 'mediboard.care@gmail.com',
      to: recipientEmail,
      subject: subject,
      html: body,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.log('Email sent:', info.response);
  } catch (error) {
    logger.error('Error sending email:', error);
  }
};

export default sendEmail;
