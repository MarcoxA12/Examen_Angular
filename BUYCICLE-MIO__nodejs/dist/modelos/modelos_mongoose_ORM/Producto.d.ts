import mongoose from "mongoose";
declare const Producto: mongoose.Model<{
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
}, mongoose.Document<unknown, {}, {
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        pathCategoria: string;
        Nombre: string;
        'Descripcion detallada': string;
        'Lista Preguntas uso': mongoose.Types.DocumentArray<{
            Pregunta?: string | null;
            Respuesta?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            Pregunta?: string | null;
            Respuesta?: string | null;
        }> & {
            Pregunta?: string | null;
            Respuesta?: string | null;
        }>;
        Formato: string[];
        Sabores: string[];
        Precio: number;
        valoraciones: any[];
        Imagenes: string[];
        'Detalles producto'?: string | null;
        Descripcion?: string | null;
        Oferta?: number | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        pathCategoria: string;
        Nombre: string;
        'Descripcion detallada': string;
        'Lista Preguntas uso': mongoose.Types.DocumentArray<{
            Pregunta?: string | null;
            Respuesta?: string | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            Pregunta?: string | null;
            Respuesta?: string | null;
        }> & {
            Pregunta?: string | null;
            Respuesta?: string | null;
        }>;
        Formato: string[];
        Sabores: string[];
        Precio: number;
        valoraciones: any[];
        Imagenes: string[];
        'Detalles producto'?: string | null;
        Descripcion?: string | null;
        Oferta?: number | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    pathCategoria: string;
    Nombre: string;
    'Descripcion detallada': string;
    'Lista Preguntas uso': mongoose.Types.DocumentArray<{
        Pregunta?: string | null;
        Respuesta?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }> & {
        Pregunta?: string | null;
        Respuesta?: string | null;
    }>;
    Formato: string[];
    Sabores: string[];
    Precio: number;
    valoraciones: any[];
    Imagenes: string[];
    'Detalles producto'?: string | null;
    Descripcion?: string | null;
    Oferta?: number | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Producto;
//# sourceMappingURL=Producto.d.ts.map