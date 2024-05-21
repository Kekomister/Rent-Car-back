import express from 'express';
import { PeticionController } from '../controllers/peticion';

const router = express.Router();

router.use(express.json());

router.get('/', PeticionController.getPeticiones)

router.post('/', PeticionController.createPeticion)

router.put('/:id', PeticionController.updatePeticion)

router.put('/fin/:id', PeticionController.finalizarPeticion)

router.delete('/:id', PeticionController.deletePeticion)

export default router;