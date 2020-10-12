import {SaleOrderLine} from "./sale-order-line.model";

export class SaleOrder {

  public constructor() {
    this.orderLines = [];
    this.total = 0;
  }

  public id: string;
  public total: number;
  public clientName: string;
  public clientRfc: string;
  public clientBusinessName: string;
  public employeeId: string;
  public employeeName: string;
  public finishDate: string;
  public status: string;

  public orderLines: SaleOrderLine[];
}
