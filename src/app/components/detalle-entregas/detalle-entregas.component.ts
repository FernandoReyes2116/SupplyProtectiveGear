//componentes
import { Component,OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//servicios
import { DetailsEppsServices } from 'src/app/services/detailseppsdeliverys/detailseppsdeliverys.service';
import { DeliveryEppsServices } from 'src/app/services/entregaslist/DeliveryEppsServices.service';
import { TodeliveryserviceService } from 'src/app/services/todeliveryepps/todeliveryservice.service';
//interfaces
import { DetalleEntrega, EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';

@Component({
  selector: 'app-detalle-entregas',
  templateUrl: './detalle-entregas.component.html',
  styleUrls: ['./detalle-entregas.component.scss'],
})
export class DetalleEntregasComponent implements OnInit {

  @ViewChild('pieDePagina', {static: false}) pieDePagina: ElementRef | undefined;

  
  //Carga de componentes
  loading = false;
  myform: FormGroup;
  filtro: string = '';

  //Variables de Entorno interfaces
  detalles: DetalleEntrega[] = [];
  epps:EPPaEntregar [] = [];

  //Variables de entorno indentificadores
  idEntrega!: number;
  idDetalleEntrega!:number;
  totalCantidad: number = 0; // Variable para almacenar la suma de cantidad

  constructor(
    private _detailsEppsServices: DetailsEppsServices,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private elementRef:ElementRef
  ) {
    this.idEntrega = Number(this.aRoute.snapshot.paramMap.get('idEntrega'));
    this.idDetalleEntrega = Number(this.aRoute.snapshot.paramMap.get('idDetalleEntrega'));

    this.myform = this.fb.group({
      idDetalleEntrega: [''],
      idMotivos: [''],
      nombreMotivo: [''],
      empleadoaEntrega: [''],
      ePPaEntregars: this.fb.array([]),
      fechaRegistro: [''],
    });
  }

  ngOnInit() {
    this.getDetallesById();
    this.scrollToFooter();

  }

  scrollToFooter() {
    if (this.pieDePagina && this.pieDePagina.nativeElement) {
      this.pieDePagina.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }


  getDetallesById() {
    this.loading = true;
    this._detailsEppsServices.obtenerDetallesPorEntregaId(this.idEntrega).subscribe(
      (response: any) => {
        if (response.data && response.data.length > 0) {
          this.detalles = response.data;
          // Asignar los detalles a this.epps solo si deseas utilizarlos posteriormente
          this.epps = response.data;
          // Suponiendo que detalledata es un array de objetos con una propiedad 'cantidad'
          this.totalCantidad = this.epps.reduce((total, detalle) => total + detalle.cantidad, 0);
          // Filtrar detalles basados en el término de búsqueda
          this.filtrarDetalles();
        } else {
          console.error('No se encontraron detalles de entrega.');
          // Muestra un alert indicando que no hay detalles y pregunta si desea crear uno
          if (confirm('No hay detalles de entrega. ¿Desea crear uno nuevo?')) {
            // Aquí puedes navegar al componente o realizar la acción necesaria para crear un nuevo detalle.
          } else {
            // Aquí puedes redirigir al usuario a otra página o realizar cualquier otra acción.
          }
        }
        this.loading = false;
        console.log(this.detalles);
      },
      (error) => {
        this.loading = false;
        console.error('Error al obtener la entrega:', error);
      }
    );
  }
  

recargarPagina() {
  window.location.reload();
}

filtrarDetalles() {
  if (this.filtro) {
    const termino = this.filtro.toLowerCase();
    this.detalles = this.detalles.filter(detalle => {
      const motivoMatches = detalle.nombreMotivo.toLowerCase().includes(termino);
      const empleadoMatches = detalle.empleadoaEntrega.toLowerCase().includes(termino);
      const eppsMatches = detalle.ePPaEntregars && detalle.ePPaEntregars.some(epp => epp.item.toLowerCase().includes(termino));
      const cantidadMatches = detalle.ePPaEntregars && detalle.ePPaEntregars.some(epp => epp.cantidad.toString().includes(termino));

      return motivoMatches || empleadoMatches || eppsMatches || cantidadMatches;
    });
  }
}



  toList() {
    this.router.navigate(['/home/list-entregas']);
  }
  add() {
    this.router.navigate(['/home/agregar-entregas']);
  }


  
     





}
