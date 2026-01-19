"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const config_pipeline_1 = __importDefault(require("./config_server_express/config_pipeline"));
const app = (0, express_1.default)();
// AUMENTAR EL LÍMITE DE TAMAÑO ---
// Esto permite recibir JSONs grandes (como las fotos en base64)
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// --- CONFIGURACIÓN CORS (Permitir conexiones desde Angular) ---
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
(0, config_pipeline_1.default)(app);
app.listen(3000, (error) => {
    if (error) {
        console.log('Error al INICIAR servidor WEB EXPRESS en puerto 3000:', error);
    }
    else {
        console.log('...Servidor WEB EXPRESS iniciado en puerto 3000...');
    }
});
//# sourceMappingURL=server.js.map