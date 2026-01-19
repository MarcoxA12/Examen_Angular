import { Component, inject, signal, Injector, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { StorageGlobal } from '../../../../../servicios/storage-global';
import { FetchNode } from '../../../../../servicios/fetch-node';
import ValidatorsPersonal from '../../../../../validadores/ValidatorsPersonal';

@Component({
  selector: 'app-crear-anuncio-bici',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './crear-anuncio-bici.html',
  styleUrl: './crear-anuncio-bici.css',
})
export class CrearAnuncioBici {

  // TU ARRAY DE TALLAS ORIGINAL
  tallas: string[] = Array.from({length:20},( _,pos)=>(pos + 42).toString()).concat(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL','XXXL']);

  private fb = inject(FormBuilder);
  private storage = inject(StorageGlobal);
  public router = inject(Router);
  private injector = inject(Injector);
  private fetch = inject(FetchNode);

  public cliente = this.storage.GetDatosCliente();
  public imagenesPrevisualizacion = signal<string[]>([]);
  public miForm: FormGroup;
  
  public tempTipoCambio: string = 'Manual';

  constructor() {
    const misAnunciosActuales = this.cliente()?.misAnuncios || [];

    this.miForm = this.fb.group({
      pathCategoria: ['bicis', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', [Validators.required], [ValidatorsPersonal.anuncioDuplicado(misAnunciosActuales)]],
      anioModelo: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],

      talla: ['', Validators.required],
      materialCuadro: ['Carbono', Validators.required],
      color: ['', Validators.required],
      fechaCompra: [''], 
      
      grupoCambio: [''],
      tipoFreno: ['Disco'],
      modeloFrenos: [''],
      tipoRuedas: ['Carbono'],
      modeloRuedas: [''],
      precioOriginal: [''],
      tieneFactura: [false],

      condicion: ['Bueno', Validators.required],
      detallesAdicionales: ['', [Validators.maxLength(1000)]],

      precioVenta: [null, [Validators.required, Validators.min(1)]],
      
      titulo: [''],
      estadoAnuncio: ['En revision']
    });
  }

  public errorFotos: string = '';

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    this.errorFotos = '';

    if (this.imagenesPrevisualizacion().length + files.length > 10) {
      this.errorFotos = '⚠️ Has superado el límite de 10 fotos.';
      event.target.value = ''; 
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.match(/image\/*/)) continue;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesPrevisualizacion.update(imgs => [...imgs, e.target.result]);
        
        if (this.imagenesPrevisualizacion().length >= 3 && this.errorFotos.includes('mínimo')) {
            this.errorFotos = '';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitAnuncio(esBorrador: boolean) {
    this.errorFotos = '';
    if (!esBorrador && this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }
    let errorEnFotos = false;
    if (!esBorrador && this.imagenesPrevisualizacion().length < 3) {
      this.errorFotos = '⚠️ Necesitas subir un mínimo de 3 fotos para publicar.';
      errorEnFotos = true;
    }

    if (!esBorrador && (this.miForm.invalid || errorEnFotos)) {
        return;
    }

    const valoresForm = this.miForm.value;
    const estadoAnuncio = esBorrador ? 'Borrador' : 'En revision';

    const nuevoAnuncio = {
      marca: valoresForm.marca,
      modelo: valoresForm.modelo,
      talla: valoresForm.talla,
      color: valoresForm.color,
      anioModelo: valoresForm.anioModelo.toString(), 
      materialCuadro: valoresForm.materialCuadro,
      tipoFreno: valoresForm.tipoFreno,
      tipoRuedas: valoresForm.tipoRuedas,
      modeloRuedas: valoresForm.modeloRuedas,
      grupoCambio: valoresForm.grupoCambio,
      modeloFrenos: valoresForm.modeloFrenos,
      condicion: valoresForm.condicion,
      detallesAdicionales: valoresForm.detallesAdicionales || "",
      
      tipo: valoresForm.pathCategoria, 
      pathCategoria: valoresForm.pathCategoria, 

      precioVenta: Number(valoresForm.precioVenta),
      precioOriginal: valoresForm.precioOriginal ? Number(valoresForm.precioOriginal) : 0,

      fechaCompra: valoresForm.fechaCompra ? new Date(valoresForm.fechaCompra).getTime() : Date.now(),

      tieneFactura: valoresForm.tieneFactura === true, 
      
      estadoAnuncio: estadoAnuncio,
      imagenes: this.imagenesPrevisualizacion()
    };

    console.log("Objeto corregido para enviar:", nuevoAnuncio);

    const emailCliente = this.cliente()?.cuenta.email;

    if (emailCliente) {
      const datosEnvio = { email: emailCliente, datosAnuncio: nuevoAnuncio };

      const respuestaSignal = this.fetch.CrearAnuncio(datosEnvio);

      effect(() => {
        const resp = respuestaSignal(); 

        if (resp.codigo === 100) {
            console.log("Enviando...");
        } 
        else if (resp.codigo === 0) {
            alert('¡Éxito! ' + resp.mensaje);
            this.storage.SetDatosCliente(resp.datos); 
            this.router.navigate(['/Cliente/MisAnuncios']);
        } 
        else {
            alert('Error: ' + resp.mensaje);
        }
      }, { injector: this.injector });

    } else {
      alert("Error: No se ha encontrado el email del cliente.");
    }
  }
}
