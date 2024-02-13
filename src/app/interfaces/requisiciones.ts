export interface Requisition {
  Id: number;
  RequisitionNumber: string;
  PickTicketNumber: string;
  Description: string;
  RequestUser: string;
  Assigned: string;
  Department: string;
  Site: string;
  Warehouse: string;
  UnitCode: string;
  RequisitionTypeId: number;
  Status: string;
  WorkOrder: string;
  Total: number;
  RequisitionDate: Date;
  UserInfo: any; // Deberías definir el tipo específico si conoces la estructura de datos
  Project: string;
  Task: string;
  RequisitionType: any; // Deberías definir el tipo específico si conoces la estructura de datos
  IsService: boolean;
  IsReserve: boolean;
  IsReadOnly: boolean;
  DispatchId: number;
  ReserveDepartment: string;
  CostCode: any; // Deberías definir el tipo específico si conoces la estructura de datos
  ProjectCSI: string;
  PimsServiceOrderNumber: any; // Deberías definir el tipo específico si conoces la estructura de datos
  PurchaseOrderServiceAsociated: any; // Deberías definir el tipo específico si conoces la estructura de datos
  TaskCost: any; // Deberías definir el tipo específico si conoces la estructura de datos
  IsMachinery: boolean;
  isSpecialPermissions: boolean;
}

export interface RequisitionLine {
  Id: number;
  RequisitionId: number;
  RequisitionNumber: string;
  Item: string;
  ItemDescription: string;
  ItemLongDescription: string;
  RequiredQuantity: number;
  ItemPrice: number;
  Total: number;
  UM: string;
  UMDescription: string;
  RecordDate: Date;
  Status: string;
  ApprovalRouteId: number;
  CurrentApprovalLevel: number;
  ApprovalRouteCategory: string;
  ItemLot: string;
  LotTracked: boolean;
  UserInfo: any; // Deberías definir el tipo específico si conoces la estructura de datos
  Messages: string;
  ValidationMessages: string[];
}
