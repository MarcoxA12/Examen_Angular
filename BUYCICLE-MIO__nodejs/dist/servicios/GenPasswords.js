"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenPasswords = void 0;
//modulo de codigo para generar passwords aleatorias seguras
const crypto_1 = __importDefault(require("crypto"));
class GenPasswords {
    //metodo para generar passwords aleatorias seguras
    static GenerarPasswordAleatorio(longitud = 12) {
        //definimos los caracteres a usar en la generacion del password
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        //generamos el password aleatorio
        while (!new RegExp(`(?=.*[A-Z])(?=.*[!@#$%\^&*()_+\[\]{}|;:,.<>?])(?=.*[0-9])(?=.*[a-z]).{${longitud}}$`).test(password)) {
            for (let i = 0; i < longitud; i++) {
                const randomIndex = crypto_1.default.randomInt(0, caracteres.length);
                password += caracteres.charAt(randomIndex);
            }
            //si no cumple los requisitos de seguridad, reiniciamos el password
            if (!new RegExp(`(?=.*[A-Z])(?=.*[!@#$%\^&*()_+\[\]{}|;:,.<>?])(?=.*[0-9])(?=.*[a-z]).{${longitud}}$`).test(password)) {
                password = '';
            }
        }
        console.log(`password generado para el cliente: ${password}`);
        return password;
    }
}
exports.GenPasswords = GenPasswords;
//# sourceMappingURL=GenPasswords.js.map