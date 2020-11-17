import { SalePerDay } from "./sale-per-day.model";

export class SalePerMonth {
  public month: string;
  public numOfSales: number;
  public amount: number;
  public days: SalePerDay[];
}
