import express, { Request, Response,NextFunction } from 'express';
import mongoose from 'mongoose';
import Categoria from '../../modelos/modelos_mongoose_ORM/Categoria';
import Producto from '../../modelos/modelos_mongoose_ORM/Producto';
const routerTienda = express.Router();

routerTienda.get('/Categorias',async (req:Request,res:Response,next:NextFunction)=>{
        try {
            //...pasamos en la query la categoria a seleccionar, parametro pathCat <--- si vale "raices" pues recupero
            //categorias principales, sino las subcategorias de esa categoria...

            let pathCategoria:string=req.query.pathCat as string;
            console.log(`pathCategoria recibida en query: ${pathCategoria}`);

            
            let _regex:RegExp=pathCategoria==="principales" ? /^\d+$/ : new RegExp(`^${pathCategoria}-\\d+`); 
            
            await mongoose.connect(process.env.URL_MONGODB!);
            //let _catsCursor=mongoose.connection.collection('categorias').find( { pathCategoria: { $regex: _regex } });
            //let _cats=await _catsCursor.toArray();
            
            let _cats=await Categoria.find( { pathCategoria: { $regex: _regex } } ).sort( { pathCategoria: 1 } );
            console.log(`categoriasArray recuperadas: ${JSON.stringify(_cats)}`);

            res.status(200).send( { codigo: 0, mensaje: 'categorias recuperadas ok...', datos:{categorias: _cats} } ); 

        } catch (error) {
            console.log('error recuperar categorias  ', error);            
            res.status(200).send({codigo:1, mensaje:'error recuperando categorias ...' + error, datos:{categorias:[]} });
            
         }
        // finally {
        //     await mongoose.disconnect();
        // }
    })

routerTienda.get('/Productos',async (req:Request,res:Response,next:NextFunction)=>{
    try {
        //...pasamos en la query la categoria a seleccionar, parametro pathCat <--- si vale "raices" pues recupero
        //productos de categorias principales, sino los productos de esa categoria...   
        let pathCategoria:string=req.query.pathCat as string;
        console.log(`pathCategoria recibida en query: ${pathCategoria}`)
        
        //si categoria es de 2º nivel, recuperamos productos que CONTENGAN el path...si es de 3º nivel, tienen q coincidir exactamente con ese pathCategoria
        let patron:RegExp=pathCategoria.split('-').length == 2 ? new RegExp(`^${pathCategoria}-`) : new RegExp(`^${pathCategoria}$`);

        await mongoose.connect(process.env.URL_MONGODB!);
        // let _prodCursor=mongoose.connection.collection('productos').find( { pathCategoria: { $regex: patron } } );
        // let _productos=await _prodCursor.toArray();
        let _productos=await Producto.find( { pathCategoria: { $regex: patron } } );
        console.log(`productosArray recuperados: ${JSON.stringify(_productos)}`);
        res.status(200).send( { codigo: 0, mensaje: 'productos recuperados ok...', datos:{productos: _productos} } );

    } catch (error) {
        console.log('error recuperar productos  ', error);            
        res.status(200).send({codigo:1, mensaje:'error recuperando productos ...' + error, datos:{productos:[]} });
    } finally {
        await mongoose.disconnect();
    }
})

export default routerTienda;