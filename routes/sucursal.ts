import express from 'express';
import { SucursalController } from '../controllers/sucursal';
import auto from './auto';
import auto_sucursal from './autoXsucursal';

const router = express.Router();

router.use(express.json());

router.use("/auto", auto);
router.use("/auto_sucursal", auto_sucursal);

router.get('/', SucursalController.getSucursales)

router.get('/:id', SucursalController.buscarSucursal)

router.post('/', SucursalController.createSucursal)

router.put('/:id', SucursalController.updateSucursal)

router.delete('/:id', SucursalController.deleteSucursal)

export default router;