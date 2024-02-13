//Componentes de Ionic-angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';


//Servicios
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { GerenciaService } from 'src/app/services/gerencia/gerencia.service';
import { DeliveryEppsServices } from 'src/app/services/entregaslist/DeliveryEppsServices.service';

//Interfaces
import { Gerencia } from 'src/app/interfaces/gerencia';
import { Departamento } from 'src/app/interfaces/departamento';
import { DeliveryEpps } from 'src/app/interfaces/deliveryepps';

@Component({
  selector: 'app-aperturar-entregas',
  templateUrl: './aperturar-entregas.component.html',
  styleUrls: ['./aperturar-entregas.component.scss'],
})
export class AperturarEntregasComponent  implements OnInit {
  gerencias: Gerencia[] = [];
  departamentos: Departamento[] = [];
  operacion: string = 'Agregar';
  form: FormGroup;
  listaEntregas: DeliveryEpps[] = [];

  ngOnInit(): void {
    this.obtenerGerencias();
    this.obtenerDepartamentos();
  }

  constructor(
    private fb: FormBuilder,
    private _deliveryEpps: DeliveryEppsServices,
    private _gerenciaService: GerenciaService,
    private _departamentoService: DepartamentoService,
    private modalController: ModalController,
    private alertController: AlertController,
    
  ){
    this.form = this.fb.group({
      requisitionNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^R\d{9}$/), // Asegura que comienza con 'R' seguido de 9 dígitos
        ],
      ],
      idUsuario: ['', [Validators.required]],
      idDepartamento: ['', Validators.required],
      idGerencia: ['', Validators.required],
      observaciones: [''],
      detalleEntrega: ['']
    });
  }



  get requisitionNumber() {
    return this.form.get('requisitionNumber');
  }

  async adddeliveryepps() {
    if (this.requisitionNumber!.invalid) {
      const errorAlert = await this.alertController.create({
        header: 'Error de validación',
        message: 'El número de requisición es inválido. Asegúrate de que cumple con los requisitos. Ejemplo:R000000106',
        buttons: ['OK']
      });

      await errorAlert.present();
      return;
    }

   const nuevaEntrega: DeliveryEpps = {
      idEntrega: 0,
      requisitionNumber: this.form.value.requisitionNumber,
      idUsuario: this.form.value.idUsuario,
      idDepartamento: this.form.value.idDepartamento,
      idGerencia: this.form.value.idGerencia,
      observaciones: this.form.value.observaciones,
      detalleEntrega: [],
      nombreDepartamento: '', // Deja estas propiedades vacías
      nombreGerencia: '',     // Deja estas propiedades vacías
      };
    

    this._deliveryEpps.postCrearEntregaElementos([nuevaEntrega]).subscribe({
      next: (response: any[]) => {
        if (response && Array.isArray(response) && response.length > 0 && response[0].data) {
          this.listaEntregas.push(response[0].data);
          this.form.reset();

          const successAlert = this.alertController.create({
            header: 'Entrega Agregada',
            message: 'La entrega ha sido agregada correctamente.',
            buttons: ['OK']
          });

          successAlert.then(alert => {
            alert.present();
            setTimeout(() => {
              alert.dismiss();
            }, 2000);
          });
        } else {
          console.error('La respuesta del servidor no tiene la estructura esperada:', response);
        }
      },
      error: (error) => {
        console.error('Error al agregar la entrega:', error);
      }
    });
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



}
