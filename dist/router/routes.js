"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerpaciente_1 = __importDefault(require("./routerpaciente"));
const routerresultado_1 = __importDefault(require("./routerresultado"));
const routertipoexamen_1 = __importDefault(require("./routertipoexamen"));
const maestraRoutes_1 = __importDefault(require("./maestraRoutes"));
const router = express_1.default.Router();
router.use('/paciente', routerpaciente_1.default);
router.use('/resultado', routerresultado_1.default);
router.use('/test', routertipoexamen_1.default);
router.use('/maestra', maestraRoutes_1.default);
exports.default = router;
