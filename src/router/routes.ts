import express from 'express';
import routerpaciente from './routerpaciente';
import routerresultado from './routerresultado';
import routertipoexamen from './routertipoexamen';

const router = express.Router();

router.use('/paciente', routerpaciente);
router.use('/resultado', routerresultado);
router.use('/test', routertipoexamen);

export default router;