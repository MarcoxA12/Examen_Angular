import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IAnuncio } from '../../../../../modelos/interfaces_ORM/ICliente';

@Component({
  selector: 'app-mini-anuncio',
  imports: [CommonModule], 
  templateUrl: './mini-anuncio.html',
  styleUrl: './mini-anuncio.css',
})
export class MiniAnuncio {
  anuncio = input.required<IAnuncio>();
}
