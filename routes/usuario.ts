import express from 'express';
import peticion from './peticion';
import mail from './mail';
import { UsuarioController } from '../controllers/usuario';

const router = express.Router();

router.use(express.json());

router.use("/peticion",peticion);
router.use("/mail",mail);

router.get('/', UsuarioController.getUsuarios)

router.post('/', UsuarioController.createUsuario)

router.put('/:id', UsuarioController.updateUsuario)

router.delete('/:id', UsuarioController.deleteUsuario)

export default router;