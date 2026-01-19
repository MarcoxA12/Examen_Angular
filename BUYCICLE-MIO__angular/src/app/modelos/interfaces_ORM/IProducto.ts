interface ListaPreguntasUso {
    Pregunta:  string;
    Respuesta: string;
}

 interface ID {
    $oid: string;
}

export  default interface IProducto {
    _id:                     ID;
    Nombre:                  string;
    "Descripcion detallada": string;
    "Lista Preguntas uso":   ListaPreguntasUso[];
    Formato:                 string[];
    Sabores:                 string[];
    "Detalles producto":     string;
    Descripcion:             string;
    Precio:                  number;
    Oferta:                  number;
    pathCategoria:           string;
    valoraciones:            any[];
    Imagenes:                string[];
}

