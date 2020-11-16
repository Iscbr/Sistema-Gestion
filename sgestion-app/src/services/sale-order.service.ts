import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { EndpointService } from "./endpoint.service";

import { SaleOrder } from "../model/sale-order.model";

@Injectable({
  providedIn: "root"
})
export class SaleOrderService extends EndpointService {

  private saleOrderUrl = this.baseUrl + "/SaleOrder"

  public getAllSaleOrders(): Observable<SaleOrder[]> {
    const url = this.saleOrderUrl + "/GetAll"
    return this.http.get<SaleOrder[]>(url, this.resourceHeaders);
  }

  public getById(id: String): Observable<SaleOrder> {
    const url = this.saleOrderUrl + "/Get/" + id;
    return this.http.get<SaleOrder>(url, this.resourceHeaders);
  }

  public save(saleOrder: SaleOrder): Observable<SaleOrder> {
    const url = this.saleOrderUrl + "/save";
    return this.http.post<SaleOrder>(url, saleOrder, this.resourceHeaders);
  }

  public update(id: string, saleOrder: SaleOrder): Observable<any> {
    const url = this.saleOrderUrl + "/update/" + id;
    return this.http.put<any>(url, saleOrder, this.resourceHeaders);
  }

  public disable(id: string): Observable<any> {
    const url = this.saleOrderUrl + "/delete/" + id;
    return this.http.delete<any>(url,this.resourceHeaders);
  }
}
