import 'dotenv/config';
import express, { Express } from 'express';
import config_pipeline from './config_server_express/config_pipeline';

const app:Express = express();

// AUMENTAR EL LÍMITE DE TAMAÑO ---
// Esto permite recibir JSONs grandes (como las fotos en base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- CONFIGURACIÓN CORS (Permitir conexiones desde Angular) ---
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

config_pipeline(app);

app.listen(3000,(error?:any)=>{
    if(error){
        console.log('Error al INICIAR servidor WEB EXPRESS en puerto 3000:', error);
    } else {
        console.log('...Servidor WEB EXPRESS iniciado en puerto 3000...');
    }
})