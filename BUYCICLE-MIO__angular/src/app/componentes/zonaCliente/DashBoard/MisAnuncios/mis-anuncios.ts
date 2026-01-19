import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageGlobal } from '../../../../servicios/storage-global';
import { MiniAnuncio } from "./MiniAnuncio/mini-anuncio";

@Component({
  selector: 'app-mis-anuncios',
  imports: [CommonModule, RouterLink, MiniAnuncio],
  templateUrl: './mis-anuncios.html',
  styleUrl: './mis-anuncios.css',
})
export class MisAnuncios {
  
  private _storage = inject(StorageGlobal);

  public cliente = this._storage.GetDatosCliente();

  public filtroActual = signal<string>('Todos');

  public anunciosFiltrados = computed(() => {
    const misAnuncios = this.cliente()?.misAnuncios || [];

    if (this.filtroActual() === 'Todos') {
      return misAnuncios;
    }

    return misAnuncios.filter(a => a.estadoAnuncio === this.filtroActual());
  });

  cambiarFiltro(nuevoEstado: string) {
    this.filtroActual.set(nuevoEstado);
  }
}
