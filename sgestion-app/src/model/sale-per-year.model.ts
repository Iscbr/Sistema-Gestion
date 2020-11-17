import {SalePerMonth} from "./sale-per-month.model";

export class SalePerYear {
  public year: string;
  public numOfSales: number;
  public amount: number;
  public months: SalePerMonth[];
}
