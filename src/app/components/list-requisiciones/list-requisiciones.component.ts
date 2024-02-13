import { Component } from '@angular/core';
import { AlertController,LoadingController  } from '@ionic/angular';


//servicio
import { RequisicionListService } from 'src/app/services/requisicioneslist/requisicion.service';

//interface
import { Requisition, RequisitionLine } from 'src/app/interfaces/requisiciones';

@Component({
  selector: 'app-list-requisiciones',
  templateUrl: './list-requisiciones.component.html',
  styleUrls: ['./list-requisiciones.component.scss'],
})
export class ListRequisicionesComponent  {
  requisitionLines: RequisitionLine[] = []; // Propiedad para almacenar las líneas de requisición
  requisitionsWithLines: Requisition[] = [];
  requisitionAndAllLines: any; // Define el tipo de datos adecuado
  requisitionNumber: string = ''; // Declaración de requisitionNumber

  constructor(private requisicionService: RequisicionListService,
    private alertController: AlertController,
    private loadingController: LoadingController

    ) { }

    async loadDataWithDelay(requisitionNumber: string): Promise<void> {
      const loading = await this.presentLoading();
  
      setTimeout(() => {
        this.loadRequisitionLines(requisitionNumber);
        loading.dismiss();
      }, 3000); // Espera 3 segundos antes de cargar los datos
    }

    loadRequisitionLines(requisitionNumber: string): void {
      this.requisicionService.getRequisitionLinesByRequisitionNumber(requisitionNumber).subscribe(
        (data: any) => {
          console.log('Requisition lines by number:', data);
          this.requisitionLines = data.Data;
          this.presentAlert('Exito!', 'Requisición Encontrada.');

        },
        (error: any) => {
          console.error('Error fetching requisition lines by number', error);
  
          if (error.status === 404) {
            // La requisición no existe
            this.presentAlert('Error', 'La requisición no existe.');
          } else {
            // Otro tipo de error
            this.presentAlert('Error', 'Ocurrió un error al cargar las líneas de requisición.');
          }
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

    async presentLoading(): Promise<HTMLIonLoadingElement> {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        duration: 3000, // Tiempo máximo de espera
      });
  
      await loading.present();
      return loading;
    }
}
