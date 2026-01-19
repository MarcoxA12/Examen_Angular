import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IAnuncio } from '../modelos/interfaces_ORM/ICliente';

export default {
    comparePasswords: (confirmPassword: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value !== confirmPassword ? { 'comparePasswords': { message: 'Las contraseñas no coinciden.' } } : null;
        }
    },

    anuncioDuplicado(misAnuncios: any[]): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
      const modelo = control.value;
      const grupoFormulario = control.parent;
      const marca = grupoFormulario?.get('marca')?.value;

      console.log("--- COMPROBANDO DUPLICADO ---");
      console.log("Marca en form:", marca);
      console.log("Modelo en form:", modelo);
      console.log("Lista de mis anuncios:", misAnuncios); 

      if (!modelo || !marca) return of(null);

      return of(misAnuncios).pipe(
        delay(500),
        map(listaAnuncios => {
          const existe = listaAnuncios.some(a => 
            a.marca.toLowerCase().trim() === marca.toLowerCase().trim() && 
            a.modelo.toLowerCase().trim() === modelo.toLowerCase().trim()
          );

          console.log("¿Existe duplicado?:", existe); 
          return existe ? { anuncioDuplicado: true } : null;
        })
      );
    };
  }
}