import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisicionListService {
  private readonly baseUrl: string = 'http://localhost:5025/api/supply-chain/requisitions';

  constructor(private http: HttpClient) { }

  getRequisitionWithLines(requisitionId: number): Observable<any> {
    const url = `${this.baseUrl}/${requisitionId}/requisition-with-lines`;
    return this.http.get<any>(url);
  }

  getRequisitionModelWithLinesDetails(requisitionId: number): Observable<any> {
    const url = `${this.baseUrl}/${requisitionId}/requisition-model-with-linesDetails`;
    return this.http.get<any>(url);
  }

  getRequisitionAndAllLinesForRequisitionNumber(requisitionNumber: string): Observable<any> {
    const url = `${this.baseUrl}/requisition-and-all-lines?requisitionNumber=${requisitionNumber}`;
    return this.http.get<any>(url);
  }
 
  getAllRequisitionselectpage(pageNumber: number = 1, pageSize: number = 20): Observable<any> {
    const url = `${this.baseUrl}/allrequisitionselectpage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getRequisitionLinesByRequisitionNumber(requisitionNumber: string): Observable<any> {
    const url = `${this.baseUrl}/requisition-lines-by-number/${requisitionNumber}`;
    return this.http.get<any>(url);
  }
}
