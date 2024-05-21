import express from 'express';
import { Auto_SucursalController } from '../controllers/auto_sucursal';

const router = express.Router();

router.use(express.json());

router.get('/', Auto_SucursalController.getAuto_Sucursal)

router.get('/:id', Auto_SucursalController.buscarAuto_Sucursal)

router.post('/', Auto_SucursalController.createNewAuto_Sucursal)

router.post('/:id', Auto_SucursalController.createOldAuto_Sucursal)

router.put('/:id', Auto_SucursalController.updateAuto_Sucursal)

router.delete('/:id', Auto_SucursalController.deleteAuto_Sucursal)

export default router;