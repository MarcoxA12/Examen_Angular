import { Component, computed, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FetchNode } from '../../../../servicios/fetch-node';
import ICategoria from '../../../../modelos/interfaces_ORM/ICategoria';
import { LoginRegistro } from "../../../zonaCliente/LoginRegistroModal/loginregistro";
import { StorageGlobal } from '../../../../servicios/storage-global';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgStyle, LoginRegistro, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private fetchNode=inject(FetchNode);
  private storageGlobal=inject(StorageGlobal);

  private categoriasPrincipalesSignal=this.fetchNode.GetCategorias('principales');
  categorias=computed<ICategoria[]>(()=>this.categoriasPrincipalesSignal().datos?.categorias as ICategoria[]);
  cliente=this.storageGlobal.GetDatosCliente().asReadonly();

}
