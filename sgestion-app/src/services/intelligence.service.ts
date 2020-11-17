import { Injectable } from "@angular/core";
import { EndpointService } from "./endpoint.service";
import { Observable } from "rxjs";

import { SalePerDay } from "../model/sale-per-day.model";
import { SalePerMonth } from "../model/sale-per-month.model";
import { SalePerYear } from "../model/sale-per-year.model";

@Injectable({
  providedIn: "root"
})
export class IntelligenceService extends EndpointService {

  private readonly intelligenceUrl = this.baseUrl + "/Intelligence";

  public getSalesPerDay(day: string): Observable<SalePerDay> {
    const url = this.intelligenceUrl + "/Sales/Day/" + day;
    return this.http.get<SalePerDay>(url, this.resourceHeaders);
  }

  public getSalesPerMonth(month: string): Observable<SalePerMonth> {
    const url = this.intelligenceUrl + "/Sales/Month/" + month;
    return this.http.get<SalePerMonth>(url, this.resourceHeaders);
  }

  public getSalesPerYear(year: string): Observable<SalePerYear> {
    const url = this.intelligenceUrl + "/Sales/Year/" + year;
    return this.http.get<SalePerYear>(url, this.resourceHeaders);
  }

}
