"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peticion_1 = __importDefault(require("./peticion"));
const mail_1 = __importDefault(require("./mail"));
const usuario_1 = require("../controllers/usuario");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use("/peticion", peticion_1.default);
router.use("/mail", mail_1.default);
router.get('/', usuario_1.UsuarioController.getUsuarios);
router.post('/', usuario_1.UsuarioController.createUsuario);
router.put('/:id', usuario_1.UsuarioController.updateUsuario);
router.delete('/:id', usuario_1.UsuarioController.deleteUsuario);
exports.default = router;
