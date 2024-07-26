"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sucursal_1 = require("../controllers/sucursal");
const auto_1 = __importDefault(require("./auto"));
const autoXsucursal_1 = __importDefault(require("./autoXsucursal"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use("/auto", auto_1.default);
router.use("/auto_sucursal", autoXsucursal_1.default);
router.get('/', sucursal_1.SucursalController.getSucursales);
router.get('/:id', sucursal_1.SucursalController.buscarSucursal);
router.post('/', sucursal_1.SucursalController.createSucursal);
router.put('/:id', sucursal_1.SucursalController.updateSucursal);
router.delete('/:id', sucursal_1.SucursalController.deleteSucursal);
exports.default = router;
