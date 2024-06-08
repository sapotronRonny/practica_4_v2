"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maestraController_1 = require("../controladores/maestraController");
const router = (0, express_1.Router)();
router.get('/', maestraController_1.getAllTablas);
exports.default = router;
