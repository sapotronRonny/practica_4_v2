import { Router} from 'express';
import {getAllRESULTADOS, getresultadoById, createResultado, updateResultado, deleteResultado} from '../controladores'

const router = Router();

router.get('/', getAllRESULTADOS);
router.get('/:id', getresultadoById);
router.post('/', createResultado);
router.put('/:id', updateResultado);
router.delete('/:id', deleteResultado);

export default router;