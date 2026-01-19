//modulo de codigo para generar passwords aleatorias seguras
import crypto from 'crypto';

export class GenPasswords {
    //metodo para generar passwords aleatorias seguras
    public static GenerarPasswordAleatorio(longitud: number = 12): string {
        //definimos los caracteres a usar en la generacion del password
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        //generamos el password aleatorio
        while( ! new RegExp(`(?=.*[A-Z])(?=.*[!@#$%\^&*()_+\[\]{}|;:,.<>?])(?=.*[0-9])(?=.*[a-z]).{${longitud}}$`).test(password)){
            for (let i = 0; i < longitud; i++) {
                const randomIndex = crypto.randomInt(0, caracteres.length);
                password += caracteres.charAt(randomIndex);
            }
            //si no cumple los requisitos de seguridad, reiniciamos el password
            if( ! new RegExp(`(?=.*[A-Z])(?=.*[!@#$%\^&*()_+\[\]{}|;:,.<>?])(?=.*[0-9])(?=.*[a-z]).{${longitud}}$`).test(password)){
                password='';
            }
        }
        console.log(`password generado para el cliente: ${password}`);
        return password;
    }
}