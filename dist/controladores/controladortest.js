"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletetest = exports.updatetest = exports.createtest = exports.gettestById = exports.getAlltests = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los tipe test
const getAlltests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield prisma.tipo_de_examen.findMany({
            where: {
                estado: {
                    not: 'ELIMINADO',
                },
            },
        });
        res.status(200).json(test);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de examenes ', error: error.message });
    }
});
exports.getAlltests = getAlltests;
// Obtener un resultado por su ID
const gettestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tests = yield prisma.tipo_de_examen.findUnique({
            where: {
                id_examen: Number(id),
            },
        });
        if (!tests || tests.estado === 'ELIMINADO') {
            return res.status(404).json({ message: 'tipo de examen no encontrado' });
        }
        res.status(200).json(tests);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de examenes', error: error.message });
    }
});
exports.gettestById = gettestById;
// Crear un nuevo test
const createtest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Descripcion, Indicaciones } = req.body;
    try {
        const nuevotest = yield prisma.tipo_de_examen.create({
            data: {
                Descripcion,
                Indicaciones,
            },
        });
        res.status(201).json(nuevotest);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el tipo de examen', error: error.message });
    }
});
exports.createtest = createtest;
// Actualizar un tipo de examen existente
const updatetest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Descripcion, Indicaciones } = req.body;
    try {
        const testActualizado = yield prisma.tipo_de_examen.update({
            where: {
                id_examen: Number(id),
            },
            data: {
                Descripcion,
                Indicaciones,
            },
        });
        res.status(200).json(testActualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tipo de examen', error: error.message });
    }
});
exports.updatetest = updatetest;
// Eliminar un tipo de examen
const deletetest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const testEliminado = yield prisma.tipo_de_examen.update({
            where: { id_examen: Number(id) },
            data: { estado: 'ELIMINADO' },
        });
        res.status(200).json(testEliminado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tipo de examen', error: error.message });
    }
});
exports.deletetest = deletetest;
