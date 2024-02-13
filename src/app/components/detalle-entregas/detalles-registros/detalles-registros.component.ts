import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { DetailsEppsServices } from 'src/app/services/detailseppsdeliverys/detailseppsdeliverys.service';
import { TodeliveryserviceService } from 'src/app/services/todeliveryepps/todeliveryservice.service';
import { DetalleEntrega, EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';

@Component({
  selector: 'app-detalles-registros',
  templateUrl: './detalles-registros.component.html',
  styleUrls: ['./detalles-registros.component.scss'],
})
export class DetallesRegistrosComponent implements OnInit {
  myform: FormGroup;
  loading = false;
  detalledata: DetalleEntrega [] = []; // Changed type to array of DetalleEntrega
  ePPaEntregar: EPPaEntregar[] = [];
  idDetalleEntrega!: number;
  totalCantidad: number = 0; // Variable para almacenar la suma de cantidad

  constructor(
    private _detailsEppsServices: DetailsEppsServices,
    private _todeliveryserviceService:TodeliveryserviceService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.idDetalleEntrega = Number(this.aRoute.snapshot.paramMap.get('idDetalleEntrega'));
    this.myform = this.fb.group({
      idMotivos: [''],
      nombreMotivo: [''],
      empleadoaEntrega: [''],
      ePPaEntregar: ['']
    });
  }

  ngOnInit() {
    this.obtenerDetalles();
    this.getEPPaEntregar();
  }

  obtenerDetalles() {
    this.loading = true;
    this._detailsEppsServices.obtenerEntregaPorDetalleId(this.idDetalleEntrega).subscribe(
      (data: any) => {
        this.detalledata = data.data;
   

      },
      (error) => {
        console.error('Error fetching EPPaEntregar data:', error);
        // Handle error (e.g., show toast)
        this.presentToast('Error fetching EPPaEntregar data');
      }
    );
  }

  getEPPaEntregar(): void {
    this._todeliveryserviceService.getEPPaEntregarByDetalleEntregaId(this.idDetalleEntrega)
      .subscribe(
        (data: any) => {
          this.ePPaEntregar = data.data;
               // Suponiendo que detalledata es un array de objetos con una propiedad 'cantidad'
               this.totalCantidad = this.ePPaEntregar.reduce((total, detalle) => total + detalle.cantidad, 0);

        },
        (error) => {
          console.error('Error fetching EPPaEntregar data:', error);
          // Handle error (e.g., show toast)
          this.presentToast('Error fetching EPPaEntregar data');
        }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  toList() {
    this.router.navigate(['/home/list-entregas']);
  }
}
