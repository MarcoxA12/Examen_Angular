import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./componentes/zonaPortal/Layout/Header/header";
import { Footer } from "./componentes/zonaPortal/Layout/Footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BUYCICLE-MIO__angular');
}
