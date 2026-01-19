import mongoose from 'mongoose';
declare const Categoria: mongoose.Model<{
    pathCategoria: string;
    nombreCategoria: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    pathCategoria: string;
    nombreCategoria: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    pathCategoria: string;
    nombreCategoria: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    pathCategoria: string;
    nombreCategoria: string;
}, mongoose.Document<unknown, {}, {
    pathCategoria: string;
    nombreCategoria: string;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    pathCategoria: string;
    nombreCategoria: string;
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
        nombreCategoria: string;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        pathCategoria: string;
        nombreCategoria: string;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    pathCategoria: string;
    nombreCategoria: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    pathCategoria: string;
    nombreCategoria: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Categoria;
//# sourceMappingURL=Categoria.d.ts.map