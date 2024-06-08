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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTablas = void 0;
const httpClient_1 = __importDefault(require("../utils/httpClient"));
// URL del servicio REST de tu compañero
const externalServiceURL = 'http://192.168.10.31:3011/api/registros';
// Controlador para obtener los datos desde el servicio REST de tu compañero
const getAllTablas = (resq, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Recibida solicitud para obtener todas las tablas');
    try {
        const data = yield httpClient_1.default.get(externalServiceURL);
        console.log('Datos recibidos del servicio externo:', data);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error al obtener datos del servicio externo:', error);
        res.status(500).json({ message: 'Error al obtener datos del servicio externo XD' });
    }
});
exports.getAllTablas = getAllTablas;
