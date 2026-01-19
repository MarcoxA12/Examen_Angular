import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, startWith } from 'rxjs';
import IRespuestaNode from '../modelos/IRespuestaNode';

// type IIRespuestaNode={
//  codigo: number;
//  mensaje: string;
//  data?: any;
// }

@Injectable({
  providedIn: 'root',
})
export class FetchNode {
  private _httpClient=inject(HttpClient);
  private _injector=inject(Injector);

  //#region .... zona Cliente: Login, Registro, Logout, Mis datos personales, Mis pedidos, etc...
 
  public LoginRegistro( datos:any, operacion:string ): Signal<IRespuestaNode> {
    const url = `http://localhost:3000/api/Cliente/${operacion}`;

    return toSignal(
      this._httpClient
          .post<IRespuestaNode>(url, datos, { headers: { 'Content-Type': 'application/json' } })
          .pipe(
            startWith({ codigo: 100, mensaje: 'Esperando respuesta server...' })
          ),
      {  injector: this._injector, requireSync: true });
  }


 //#endregion

 //#region .... zona Tienda: Categorias, Productos, etc...

  public GetCategorias( pathCategoria:string = 'principales'): Signal<IRespuestaNode> {
    const url = `http://localhost:3000/api/Tienda/Categorias?pathCat=${pathCategoria}`;
    return toSignal(
      this._httpClient
          .get<IRespuestaNode>(url, { headers: { 'Content-Type': 'application/json' } })
          .pipe(
            startWith({ codigo: 100, mensaje: 'Esperando respuesta server...' })
          ),
      {  injector: this._injector, requireSync: true });
  }


//#endregion

public CrearAnuncio(datos: any): Signal<IRespuestaNode> {
    const url = 'http://localhost:3000/api/Cliente/crearAnuncio';

    return toSignal(
      this._httpClient
        .post<IRespuestaNode>(url, datos, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          startWith({ codigo: 100, mensaje: 'Esperando respuesta server...' })
        ),
      { injector: this._injector, requireSync: true }
    );
  }


}
