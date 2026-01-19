"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const CuentaSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     cuentaActivada: { type: Boolean, default: false },
//     fechaCreacionCuenta: { type:Number },
//     telefonoContacto: { type: String  },
//     imagenAvatar: { type: String  },
// });
const AnuncioSchema = new mongoose_1.default.Schema({
    pathCategoria: { type: String, required: true },
    titulo: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    talla: { type: String, required: true },
    color: { type: String, required: true },
    anioModelo: { type: String, required: true },
    fechaCompra: { type: Number, required: true },
    materialCuadro: { type: String, required: true },
    grupoCambio: { type: String, required: true },
    tipoFreno: { type: String, required: true },
    modeloFrenos: { type: String, required: true },
    tipoRuedas: { type: String, required: true },
    modeloRuedas: { type: String, required: true },
    precioOriginal: { type: Number, required: true },
    precioVenta: { type: Number, required: true },
    tieneFactura: { type: Boolean, required: true },
    condicion: { type: String, required: true },
    detallesAdicionales: { type: String, required: true },
    imagenes: [String],
    estadoAnuncio: { type: String, required: true },
});
const ClienteSchema = new mongoose_1.default.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    genero: { type: String, required: true },
    //cuenta : { type: CuentaSchema, required: true },
    cuenta: {
        type: {
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            cuentaActivada: { type: Boolean, default: false },
            fechaCreacionCuenta: { type: Number },
            telefonoContacto: { type: String },
            imagenAvatar: { type: String },
        },
        required: true
    },
    empresa: { type: String },
    nifcif: { type: String },
    fechaNacmiento: { type: Number },
    direcciones: [],
    misAnuncios: [AnuncioSchema],
    pedidosYVentas: [],
});
const Cliente = mongoose_1.default.model("Cliente", ClienteSchema, "clientes");
exports.default = Cliente;
//# sourceMappingURL=Cliente.js.map