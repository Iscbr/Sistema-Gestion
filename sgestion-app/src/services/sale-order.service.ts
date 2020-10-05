import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { SaleOrder } from "../model/sale-order.model";

@Injectable({
  providedIn: "root"
})
export class SaleOrderService {
  private saleOrderUrl = "http://localhost:8080/SaleOrder"

  constructor(
    private httpClient: HttpClient
  ) { }

  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public getAllSaleOrders(): Observable<SaleOrder[]> {
    const url = this.saleOrderUrl + "/GetAll"
    return this.httpClient.get<SaleOrder[]>(url, { headers: this.headers });
  }

  public getById(id: String): Observable<SaleOrder> {
    const url = this.saleOrderUrl + "/Get/" + id;
    return this.httpClient.get<SaleOrder>(url, { headers: this.headers });
  }

  public save(saleOrder: SaleOrder): Observable<SaleOrder> {
    const url = this.saleOrderUrl + "/save";
    return this.httpClient.post<SaleOrder>(url, saleOrder, { headers: this.headers });
  }

  public update(id: string, saleOrder: SaleOrder): Observable<any> {
    const url = this.saleOrderUrl + "/update/" + id;
    return this.httpClient.put<any>(url, saleOrder, { headers: this.headers });
  }

  public disable(id: string): Observable<any> {
    const url = this.saleOrderUrl + "/delete/" + id;
    return this.httpClient.delete<any>(url,{ headers: this.headers });
  }
}
