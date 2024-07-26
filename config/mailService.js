"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.msj = void 0;
const nodemailer = __importStar(require("nodemailer"));
const winston_1 = __importDefault(require("winston"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MAIL_HOST = "gmail";
const MAIL_USERNAME = "jeremyg1999@gmail.com";
const MAIL_PASSWORD = "ngaj qpxd yxqn lwse";
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.json(),
    transports: [new winston_1.default.transports.Console()]
});
const sendMail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
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
            exports.msj = error.message;
        }
        else {
            logger.info('Email sent: ' + info.response);
            exports.msj = "";
        }
    });
});
exports.sendMail = sendMail;
