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
const express_1 = __importDefault(require("express"));
const Cliente_1 = __importDefault(require("../../modelos/modelos_mongoose_ORM/Cliente"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtService_1 = __importDefault(require("../../servicios/JwtService"));
const routerCliente = express_1.default.Router();
routerCliente.post('/Login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Lógica para manejar el login del cliente
    try {
        const { email, password } = req.body;
        console.log(`Datos recibidos en login del cliente: email: ${email}, password: ${password}`);
        yield mongoose_1.default.connect(process.env.URL_MONGODB);
        const cliente = yield Cliente_1.default.findOne({ 'cuenta.email': email }).exec();
        const passwordMatch = cliente ? yield bcrypt_1.default.compare(password, cliente.cuenta.password) : false;
        if (!cliente || !passwordMatch || !cliente.cuenta.cuentaActivada)
            throw new Error('Cliente no encontrado con ese email o password o la cuenta no esta activada');
        cliente.cuenta.password = ''; //eliminamos el password de la respuesta
        //generar tokens JWT de acceso y refresh
        const tokens = JwtService_1.default.generarJWT({ email: cliente.cuenta.email, idCliente: cliente._id }, '1h', true);
        console.log('datos a mandar...', { cliente, accessToken: tokens[0], refreshToken: tokens[1] });
        res.send({ codigo: 0, mensaje: 'Login ok...', datos: { cliente, accessToken: tokens[0], refreshToken: tokens[1] } });
    }
    catch (error) {
        console.error('Error en login del cliente:', error);
    }
}));
routerCliente.post('/Registro', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Datos recibidos en el servidor para registro de cliente:', req.body);
        const { nombre, apellidos, email, password, planAmigo, genero } = req.body;
        const nuevoCliente = new Cliente_1.default({
            nombre,
            apellidos,
            genero,
            cuenta: {
                email,
                password: bcrypt_1.default.hashSync(password, 10), // Hashear la contraseña antes de guardarla
                cuentaActiva: false,
                fechaCreacionCuenta: Date.now(),
                telefonoContacto: '',
                imagenAvatar: '',
            },
            nifcif: '',
            fechaNacmiento: null,
            direcciones: [],
            misAnuncios: [],
            pedidosYVentas: []
        });
        yield mongoose_1.default.connect(process.env.URL_MONGODB || 'mongodb://127.0.0.1:27017/HSN');
        const resInsert = yield nuevoCliente.save();
        console.log('Nuevo cliente registrado en la base de datos:', resInsert);
        res.status(200).send({ codigo: 0, mensaje: 'Cliente registrado con exito.', datos: resInsert });
    }
    catch (error) {
        console.error('Error al registrar nuevo cliente:', error);
        res.status(200).send({ codigo: 1, mensaje: 'Error al registrar cliente.', datos: error });
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
}));
routerCliente.post('/crearAnuncio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(" --- Petición recibida: CREAR ANUNCIO --- ");
        const { email, datosAnuncio } = req.body;
        if (!email || !datosAnuncio) {
            return res.status(400).send({ codigo: 1, mensaje: 'Faltan datos obligatorios' });
        }
        yield mongoose_1.default.connect(process.env.URL_MONGODB || 'mongodb://127.0.0.1:27017/BuyCycle');
        const clienteEncontrado = yield Cliente_1.default.findOne({ "cuenta.email": email });
        if (!clienteEncontrado) {
            return res.status(404).send({ codigo: 1, mensaje: 'Cliente no encontrado' });
        }
        clienteEncontrado.misAnuncios.push(datosAnuncio);
        const clienteGuardado = yield clienteEncontrado.save({ validateBeforeSave: false });
        console.log("Anuncio guardado. Total anuncios:", clienteGuardado.misAnuncios.length);
        res.status(200).send({
            codigo: 0,
            mensaje: 'Anuncio publicado correctamente',
            datos: clienteGuardado
        });
    }
    catch (error) {
        console.error("Error al guardar anuncio:", error);
        res.status(500).send({ codigo: 1, mensaje: 'Error interno del servidor', datos: error });
    }
}));
exports.default = routerCliente;
//# sourceMappingURL=endPointsCliente.js.map