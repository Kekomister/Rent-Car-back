import * as nodemailer from 'nodemailer';
import winston, { log } from 'winston';
import dotenv from "dotenv";
dotenv.config();

const MAIL_HOST = "gmail"
const MAIL_USERNAME = "jeremyg1999@gmail.com"
const MAIL_PASSWORD = "ngaj qpxd yxqn lwse"

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export var msj : string;

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: MAIL_HOST,
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD
        }

    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    logger.info(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(error);
            msj = error.message;
        } else {
            logger.info('Email sent: ' + info.response);
            msj = "";
        }
    });
}