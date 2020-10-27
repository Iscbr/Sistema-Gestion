import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Item } from "../model/item.model";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private readonly itemServiceUrl = "https://localhost:8443/Item";

  constructor(
    private httpClient: HttpClient
  ) {}

  private headers = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public getAllItems(): Observable<Item[]> {
    const url = this.itemServiceUrl + "/GetAll"
    return this.httpClient.get<Item[]>(url, { headers: this.headers });
  }

  public getById(id: String): Observable<Item> {
    const url = this.itemServiceUrl + "/Get/" + id;
    return this.httpClient.get<Item>(url, { headers: this.headers });
  }

  public save(item: Item): Observable<Item> {
    const url = this.itemServiceUrl + "/save";
    return this.httpClient.post<Item>(url, item, { headers: this.headers });
  }

  public update(id: string, item: Item): Observable<any> {
    const url = this.itemServiceUrl + "/update/" + id;
    return this.httpClient.put<any>(url, item, { headers: this.headers });
  }

  public disable(id: string): Observable<any> {
    const url = this.itemServiceUrl + "/delete/" + id;
    return this.httpClient.delete<any>(url,{ headers: this.headers });
  }

  public uploadFile(file: File): Observable<any> {
    const url = this.itemServiceUrl + "/upload"
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(url, formData);
  }
}
