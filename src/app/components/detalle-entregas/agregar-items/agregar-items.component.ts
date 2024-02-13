import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController,AlertController } from '@ionic/angular';

//sevicio
import { TodeliveryserviceService } from 'src/app/services/todeliveryepps/todeliveryservice.service';

//interface
import { EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';
import { RequisitionLine } from 'src/app/interfaces/requisiciones';
import { RequisicionListService } from 'src/app/services/requisicioneslist/requisicion.service';

@Component({
  selector: 'app-agregar-items',
  templateUrl: './agregar-items.component.html',
  styleUrls: ['./agregar-items.component.scss'],
})
export class AgregarItemsComponent  implements OnInit {
  //componentes
  myform: FormGroup;

  //interface
  eppaEntregarList: EPPaEntregar[] = [];
  requisitionLines: RequisitionLine[] = [];

  //variable
  idDetalleEntrega: number;
  uniqueItems: string[] = [];
  RequiredQuantity!:number;
  selectedItem!: string; // Variable para almacenar el elemento seleccionado
  requisitionNumber: string = ''; // Declaración de requisitionNumber

  constructor(
    private _todeliveryserviceService: TodeliveryserviceService,
    private _requisicionListService:RequisicionListService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController 

    ) 
    { 
      this.idDetalleEntrega = Number(this.aRoute.snapshot.paramMap.get('idDetalleEntrega')!);
      this.myform = this.fb.group({
      idEPPaEntregar: [''],
      item: [''],
      cantidad: [''],
    });
  }

  ngOnInit() {this.guardarDatos();    ;
}

async guardarDatos() {
  // Verificar si hay campos vacíos
  if (this.myform.valid) {
    if (this.camposEstanLlenos()) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas guardar los elementos?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            }
          },
          {
            text: 'Guardar',
            handler: () => {
              this._todeliveryserviceService.PostEpplistEntregarById(this.eppaEntregarList, this.idDetalleEntrega)
                .subscribe(
                  response => {
                    // Manejar la respuesta del servidor si es necesario
                    console.log(response);
                    this.router.navigate(['/home/detalle-list']);
                  },
                  error => {
                    // Manejar errores si es necesario
                    console.error(error);
                  }
                );
            }
          }
        ]
      });
  
      await alert.present();
  }


  } else {
    // Mostrar un mensaje indicando que hay campos vacíos
    console.log('No se pueden guardar elementos con campos vacíos.');
  }
}

// Función para verificar si los campos están llenos
camposEstanLlenos(): boolean {
  // Aquí debes implementar la lógica para verificar si los campos están llenos
  // Por ejemplo, si tienes campos en un formulario, puedes verificar si esos campos tienen valores válidos.
  // Si todos los campos están llenos y válidos, devuelve true; de lo contrario, devuelve false.
  // Por ejemplo:
  if (this.eppaEntregarList.length > 0 && this.idDetalleEntrega) {
    return true;
  } else {
    return false;
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
    
    toList() {
      this.router.navigate(['/home/list-entregas']);
    }

}
