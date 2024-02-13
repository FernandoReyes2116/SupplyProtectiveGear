
export interface DetalleEntrega {
  idDetalleEntrega?: number;
  idMotivos: number;
  nombreMotivo:string;
  empleadoaEntrega: string;
  ePPaEntregars: EPPaEntregar[];
  fechaRegistro?: Date | null;
}

export interface EPPaEntregar {
  idEPPaEntregar?: number;
  item: string;
  cantidad: number;
  // Otras propiedades si son necesarias
}
