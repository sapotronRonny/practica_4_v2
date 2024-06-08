import express from 'express';
import routerpaciente from './routerpaciente';
import routerresultado from './routerresultado';
import routertipoexamen from './routertipoexamen';
import maestraRoutes from './maestraRoutes';


const router = express.Router();

router.use('/paciente', routerpaciente);
router.use('/resultado', routerresultado);
router.use('/test', routertipoexamen);
router.use('/maestra', maestraRoutes);


export default router;

