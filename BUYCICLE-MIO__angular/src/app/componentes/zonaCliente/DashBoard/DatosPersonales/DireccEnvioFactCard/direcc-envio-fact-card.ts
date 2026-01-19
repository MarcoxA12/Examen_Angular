import { Component, input } from '@angular/core';
import IDireccion from '../../../../../modelos/interfaces_ORM/IDireccion';

@Component({
  selector: 'app-direcc-envio-fact-card',
  imports: [],
  templateUrl: './direcc-envio-fact-card.html',
  styleUrl: './direcc-envio-fact-card.css',
})
export class DireccEnvioFactCard {
  tipo=input<string>();
  direccion=input<IDireccion>();
}
