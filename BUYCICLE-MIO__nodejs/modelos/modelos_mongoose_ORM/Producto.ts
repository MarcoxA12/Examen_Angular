import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    'Descripcion detallada': { type: String, required: true },
    'Lista Preguntas uso': [ { Pregunta: { type: String }, Respuesta: { type: String } } ],
    Formato:[ String],
    Sabores: [ String ],
    'Detalles producto':  String,
    Descripcion: String,    
    Precio: { type: Number, required: true },
    Oferta: Number,
    pathCategoria: { type: String, required: true },
    valoraciones: [],
    Imagenes: [ String ]
});

const Producto = mongoose.model('Producto', productoSchema, 'productos');
export default Producto;