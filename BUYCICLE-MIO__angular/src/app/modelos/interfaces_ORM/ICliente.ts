import  IProducto  from "./IProducto";
import  IPedido  from "./IPedido";
import  IDireccion  from "./IDireccion";

export default interface ICliente {
    _id:             string;
    nombre:          string;
    apellidos:       string;
    genero:          string;
    cuenta:          ICuenta;
    direcciones:     IDireccion[];
    nifcif:          string;
    fechaNacimiento: number;
    pedidosYVentas:  any[];
    misAnuncios:     IAnuncio[];
}


export interface ICuenta {
    email:               string;
    password:            string;
    cuentaActivada:      boolean;
    fechaCreacionCuenta: number;
    telefonoContacto:    string;
    tipoCuenta:          string;
    imagenAvatar:        string;
}


export interface IAnuncio {
    pathCategoria: string,
    titulo: string,
    marca: string,
    modelo: string,
    talla: string,
    color: string,
    anioModelo: string,
    fechaCompra: number,
    materialCuadro: string,
    grupoCambio: string,
    tipoFreno: string,
    modeloFrenos: string,
    tipoRuedas: string,
    modeloRuedas: string,
    precioOriginal: number,
    precioVenta: number,
    tieneFactura: boolean,
    condicion: string,
    detallesAdicionales: string,
    imagenes: [ String ],
    estadoAnuncio: string,
}     
