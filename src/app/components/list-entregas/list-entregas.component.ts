//Componentes
import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController  } from '@ionic/angular';

//SERVICIOS
import { DeliveryEppsServices } from 'src/app/services/entregaslist/DeliveryEppsServices.service';

//INTERFACES
import { DeliveryEpps } from 'src/app/interfaces/deliveryepps';

@Component({
  selector: 'app-list-entregas',
  templateUrl: './list-entregas.component.html',
  styleUrls: ['./list-entregas.component.scss'],
})
export class ListEntregasComponent  implements OnInit {
  entregas: DeliveryEpps[] = []; // Cambiado a DeliveryEpps
  filteredEntregas: DeliveryEpps[] = []; // Variable para almacenar las entregas filtradas

  constructor(
    private entregasServices:DeliveryEppsServices,
    private modalController: ModalController,
    private alertController :AlertController 

    ) { }

  ngOnInit() {
    this.getAllEntregas();
  }
  getAllEntregas() {
    this.entregasServices.getAllEntregasAndNames().subscribe(
      (pikachu) => {
        this.entregas = pikachu.data; // Almacena los resultados en la variable entregas
        console.log(this.entregas)
      },
      (error) => {
        console.error('Error al obtener las entregas:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }

  async filterByRequisitionNumber(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredEntregas = this.entregas.filter((entrega) =>
      entrega.requisitionNumber.toLowerCase().includes(searchTerm)
    );
  
    if (this.filteredEntregas.length === 0) {
      this.mostrarAlerta("No se encontraron requisiciones con ese número.");
      // Recargar la lista de requisiciones
      this.getAllEntregas(); // Suponiendo que tengas una función para cargar las entregas
    } else {
      this.mostrarAlerta("Requisición encontrada");
  
      // Mostrar la requisición en algún lugar de la interfaz
      const primeraRequisicionEncontrada = this.filteredEntregas[0];
      this.mostrarRequisicion(primeraRequisicionEncontrada); // Suponiendo que tengas una función para mostrar la requisición
    }
  }
  
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Busqueda Exitosa',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  mostrarRequisicion(requisicion: any) {
    // Aquí puedes implementar la lógica para mostrar la requisición en la interfaz,
    // ya sea a través de un modal, un componente específico, o de otra manera que prefieras.
    // Por ejemplo, si tienes un objeto 'requisicion' con campos como 'requisitionNumber', 'description', etc.,
    // podrías mostrar estos campos en un modal o en un área específica de la interfaz.
  }
    
    
}
