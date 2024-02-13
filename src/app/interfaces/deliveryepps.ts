
// todeliveryepps.ts
import { DetalleEntrega } from "./detailseppsdeliverys";

export interface DeliveryEpps {
  idEntrega?: number;
  requisitionNumber: string;
  idUsuario: number;
  idDepartamento: number;
  idGerencia: number;
  nombreDepartamento:string;
  nombreGerencia: string;
  observaciones?: string | null;
  foto?: string | null;
  fechaSolicitud?: Date | null; // Agrega la propiedad fechaSolicitud si la necesitas

  detalleEntrega: DetalleEntrega[]; // Ensure this is an array
}
