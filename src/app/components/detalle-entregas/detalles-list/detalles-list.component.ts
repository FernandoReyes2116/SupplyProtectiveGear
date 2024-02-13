import { Component, OnInit } from '@angular/core';
import { DetailsEppsServices } from 'src/app/services/detailseppsdeliverys/detailseppsdeliverys.service';
import { DetalleEntrega, EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalles-list',
  templateUrl: './detalles-list.component.html',
  styleUrls: ['./detalles-list.component.scss']
})
export class DetallesListComponent implements OnInit {
  detallesEntrega: DetalleEntrega [] = []; // Cambiado a un array de detalles

  loading = false;
  filtro: string = '';
  idDetalleEntrega!:number;
  epps: EPPaEntregar[] = [];

  constructor(
    private _detailsEppsServices: DetailsEppsServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDetallesEntrega();
  }

  getAllDetallesEntrega() {
    this._detailsEppsServices.getAllDetallesEntrega().subscribe(
      (response) => {
        this.detallesEntrega = response.data; // Asigna el arreglo de detalles de entrega recibido

      },
      (error) => {
        console.error('Error al obtener los detalles de entrega:', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }


  recargarPagina() {
    window.location.reload();
  }
  
  filtrarDetalles() {
    if (this.filtro) {
      const termino = this.filtro.toLowerCase();
      this.detallesEntrega = this.detallesEntrega.filter(detalle => {
        const motivoMatches = detalle.nombreMotivo.toLowerCase().includes(termino);
        const empleadoMatches = detalle.empleadoaEntrega.toLowerCase().includes(termino);
        const eppsMatches = detalle.ePPaEntregars && detalle.ePPaEntregars.some(epp => epp.item.toLowerCase().includes(termino));
        const cantidadMatches = detalle.ePPaEntregars && detalle.ePPaEntregars.some(epp => epp.cantidad.toString().includes(termino));
  
        return motivoMatches || empleadoMatches || eppsMatches || cantidadMatches;
      });
    } else {
      this.getAllDetallesEntrega();
    }
  }
  

  toList() {
    this.router.navigate(['/home/list-entregas']);
  }

  add() {
    this.router.navigate(['/home/agregar-entregas']);
  }
}
