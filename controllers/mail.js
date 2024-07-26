"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const mailService_1 = require("../config/mailService");
class MailController {
}
exports.MailController = MailController;
_a = MailController;
MailController.postMail = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = '2041@gmail.com';
    const to = req.body.to;
    const subject = req.body.subject;
    const mailTemplate = req.body.mailTemplate;
    (0, mailService_1.sendMail)(from, to, subject, mailTemplate);
    setTimeout(() => {
        res.json(mailService_1.msj);
    }, 3000);
}));
