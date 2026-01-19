// export default interface ICategoria {
//     nombre: string;
//     pathCategoria: string;
// }

type ICategoria = {
    nombreCategoria: string;
    pathCategoria: string;
    marcas?: string[];
};

export default ICategoria;