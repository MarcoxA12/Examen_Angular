import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-datos-personales-card',
  imports: [DatePipe],
  templateUrl: './datos-personales-card.html',
  styleUrl: './datos-personales-card.css',
})
export class DatosPersonalesCard {
  datosPersonalesCard=input<{nombre:string, apellidos:string, genero:string, fechaNacimiento:number, fotoPerfil: string}>();
}
