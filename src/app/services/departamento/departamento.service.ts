import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private myAppUrl:string =environment.endpointapi;
  private MyApiUrl:string ='api/Departamento/ObtenerAllDepartamentos';

  constructor(private http: HttpClient) { }

  obtenerDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.MyApiUrl}`);
  }
}
