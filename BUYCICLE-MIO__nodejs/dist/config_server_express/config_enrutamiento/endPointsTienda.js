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
const mongoose_1 = __importDefault(require("mongoose"));
const Categoria_1 = __importDefault(require("../../modelos/modelos_mongoose_ORM/Categoria"));
const Producto_1 = __importDefault(require("../../modelos/modelos_mongoose_ORM/Producto"));
const routerTienda = express_1.default.Router();
routerTienda.get('/Categorias', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //...pasamos en la query la categoria a seleccionar, parametro pathCat <--- si vale "raices" pues recupero
        //categorias principales, sino las subcategorias de esa categoria...
        let pathCategoria = req.query.pathCat;
        console.log(`pathCategoria recibida en query: ${pathCategoria}`);
        let _regex = pathCategoria === "principales" ? /^\d+$/ : new RegExp(`^${pathCategoria}-\\d+`);
        yield mongoose_1.default.connect(process.env.URL_MONGODB);
        //let _catsCursor=mongoose.connection.collection('categorias').find( { pathCategoria: { $regex: _regex } });
        //let _cats=await _catsCursor.toArray();
        let _cats = yield Categoria_1.default.find({ pathCategoria: { $regex: _regex } }).sort({ pathCategoria: 1 });
        console.log(`categoriasArray recuperadas: ${JSON.stringify(_cats)}`);
        res.status(200).send({ codigo: 0, mensaje: 'categorias recuperadas ok...', datos: { categorias: _cats } });
    }
    catch (error) {
        console.log('error recuperar categorias  ', error);
        res.status(200).send({ codigo: 1, mensaje: 'error recuperando categorias ...' + error, datos: { categorias: [] } });
    }
    // finally {
    //     await mongoose.disconnect();
    // }
}));
routerTienda.get('/Productos', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //...pasamos en la query la categoria a seleccionar, parametro pathCat <--- si vale "raices" pues recupero
        //productos de categorias principales, sino los productos de esa categoria...   
        let pathCategoria = req.query.pathCat;
        console.log(`pathCategoria recibida en query: ${pathCategoria}`);
        //si categoria es de 2º nivel, recuperamos productos que CONTENGAN el path...si es de 3º nivel, tienen q coincidir exactamente con ese pathCategoria
        let patron = pathCategoria.split('-').length == 2 ? new RegExp(`^${pathCategoria}-`) : new RegExp(`^${pathCategoria}$`);
        yield mongoose_1.default.connect(process.env.URL_MONGODB);
        // let _prodCursor=mongoose.connection.collection('productos').find( { pathCategoria: { $regex: patron } } );
        // let _productos=await _prodCursor.toArray();
        let _productos = yield Producto_1.default.find({ pathCategoria: { $regex: patron } });
        console.log(`productosArray recuperados: ${JSON.stringify(_productos)}`);
        res.status(200).send({ codigo: 0, mensaje: 'productos recuperados ok...', datos: { productos: _productos } });
    }
    catch (error) {
        console.log('error recuperar productos  ', error);
        res.status(200).send({ codigo: 1, mensaje: 'error recuperando productos ...' + error, datos: { productos: [] } });
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
}));
exports.default = routerTienda;
//# sourceMappingURL=endPointsTienda.js.map