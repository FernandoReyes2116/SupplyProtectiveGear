import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GerenciaService {
  private myAppUrl:string =environment.endpointapi;
  private MyApiUrl:string ='api/Gerencia/ObtenerAllGerencias';

  constructor(private http: HttpClient) { }

  obtenerGerencias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.MyApiUrl}`);
  }
}
