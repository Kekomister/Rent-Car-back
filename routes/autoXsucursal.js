"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auto_sucursal_1 = require("../controllers/auto_sucursal");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/', auto_sucursal_1.Auto_SucursalController.getAuto_Sucursal);
router.get('/:id', auto_sucursal_1.Auto_SucursalController.buscarAuto_Sucursal);
router.post('/', auto_sucursal_1.Auto_SucursalController.createNewAuto_Sucursal);
router.post('/:id', auto_sucursal_1.Auto_SucursalController.createOldAuto_Sucursal);
router.put('/:id', auto_sucursal_1.Auto_SucursalController.updateAuto_Sucursal);
router.delete('/:id', auto_sucursal_1.Auto_SucursalController.deleteAuto_Sucursal);
exports.default = router;
