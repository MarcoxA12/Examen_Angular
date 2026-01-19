import { Routes } from '@angular/router';
import { LayoutDash } from './componentes/zonaCliente/DashBoard/layout-dash';

export const routes: Routes = [
    {
        path:'Cliente',
        component: LayoutDash,
        children:[
            {path:'BandejaDeEntrada', loadComponent: () => import('./componentes/zonaCliente/DashBoard/BandejaDeEntrada/bandeja-de-entrada').then(m => m.BandejaDeEntrada)},
            {path:'BusquedasGuardadas', loadComponent: () => import('./componentes/zonaCliente/DashBoard/BusquedasGuardadas/busquedas-guardadas').then(m => m.BusquedasGuardadas)},
            {path:'DatosPersonales', loadComponent: () => import('./componentes/zonaCliente/DashBoard/DatosPersonales/datos-personales').then(m => m.DatosPersonales)},
            {path:'MisAnuncios', loadComponent: () => import('./componentes/zonaCliente/DashBoard/MisAnuncios/mis-anuncios').then(m => m.MisAnuncios)},
            {path:'PedidosYVentas', loadComponent: () => import('./componentes/zonaCliente/DashBoard/PedidosYVentas/pedidos-yventas').then(m => m.PedidosYVentas)},
            {path:'Personalizacion', loadComponent: () => import('./componentes/zonaCliente/DashBoard/Personalizacion/personalizacion').then(m => m.Personalizacion)},
            {path:'CrearAnuncio', loadComponent: () => import('./componentes/zonaCliente/DashBoard/MisAnuncios/CrearAnuncioBici/crear-anuncio-bici').then(m => m.CrearAnuncioBici)},
        ]
    }
];
