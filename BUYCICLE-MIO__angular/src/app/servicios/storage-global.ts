import { Injectable, signal, WritableSignal } from '@angular/core';
import ICliente from '../modelos/interfaces_ORM/ICliente';
import IJwtTokens from '../modelos/IJwtTokens';


@Injectable({
  providedIn: 'root',
})
export class StorageGlobal {
  //definimos como props. privadas las variables de almacenamiento global para datos del cliente y tokens...
  //lo hacemos con señales para versiones actuales de Angular, antiguas usaban BehaviorSubject
  private _cliente:WritableSignal<ICliente|null> = signal<ICliente|null>(null);
  private _tokens: WritableSignal<IJwtTokens | null> = signal<IJwtTokens | null>(null);



  //#region ------ metodos para manipular los datos del alamacenamiento global ------
  GetDatosCliente(): WritableSignal<ICliente | null> {
    //tengo q comprobar q si por la señal no hay datos del cliente, ha podido haber un REFRESH de la pagina
    //y en ese caso, recuperar los datos del cliente del localStorage
    //y los almaceno en la señal 2 formas: 
    // con set(nuevo_Valor) ==> asignando directamente a la propiedad de la señal
    // o con update( (valorAntiguo:tipo)=> { ....; return nuevovalor; } );
    if (this._cliente() == null) {
      const datosCliente = JSON.parse(localStorage.getItem('cliente') || 'null');
      this._cliente.set(datosCliente);
    }
    return this._cliente;
  }

  GetTokens(): WritableSignal<IJwtTokens | null> {
    if (this._tokens() == null) {
      const tokens = JSON.parse(localStorage.getItem('tokens') || 'null');
      this._tokens.set(tokens);
    }
    return this._tokens;
  }

  SetDatosCliente(cliente: ICliente | null): void {
    //this._cliente.set(cliente); <----- con .set() machaca directamente el valor de la señal antiguo por el nuevo
    this._cliente.update((datosClienteViejos:ICliente | null) =>  {
      if(datosClienteViejos){
        return {...datosClienteViejos, ...cliente};
      } else {
        return cliente;
      }
    }); // <---- con .update() podemos actualizar el valor antiguo
    //lo almacenamos tambien en el localStorage para persistencia ante refresh de pagina
    if (cliente) {
      localStorage.setItem('cliente', JSON.stringify(cliente));
    } else {
      localStorage.removeItem('cliente');
    }
  }

  SetTokens(tokens: IJwtTokens | null): void {
    //this._tokens.set(tokens);
    this._tokens.update((tokensViejos: IJwtTokens | null) => {
      if (tokensViejos) {
        return { ...tokensViejos, ...tokens };
      } else {
        return tokens;
      }
    });
    if (tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('tokens');
    }
  }



  //#endregion
}
