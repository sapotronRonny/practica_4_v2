import { Router} from 'express';
import {getAllTablas} from '../controladores/maestraController';

const router = Router();

router.get('/', getAllTablas);


export default router;