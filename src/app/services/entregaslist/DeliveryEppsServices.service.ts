import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DeliveryEppsServices {
  private readonly baseUrl: string = 'http://localhost:7096/api/Entregas';

  constructor(private http: HttpClient) {}


  getAllEntregasAndNames(): Observable<any> {
    const url = `${this.baseUrl}/all-entregas-and-names`;
    return this.http.get<any>(url)
  }

  getEntregasByRequisitionNumber(requisitionNumber: string): Observable<any> {
    const url = `${this.baseUrl}/GetEntregasByRequisitionNumber/${requisitionNumber}`;
    return this.http.get<any>(url);
  }

  getAllEntregasById(idEntrega: number): Observable<any> {
    const url = `${this.baseUrl}/entrega-by-id/${idEntrega}`;
    return this.http.get<any>(url);
  }

  postCrearEntregaElementos(deliveryEpps: any[]): Observable<any[]> {
    const url = `${this.baseUrl}/CrearEntregaElementos`;
    return this.http.post<any[]>(url, deliveryEpps);
  }

  putEntregasEpp(id: number, deliveryEpps: any): Observable<any> {
    const url = `${this.baseUrl}/actualizarEntrega/${id}`;
    return this.http.put<any>(url, deliveryEpps);
  }

  deleteEntregasEpp(id: number): Observable<any> {
    const url = `${this.baseUrl}/DeleteEntregasEpp/${id}`;
    return this.http.delete<any>(url);
  }
}
