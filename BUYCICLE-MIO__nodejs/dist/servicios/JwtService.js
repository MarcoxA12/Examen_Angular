"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    generarJWT: (payload, vigencia, withRefresh, options) => {
        try {
            const _tokens = [
                { tipo: 'accessToken', expiresIn: vigencia },
                { tipo: 'refreshToken', expiresIn: '5h' }
            ]
                .map((tok) => {
                let _payload = tok.tipo === 'accessToken' ? Object.assign({}, payload) : { email: payload.email };
                return jsonwebtoken_1.default.sign(_payload, process.env.JWT_SECRET, Object.assign(Object.assign({}, options), { expiresIn: tok.expiresIn }));
            });
            return withRefresh ? _tokens : _tokens.slice(0, 1);
        }
        catch (error) {
            console.log('Error al generar JWT:', error);
            return [];
        }
    },
    verificarJWT: (token) => {
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return { valid: true, payload };
        }
        catch (error) {
            console.log('Error al verificar JWT:', error);
            return { valid: false, message: error.message };
        }
    },
    listaClaimsJWT: (token) => {
        try {
            const payload = jsonwebtoken_1.default.decode(token);
            if (typeof payload === 'object' && payload !== null) {
                return payload;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log('Error al decodificar JWT:', error);
            return null;
        }
    }
};
//# sourceMappingURL=JwtService.js.map