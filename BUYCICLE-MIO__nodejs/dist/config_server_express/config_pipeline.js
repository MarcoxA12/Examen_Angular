"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config_pipeline;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const endPointsCliente_1 = __importDefault(require("./config_enrutamiento/endPointsCliente"));
const endPointsTienda_1 = __importDefault(require("./config_enrutamiento/endPointsTienda"));
function config_pipeline(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use('/api/cliente', endPointsCliente_1.default);
    app.use('/api/tienda', endPointsTienda_1.default);
}
//# sourceMappingURL=config_pipeline.js.map