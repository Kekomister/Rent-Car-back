"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auto_1 = require("../controllers/auto");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
var upload = (0, multer_1.default)({ dest: './.uploads' });
router.use(express_1.default.json());
router.get('/', auto_1.AutoController.getAuto);
router.post('/imagen', upload.any(), auto_1.AutoController.getImagen);
router.post('/', upload.any(), auto_1.AutoController.createAuto);
router.put('/:id', upload.any(), auto_1.AutoController.updateAuto);
router.delete('/:id', auto_1.AutoController.deleteAuto);
exports.default = router;
