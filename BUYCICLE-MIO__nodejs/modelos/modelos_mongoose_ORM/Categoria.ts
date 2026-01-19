import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    nombreCategoria: { type: String, required: true, unique: true },
    pathCategoria: { type: String, required: true, unique: true }
});

const Categoria = mongoose.model('Categoria', categoriaSchema, 'categorias');
export default Categoria;