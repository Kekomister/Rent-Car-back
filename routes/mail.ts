import express from 'express';
import { MailController } from '../controllers/mail';

const router = express.Router();

router.use(express.json());

router.post('', MailController.postMail);

export default router;