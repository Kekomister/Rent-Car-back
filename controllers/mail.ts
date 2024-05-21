import { Request, Response } from 'express';
import { sendMail, msj } from "../config/mailService";

export class MailController {

    static postMail = (async (req: Request, res: Response) => {
        const from: string = '2041@gmail.com';
        const to: string = req.body.to;
        const subject: string = req.body.subject;
        const mailTemplate: string = req.body.mailTemplate;

        sendMail(from, to, subject, mailTemplate);
        setTimeout(() => {
            res.json(msj)
        },3000);
    })

}