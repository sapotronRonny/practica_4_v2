import { Router} from 'express';
import {getAllPACIENTES, getpacienteById, createpaciente, updatePaciente, deletePaciente} from '../controladores'

const router = Router();

router.get('/', getAllPACIENTES);
router.get('/:id', getpacienteById);
router.post('/', createpaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;