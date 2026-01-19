"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoriaSchema = new mongoose_1.default.Schema({
    nombreCategoria: { type: String, required: true, unique: true },
    pathCategoria: { type: String, required: true, unique: true }
});
const Categoria = mongoose_1.default.model('Categoria', categoriaSchema, 'categorias');
exports.default = Categoria;
//# sourceMappingURL=Categoria.js.map