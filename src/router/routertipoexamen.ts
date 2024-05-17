import { Router } from 'express';
import {getAlltests, gettestById, createtest, updatetest, deletetest} from '../controladores'

const router = Router();

router.get('/', getAlltests);
router.get('/:id', gettestById);
router.post('/', createtest);
router.put('/:id', updatetest);
router.delete('/:id', deletetest);

export default router;