import { Component, effect, ElementRef, inject, Injector, signal, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidatorsPersonal from '../../../validadores/ValidatorsPersonal';
import { FetchNode } from '../../../servicios/fetch-node';
import { Router } from '@angular/router';
import { StorageGlobal } from '../../../servicios/storage-global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginregistro',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './loginregistro.html',
  styleUrl: './loginregistro.css',
})
export class LoginRegistro {
  fetchNode=inject(FetchNode); //inyectar servicio fetchNode en constructor si se usa
  storageGlobal=inject(StorageGlobal);
  injector=inject(Injector);
  router=inject(Router);

  typeModal=signal<boolean>(true); //true=login, false=registro
  divErrores=viewChild<ElementRef>('divErrores');
  btnClose=viewChild<ElementRef>('btnClose');

  miform:FormGroup=new FormGroup(
    {
      email: new FormControl('',[ Validators.required, Validators.email ] ),
      password: new FormControl( '',[ Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')] ),
    }
  );
  
  constructor(){
    effect(
          () => {
            if(this.typeModal()){
              //modo login
              this.miform.removeControl('nombre');
              this.miform.removeControl('apellidos');
              this.miform.removeControl('telefono');
              this.miform.removeControl('confirmPassword');
            } else {
              //modo registro
              this.miform.addControl('nombre', new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(50) ] ) );
              this.miform.addControl('apellidos', new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(100) ] ) );
              this.miform.addControl('telefono', new FormControl('', [ Validators.required, Validators.pattern('^(\\+\\d{2})?\\d{9}$') ] ) );
              this.miform.addControl('confirmPassword', new FormControl('', [ Validators.required, 
                                                                              Validators.minLength(6), 
                                                                              Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'), 
                                                                              ValidatorsPersonal.comparePasswords(this.miform.get('password')?.value) 
                                                                            ] 
                                                                          ) 
                                      );
          }
        }
    )    
  }

  SubmitForm():void{
    console.log(this.miform.value);
    const petLoginRegistro=this.fetchNode.LoginRegistro(this.miform.value, this.typeModal() ? 'Login' : 'Registro');

    effect(
      () => {
        console.log('Respuesta del servidor tras login/registro:', petLoginRegistro().mensaje, petLoginRegistro().datos);
        if(petLoginRegistro().codigo !== 0){
          this.divErrores()!.nativeElement.innerText = petLoginRegistro().mensaje;
        } else {
          this.divErrores()!.nativeElement.innerText = '';
          //cerrar modal bootstrap
          this.btnClose()!.nativeElement.click();
          //almacenar en el storage global los datos del cliente y tokens JWT si estamos en el Login
          if(this.typeModal()){
            //modo login
            this.storageGlobal.SetDatosCliente( petLoginRegistro().datos.cliente);
            this.storageGlobal.SetTokens({ accessToken: petLoginRegistro().datos.accessToken, refreshToken: petLoginRegistro().datos.refreshToken } );
            //redirigir a mis datos personales
            this.router.navigate(['/Cliente/DatosPersonales']);
          } else {
            //modo registro
            //redirigir a pagina de inicio o login e indicar que revise su email para activar la cuenta
             Swal.fire(
              {
                title: 'Registro realizado con exito, ahora revisa tu email para activar la cuenta.',
                text: `Codigo: ${petLoginRegistro().codigo} - Mensaje: ${petLoginRegistro().mensaje}`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }
            );
            this.router.navigate(['/']);
          } 
        }
      },{ injector: this.injector }
    );

  }

}
