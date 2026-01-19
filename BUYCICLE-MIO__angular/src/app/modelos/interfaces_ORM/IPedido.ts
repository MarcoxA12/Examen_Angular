import IProducto from "./IProducto";
import IDireccion from "./IDireccion";

export default interface Pedido {
    itemsPedido:          Array<{producto:IProducto, cantidad:number}> | [];
    codigoDescuento?:     any[];
    metodoPago?:           IMetodoPago;
    metodoEnvio?:          IMetodoEnvio;
    fechaPago?:            null;
    fechaEnvio?:          null;
    estado?:               string;
    direccionEnvio?:       IDireccion;
    direccionFacturacion?: IDireccion;
    subtotal:             number;
    gastosEnvio:          number;
    total:                number;
    _id?:                 string;
}

export interface IMetodoEnvio {
    tipo:     string;
    detalles: { [key: string]: any };
}

export interface IMetodoPago {
    tipo:     string;
    detalles: IDetalles;
}

export interface IDetalles {
    estado:        string;
    idOrderPayPal: string;
    capturaResult: ICapturaResult;
}

export interface ICapturaResult {
    id:             string;
    status:         string;
    payment_source: IPaymentSource;
    purchase_units: IPurchaseUnit[];
    payer:          IPayer;
    links:          ILink[];
}

export interface ILink {
    href:   string;
    rel:    string;
    method: string;
}

export interface IPayer {
    name:          IPayerName;
    email_address: string;
    payer_id:      string;
    address:       IPayerAddress;
}

export interface IPayerAddress {
    country_code: string;
}

export interface IPayerName {
    given_name: string;
    surname:    string;
}

export interface IPaymentSource {
    paypal: IPaypal;
}

export interface IPaypal {
    email_address:  string;
    account_id:     string;
    account_status: string;
    name:           IPayerName;
    address:        IPayerAddress;
}

export interface IPurchaseUnit {
    reference_id: string;
    shipping:     IShipping;
    payments:     IPayments;
}

export interface IPayments {
    captures: ICapture[];
}

export interface ICapture {
    id:                          string;
    status:                      string;
    amount:                      IAmount;
    final_capture:               boolean;
    seller_protection:           ISellerProtection;
    seller_receivable_breakdown: ISellerReceivableBreakdown;
    links:                       ILink[];
    create_time:                 Date;
    update_time:                 Date;
}


export interface IAmount {
    currency_code: string;
    value:         string;
}

export interface ISellerProtection {
    status:             string;
    dispute_categories: string[];
}

export interface ISellerReceivableBreakdown {
    gross_amount: IAmount;
    paypal_fee:   IAmount;
    net_amount:   IAmount;
}

export interface IShipping {
    name:    IShippingName;
    address: IShippingAddress;
}

export interface IShippingAddress {
    address_line_1: string;
    admin_area_2:   string;
    admin_area_1:   string;
    postal_code:    string;
    country_code:   string;
}

export interface IShippingName {
    full_name: string;
}
