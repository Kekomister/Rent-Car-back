import express from 'express';
import usuario from './usuario';
import sucursal from './sucursal';

const router = express.Router();

router.use(express.json());

router.use("/usuario",usuario);
router.use("/sucursal",sucursal);

export default router;