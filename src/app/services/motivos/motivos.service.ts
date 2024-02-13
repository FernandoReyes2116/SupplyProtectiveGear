import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {
  private myAppUrl: string = environment.endpointapi;
  private MyApiUrl: string = 'api/Motivos/ObtenerAllMotivos';

  constructor(private http: HttpClient) { }

  obtenerMotivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.MyApiUrl}`);
  }
}
