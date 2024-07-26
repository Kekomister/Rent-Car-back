"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peticion_1 = require("../controllers/peticion");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/', peticion_1.PeticionController.getPeticiones);
router.post('/', peticion_1.PeticionController.createPeticion);
router.put('/:id', peticion_1.PeticionController.updatePeticion);
router.put('/fin/:id', peticion_1.PeticionController.finalizarPeticion);
router.delete('/:id', peticion_1.PeticionController.deletePeticion);
exports.default = router;
