import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleEntrega } from 'src/app/interfaces/detailseppsdeliverys';

@Injectable({
  providedIn: 'root'
})
export class DetailsEppsServices {
  private apiUrl: string = environment.endpointapi;
  private apiEndpoint: string = 'api/DetalleEntrega/';

  constructor(private http: HttpClient) { }
  ///METODOS GET
  getAllDetallesEntrega(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.apiEndpoint}GetAllDetallesEntrega`);
  }

  obtenerEntregaPorDetalleId(idDetalleEntrega: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.apiEndpoint}ObtenerEntregaPorDetalleId/${idDetalleEntrega}`);
  }  

  obtenerDetallesPorEntregaId(idEntrega: number): Observable<DetalleEntrega> {
    return this.http.get<DetalleEntrega>(`${this.apiUrl}${this.apiEndpoint}detallesPorEntrega/${idEntrega}`);
  }

  obtenerDetallePorEntregaYDetalleId(idEntrega: number, idDetalleEntrega: number): Observable<DetalleEntrega> {
    return this.http.get<DetalleEntrega>(`${this.apiUrl}${this.apiEndpoint}ObtenerDetallePorEntregaYDetalleId/${idEntrega}/${idDetalleEntrega}`);
  }

  ///METODOS POST

  crearDetalleEntrega(detalleEntregaDTO: any, idEntrega: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.apiEndpoint}CrearDetalleEntrega/${idEntrega}`, detalleEntregaDTO);
  }

  ///METODOS PUT
  actualizarDetalleEntregas(idDetalleEntrega: number, detalleEntrega: any): Observable<any> {
    const url =`${this.apiUrl}${this.apiEndpoint}PutDetalleEntregas/${idDetalleEntrega}`
    return this.http.put<any>(url, detalleEntrega);
  }

  ///METODOS DELETE
  eliminarDetalleEntregaYAsociados(idDetalleEntrega: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.apiEndpoint}EliminarDetalleEntregaYAsociados/${idDetalleEntrega}`);
  }
}
