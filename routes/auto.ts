import express from 'express';
import { AutoController } from '../controllers/auto';

import multer from 'multer';

const router = express.Router();
var upload = multer({ dest: './.uploads' })
router.use(express.json());

router.get('/', AutoController.getAuto)

router.post('/imagen', upload.any(), AutoController.getImagen)

router.post('/', upload.any(), AutoController.createAuto)

router.put('/:id', upload.any(), AutoController.updateAuto)

router.delete('/:id', AutoController.deleteAuto)

export default router;