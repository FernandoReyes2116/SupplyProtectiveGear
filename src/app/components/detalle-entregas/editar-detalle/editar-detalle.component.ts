import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// SERVICIOS
import { DetailsEppsServices } from 'src/app/services/detailseppsdeliverys/detailseppsdeliverys.service';
import { MotivosService } from 'src/app/services/motivos/motivos.service';

// INTERFACES
import { DetalleEntrega } from 'src/app/interfaces/detailseppsdeliverys';
import { Motivos } from 'src/app/interfaces/motivos';

@Component({
  selector: 'app-editar-detalle',
  templateUrl: './editar-detalle.component.html',
  styleUrls: ['./editar-detalle.component.scss'],
})
export class EditarDetalleComponent implements OnInit {
   //componentes
   myform: FormGroup; // Declare a FormGroup for your form
   loading: boolean = false;
  
   //servicios
   detalleData: DetalleEntrega | null = null; 

   //interfaces
   Motivos: Motivos[] = [];
  
   //vatiables
   idDetalleEntrega!: number;
    
   //Inicializadores
   ngOnInit() {
    this.obtenerDetallePorId();
    this.obtenerMotivos();
    this.updateDetalle();
  }

  constructor(
    private _detailsEppsServices: DetailsEppsServices,
    private _motivosService: MotivosService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.idDetalleEntrega = Number(this.aRoute.snapshot.paramMap.get('idDetalleEntrega'));
    this.myform = this.fb.group({
      idMotivos: [''],
      empleadoaEntrega: [''],
    });
  }



  obtenerDetallePorId() {
    this.loading = true;
    this._detailsEppsServices.obtenerEntregaPorDetalleId(this.idDetalleEntrega).subscribe(
      (data: any) => {
        if (data.data) {

          this.detalleData = data,data;
          console.log('data extraida',data.data); 

          if (this.detalleData) {
            this.myform.patchValue({
              idDetalleEntrega: this.detalleData.idDetalleEntrega,
              idMotivos: this.detalleData.idMotivos,
              nombreMotivo: this.detalleData.nombreMotivo,
              empleadoaEntrega: this.detalleData.empleadoaEntrega,
              ePPaEntregars:this.detalleData.ePPaEntregars,
              fechaRegistro: this.detalleData.fechaRegistro,
            });
          }
          
        } else {
          console.error('No se encontraron datos o la estructura de datos no es la esperada.');
          // Puedes mostrar un mensaje de error al usuario o realizar alguna acción adicional según sea necesario.
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener el detalle de entrega:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar alguna acción adicional según sea necesario.
      }
    );
  }
  

  updateDetalle() {
    if (this.myform && this.myform.valid) {
      console.log(this.myform)
      if (this.idDetalleEntrega !== null && this.idDetalleEntrega !== undefined) {

        const idMotivosControl = this.myform.get('idMotivos');
        const empleadoaEntregaControl = this.myform.get('empleadoaEntrega');

        if (idMotivosControl && empleadoaEntregaControl) {
          const editableFields = {
            idDetalleEntrega: this.detalleData!.idDetalleEntrega,
            idMotivos: this.detalleData!.idMotivos,
            nombreMotivo: this.detalleData!.nombreMotivo,
            empleadoaEntrega: this.detalleData!.empleadoaEntrega,
            ePPaEntregars:this.detalleData!.ePPaEntregars,
            fechaRegistro: this.detalleData!.fechaRegistro,
          };  

          const partialUpdatedDetalle: Partial<DetalleEntrega> = {
            idMotivos:idMotivosControl.value,
            empleadoaEntrega:empleadoaEntregaControl.value,
          };

          this.loading = true;
          this._detailsEppsServices.actualizarDetalleEntregas(this.idDetalleEntrega, { ...editableFields, ...partialUpdatedDetalle }).subscribe(
            async (data: any) => {
              console.log('data para editar',data.data); 

              this.loading = false;
              
              console.log('Detalle de entrega actualizado con éxito:', data);
              const toast = await this.toastController.create({
                message: 'El detalle de entrega se actualizó exitosamente.',
                duration: 4000,
                position: 'bottom'
              });
              toast.present();
            },
            (error) => {
              this.loading = false;
              console.error('Error al actualizar el detalle de entrega:', error);
            }
          );
        } else {
          console.error('Los campos del formulario no se encontraron.');
        }
      } else {
        console.error('El ID del detalle de entrega es nulo o indefinido.');
      }
    } else {
      console.error('El formulario no es válido o es nulo.');
    }
  }
  
  

  obtenerMotivos() {
    this._motivosService.obtenerMotivos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.Motivos = response.data;
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

  toList() {
    this.router.navigate(['/home/list-entregas']);
  }
}
