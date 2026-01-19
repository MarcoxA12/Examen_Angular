import { Component, input } from '@angular/core';

@Component({
  selector: 'app-email-tlfno-card',
  imports: [],
  templateUrl: './email-tlfno-card.html',
  styleUrl: './email-tlfno-card.css',
})
export class EmailTlfnoCard {
datosEmailTlfnoCard=input<{email:string, telefono:string}>();
}
