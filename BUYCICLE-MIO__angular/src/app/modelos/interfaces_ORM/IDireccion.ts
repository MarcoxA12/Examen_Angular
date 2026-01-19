export default interface IDireccion {
    calle:         string;
    municipio:     IMunicipio;
    provincia:     IProvincia;
    cp:            string;
    esPrincipal:   boolean;
    esFacturacion: boolean;
    pais:          string;
    datosContacto: IDatosContacto;
}

export interface IDatosContacto {
    nombre:        string;
    apellidos:     string;
    telefono:      string;
    email:         string;
    observaciones: string;
}

export interface IMunicipio {
    CMUM:   string;
    CPRO:   string;
    CUN:    string;
    DMUN50: string;
}

export interface IProvincia {
    CCOM: string;
    CPRO: string;
    PRO:  string;
}