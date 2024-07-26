"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("./usuario"));
const sucursal_1 = __importDefault(require("./sucursal"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use("/usuario", usuario_1.default);
router.use("/sucursal", sucursal_1.default);
exports.default = router;
