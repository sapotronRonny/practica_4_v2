"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
// Implementación de axiosClient
const axiosClient = {
    get: (url) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Making request to ${url} with axios`);
        try {
            const response = yield axios_1.default.get(url);
            console.log('Response received:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('Error al obtener datos del servicio externo con axios:', error);
            throw new Error('Error al obtener datos del servicio externo con axios');
        }
    })
};
// Implementación de fetchClient usando importación dinámica
const fetchClient = {
    get: (url) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Making request to ${url} with fetch`);
        try {
            const { default: fetch } = yield Promise.resolve().then(() => __importStar(require('node-fetch')));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener datos del servicio externo con fetch');
            }
            const data = yield response.json();
            console.log('Response received:', data);
            return data;
        }
        catch (error) {
            console.error('Error al obtener datos del servicio externo con fetch:', error);
            throw new Error('Error al obtener datos del servicio externo con fetch');
        }
    })
};
// Selección del cliente HTTP basado en la variable de entorno
const httpClient = process.env.HTTP_CLIENT === 'fetch' ? fetchClient : axiosClient;
exports.default = httpClient;
