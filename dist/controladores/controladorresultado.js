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
exports.deleteResultado = exports.updateResultado = exports.createResultado = exports.getresultadoById = exports.getAllRESULTADOS = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los RESULTDOS
const getAllRESULTADOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultados = yield prisma.resultado.findMany({
            where: {
                estado: {
                    not: 'ELIMINADO',
                },
            },
        });
        res.status(200).json(resultados);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los resultado ', error: error.message });
    }
});
exports.getAllRESULTADOS = getAllRESULTADOS;
// Obtener un resultado por su ID
const getresultadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield prisma.resultado.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!resultado || resultado.estado === 'ELIMINADO') {
            return res.status(404).json({ message: 'resultado no encontrado' });
        }
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el resultado', error: error.message });
    }
});
exports.getresultadoById = getresultadoById;
// Crear un nuevo resultado
const createResultado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Resultado_test, valor_paga, observaciones, paciente_id, examen_id } = req.body;
    try {
        const nuevoResultado = yield prisma.resultado.create({
            data: {
                Resultado_test,
                valor_paga,
                observaciones,
                paciente: { connect: { id_paciente: paciente_id } },
                tipo_de_examen: { connect: { id_examen: examen_id } }
            },
        });
        res.status(201).json(nuevoResultado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el resultado', error: error.message });
    }
});
exports.createResultado = createResultado;
// Actualizar un resultado existente
const updateResultado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Resultado_test, valor_paga, observaciones, paciente_id, examen_id } = req.body;
    try {
        const resultadoActualizado = yield prisma.resultado.update({
            where: {
                id: Number(id),
            },
            data: {
                Resultado_test,
                valor_paga,
                observaciones,
                paciente: { connect: { id_paciente: paciente_id } },
                tipo_de_examen: { connect: { id_examen: examen_id } }
            },
        });
        res.status(200).json(resultadoActualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el resultado', error: error.message });
    }
});
exports.updateResultado = updateResultado;
// Eliminar un resultado
const deleteResultado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultadoEliminado = yield prisma.resultado.update({
            where: { id: Number(id) },
            data: { estado: 'ELIMINADO' },
        });
        res.status(200).json(resultadoEliminado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el resultado', error: error.message });
    }
});
exports.deleteResultado = deleteResultado;
