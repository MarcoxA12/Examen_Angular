import cors from 'cors';
import express, { Express } from 'express';
import routerCliente from './config_enrutamiento/endPointsCliente';
import routerTienda from './config_enrutamiento/endPointsTienda';

export default function config_pipeline(app:Express):void {    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());
    
    app.use('/api/cliente', routerCliente);
    app.use('/api/tienda', routerTienda);
}