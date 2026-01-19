import { Component, computed, inject } from '@angular/core';
import { DatosPersonalesCard } from "./DatosPersonalesCard/datos-personales-card";
import { EmailTlfnoCard } from "./EmailTlfnoCard/email-tlfno-card";
import { DireccEnvioFactCard } from "./DireccEnvioFactCard/direcc-envio-fact-card";
import { StorageGlobal } from '../../../../servicios/storage-global';
import IDireccion from '../../../../modelos/interfaces_ORM/IDireccion';

@Component({
  selector: 'app-datos-personales',
  imports: [DatosPersonalesCard, EmailTlfnoCard, DireccEnvioFactCard],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css',
})
export class DatosPersonales {
  storageGlobal=inject(StorageGlobal);
  
  datosCliente=this.storageGlobal.GetDatosCliente();

  datosPersonalesCard=computed<{nombre:string,apellidos:string,genero:string,fechaNacimiento:number, fotoPerfil: string}>(()=> ({nombre: this.datosCliente()!.nombre, apellidos: this.datosCliente()!.apellidos, genero: this.datosCliente()!.genero, fechaNacimiento: this.datosCliente()!.fechaNacimiento, fotoPerfil: this.datosCliente()!.cuenta.imagenAvatar }));
  datosEmailTlfnoCard=computed<{email:string, telefono:string}>(()=> ({ email: this.datosCliente()!.cuenta.email, telefono: this.datosCliente()!.cuenta.telefonoContacto }));
  datosDireccionesCard=computed<{tipo:string, direccion:IDireccion}[] >( ()=> { return  this.datosCliente()!
                                                                                            .direcciones
                                                                                            .filter(d => d.esPrincipal || d.esFacturacion)
                                                                                            .map(d => ({ tipo: d.esPrincipal ? 'Entrega' : 'Facturacion', direccion: d })) } );
}
