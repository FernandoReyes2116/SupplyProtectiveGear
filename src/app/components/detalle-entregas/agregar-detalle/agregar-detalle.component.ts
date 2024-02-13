import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,AbstractControl  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController,AlertController } from '@ionic/angular';

// Servicios
import { DetailsEppsServices } from 'src/app/services/detailseppsdeliverys/detailseppsdeliverys.service';
import { RequisicionListService } from 'src/app/services/requisicioneslist/requisicion.service';

import { MotivosService } from 'src/app/services/motivos/motivos.service';
// Interfaces
import { DetalleEntrega, EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';
import { Motivos } from 'src/app/interfaces/motivos';
import { RequisitionLine } from 'src/app/interfaces/requisiciones';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.scss'],
})
export class AgregarDetalleComponent implements OnInit {
  idEntrega!: number;
  myform: FormGroup;
  form!: FormGroup;
  motivos: Motivos[] = [];
  requisitionLines: RequisitionLine[] = [];
  eppaEntregarList: EPPaEntregar[] = [];


  //Variables solamente para los epp
  selectedItemsWithQuantities: EPPaEntregar[] = [];
  uniqueItems: string[] = [];
  selectedItem!: string;
  cantidad!:number;
  requisitionNumber: string = ''; // Declaración de requisitionNumber


  //INICIALIZADORES
  ngOnInit() {
    this.obtenerMotivos();
    this.agregarDetalle();

  
  }
  constructor(
    private _detailsEppsServices: DetailsEppsServices,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private _motivosService: MotivosService,
    private _requisicionListService:RequisicionListService,
    private toastController: ToastController,
    private alertController:AlertController

  ) {
    this.idEntrega = Number(this.aRoute.snapshot.paramMap.get('idEntrega'));
    console.log('Id de Entrega:', this.idEntrega);
      this.form = this.fb.group({
      idDetalleEntrega: [null], // Puedes inicializar con null si es opcional
      idMotivos: ['', Validators.required],
      empleadoaEntrega: ['', Validators.required],
      fechaRegistro: [null] ,// Puedes inicializar con null si es opcional
      eppaEntregarList: this.fb.array([]),

    });
    this.myform = this.fb.group({
      idEPPaEntregar: [''],
      item: [''],
      cantidad: [''],
    });


  }
  obtenerMotivos() {
    this._motivosService.obtenerMotivos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.motivos = response.data;
        } else {
          console.error(
            'La respuesta del servicio no contiene la propiedad "data" con un arreglo de motivos.'
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de motivos:', error);
      },
    });
  }


  agregarDetalle() {
    console.log('Id de Entrega:', this.idEntrega);
    console.log('Formulario:', this.form.value);
  
    if (this.form.valid) {
      // Construir el objeto DetalleEntrega con las interfaces definidas
      const detalleEntrega: DetalleEntrega = {
        idMotivos: this.form.value.idMotivos,
        nombreMotivo: '',  // Reemplazar con el valor correcto si es necesario
        empleadoaEntrega: this.form.value.empleadoaEntrega,
        ePPaEntregars: this.eppaEntregarList,
      };
  
      // Llamar al servicio para crear un nuevo detalle
      this._detailsEppsServices
        .crearDetalleEntrega(detalleEntrega, this.idEntrega)
        .subscribe({
          next: async (response: DetalleEntrega) => {
            console.log('Detalle agregado con éxito', response);
            // Redirigir a otra página o realizar acciones adicionales si es necesario
            this.router.navigate(['/home/list-entregas']);
            const toast = await this.toastController.create({
              message: 'El detalle se agregó exitosamente.',
              duration: 5000, // Duración en milisegundos
              position: 'bottom', // Posición del Toast (top, bottom, middle)
            });
  
            toast.present();
          },
          error: async (error) => {
            console.error('Error al crear el detalle:', error);
            // Mostrar un mensaje de error al usuario o realizar acciones adicionales
            const toast = await this.toastController.create({
              message: 'Error al crear el detalle',
              duration: 5000, // Duración en milisegundos
              position: 'bottom', // Posición del Toast (top, bottom, middle)
            });
  
            toast.present();
          },
        });
    } else {
      console.error(
        'Formulario no válido. Por favor, completa todos los campos correctamente.'
      );
      // Mostrar un mensaje de error al usuario o realizar acciones adicionales
    }
  }







  // Agregar un nuevo item a la lista
  agregarItem() {
    const newItem: EPPaEntregar = {
      item: this.myform.get('item')?.value,
      cantidad: this.myform.get('cantidad')?.value,
      
    };
    this.eppaEntregarList.push(newItem);
    // Limpiar los campos del formulario después de agregar el item
    this.myform.reset();
  }
  
  eliminarItem(item: EPPaEntregar) {
    // Encontrar el índice del elemento en el array
    const index = this.eppaEntregarList.indexOf(item);
    
    // Si el elemento existe en la lista, eliminarlo
    if (index !== -1) {
      this.eppaEntregarList.splice(index, 1);
    }
  }
 
  
  toList() {
    this.router.navigate(['/home/list-entregas']);
  }
  

//manejando lo que es requisitionline
loadRequisitionLines(requisitionNumber: string): void {
  this._requisicionListService
    .getRequisitionLinesByRequisitionNumber(requisitionNumber)
    .subscribe(
      (data: any) => {
        console.log('Requisition lines by number:', data);
        this.requisitionLines = data.Data;
        this.uniqueItems = this.requisitionLines
          .map((line) => line.Item)
          .filter((value, index, self) => self.indexOf(value) === index);
          this.presentAlert('Exito!', 'Requisición Encontrada.');

      },
      (error: any) => {
        console.error(
          'Error fetching requisition lines by number',
          error
          
        );
      }
    );
}
async presentAlert(header: string, message: string): Promise<void> {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK'],
  });

  await alert.present();
}






}
