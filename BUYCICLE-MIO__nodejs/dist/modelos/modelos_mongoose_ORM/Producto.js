"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productoSchema = new mongoose_1.default.Schema({
    Nombre: { type: String, required: true },
    'Descripcion detallada': { type: String, required: true },
    'Lista Preguntas uso': [{ Pregunta: { type: String }, Respuesta: { type: String } }],
    Formato: [String],
    Sabores: [String],
    'Detalles producto': String,
    Descripcion: String,
    Precio: { type: Number, required: true },
    Oferta: Number,
    pathCategoria: { type: String, required: true },
    valoraciones: [],
    Imagenes: [String]
});
const Producto = mongoose_1.default.model('Producto', productoSchema, 'productos');
exports.default = Producto;
//# sourceMappingURL=Producto.js.map