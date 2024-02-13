import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EPPaEntregar } from 'src/app/interfaces/detailseppsdeliverys';

@Injectable({
  providedIn: 'root'
})
export class TodeliveryserviceService {
  private myAppUrl:string =environment.endpointapi;
  private MyApiUrl:string ='api/EPPaEntregar/';

  constructor(private http:HttpClient) { }

///////////////////////////////////////////////////////////////////////////////////
  getTodeliveryepps(): Observable<EPPaEntregar[]>{
    return  this.http.get<EPPaEntregar[]>(`${this.myAppUrl}${this.MyApiUrl}`); }

  getTodeliveryeppsid(id:number):Observable<EPPaEntregar>{
    return this.http.get<EPPaEntregar>(`${this.myAppUrl}${this.MyApiUrl}${id}`);}

  getEPPaEntregarByDetalleEntregaId(idDetalleEntrega: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.MyApiUrl}detalleEntrega/${idDetalleEntrega}`);
  }
 
  // Método para enviar datos al servidor utilizando POST
  postEPPaEntregar(eppaEntregar: any, idDetalleEntrega: number): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.MyApiUrl}${idDetalleEntrega}`, eppaEntregar);
  }

   // Método para enviar datos al servidor utilizando POST
  PostEpplistEntregarById(eppaEntregarList: EPPaEntregar[], idDetalleEntrega: number): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.MyApiUrl}postlist/${idDetalleEntrega}`, eppaEntregarList);
  }

}
