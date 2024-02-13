import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

//SERVICIO 
import { DeliveryEppsServices } from 'src/app/services/entregaslist/DeliveryEppsServices.service';
import { GerenciaService } from 'src/app/services/gerencia/gerencia.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
//INTERFACE 
import { Gerencia } from 'src/app/interfaces/gerencia';
import { Departamento } from 'src/app/interfaces/departamento';
import { DeliveryEpps } from 'src/app/interfaces/deliveryepps';

@Component({
  selector: 'app-editar-entrega',
  templateUrl: './editar-entrega.component.html',
  styleUrls: ['./editar-entrega.component.scss'],
})
export class EditarEntregaComponent implements OnInit{
  //componentes
  myform: FormGroup; // Declare a FormGroup for your form
  loading: boolean = false;

  //servicios
  entregaData: DeliveryEpps | null = null;

  //interfaces
  gerencias: Gerencia[] = [];
  departamentos: Departamento[] = [];

  //vatiables
  idEntrega!: number;

  ngOnInit(): void {
    this.obtenerGerencias();
    this.obtenerDepartamentos();
    this.getAllEntregasById();
  }

  constructor(
    private _deliveryepps: DeliveryEppsServices,     
    private _departamentoService: DepartamentoService,
    private _gerenciaService: GerenciaService,
    private fb: FormBuilder,  
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
    ) { 
    this.idEntrega = Number(this.aRoute.snapshot.paramMap.get('idEntrega'));
    this.myform = this.fb.group({
      idDepartamento: [''], 
      idGerencia: [''],
      observaciones: ['']   
     });
     
  }

  getAllEntregasById() {
    this.loading = true;
    this._deliveryepps.getAllEntregasById(this.idEntrega).subscribe(
      (data: any) => {
        if (data.data) {

          this.entregaData = data.data;
          
          if (this.entregaData) {
            this.myform.patchValue({
              idEntrega: this.entregaData.idEntrega,
              requisitionNumber: this.entregaData.requisitionNumber,
              idUsuario: this.entregaData.idUsuario,
              idDepartamento: this.entregaData.idDepartamento,
              idGerencia: this.entregaData.idGerencia,
              nombreDepartamento: this.entregaData.nombreDepartamento,
              nombreGerencia: this.entregaData.nombreGerencia,
              observaciones: this.entregaData.observaciones,
              foto: this.entregaData.foto,
              fechaSolicitud: this.entregaData.fechaSolicitud,
              detalleEntrega: this.entregaData.detalleEntrega,
            });
          }          
        } else {
          console.error('La entrega no se encontró.');
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener la entrega:', error);
      }
    );
  }


  //funcion para mantener algunos campos como estas y solo editar los requeridos
  updateEntregasEpp() {
    if (this.myform && this.myform.valid) {
      console.log(this.myform)
      if (this.idEntrega !== null && this.idEntrega !== undefined) {
        const idDepartamentoControl = this.myform.get('idDepartamento');
        const idGerenciaControl = this.myform.get('idGerencia');
        const observacionesControl = this.myform.get('observaciones');
  
        if (idDepartamentoControl && idGerenciaControl && observacionesControl) {
          const editableFields = {
            idEntrega: this.entregaData!.idEntrega,
            requisitionNumber: this.entregaData!.requisitionNumber,
            idUsuario: this.entregaData!.idUsuario,
            idDepartamento: this.entregaData!.idDepartamento,
            idGerencia: this.entregaData!.idGerencia,
            nombreDepartamento: this.entregaData!.nombreDepartamento,
            nombreGerencia: this.entregaData!.nombreGerencia,
            observaciones: this.entregaData!.observaciones,
            foto: this.entregaData!.foto,
            detalleEntrega: this.entregaData!.detalleEntrega,
          };
  
          const partialUpdatedEntregas: Partial<DeliveryEpps> = {
            idDepartamento: idDepartamentoControl.value,
            idGerencia: idGerenciaControl.value,
            observaciones: observacionesControl.value,
          };
          this.loading = true;
          this._deliveryepps.putEntregasEpp(this.idEntrega, { ...editableFields, ...partialUpdatedEntregas }).subscribe(
            async (data: any) => {
              this.loading = false;
              console.log('EntregasEpp updated successfully:', data);
              const toast = await this.toastController.create({
                message: 'La entrega se actualizó exitosamente.',
                duration: 4000, // Duración en milisegundos
                position: 'bottom' // Posición del Toast (top, bottom, middle)
              });
          
              toast.present();
              this.router.navigate(['/home/list-entregas']);
            },
            (error) => {
              this.loading = false;
              console.error('Error updating EntregasEpp:', error);
            }
          );
        } else {
          console.error('Los campos del formulario no se encontraron.');
        }
      } else {
        console.error('El ID es nulo o indefinido.');
      }
    } else {
      console.error('El formulario no es válido o es nulo.');
    }
  }
  
  


  obtenerDepartamentos() {
    this._departamentoService.obtenerDepartamentos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.departamentos = response.data;
        } else {
          console.error('La respuesta del servicio no contiene la propiedad "data" con un arreglo de departamentos.');
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de departamentos:', error);
      }
    });
  }

  obtenerGerencias() {
    this._gerenciaService.obtenerGerencias().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.gerencias = response.data;
        } else {
          console.error('La respuesta del servicio no contiene la propiedad "data" con un arreglo de gerencias.');
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de gerencias:', error);
      }
    });
  }
  

  toList() {
    this.router.navigate(['/home/list-entregas']);
  }
}
