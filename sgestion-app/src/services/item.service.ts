import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { EndpointService } from "./endpoint.service";

import { Item } from "../model/item.model";
import { HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ItemService extends EndpointService {

  private readonly itemServiceUrl = this.baseUrl + "/Item";

  public getAllItems(): Observable<Item[]> {
    const url = this.itemServiceUrl + "/GetAll"
    return this.http.get<Item[]>(url, this.resourceHeaders);
  }

  public getById(id: number): Observable<Item> {
    const url = this.itemServiceUrl + "/Get/" + id;
    return this.http.get<Item>(url, this.resourceHeaders);
  }

  public save(item: Item): Observable<Item> {
    const url = this.itemServiceUrl + "/save";
    return this.http.post<Item>(url, item, this.resourceHeaders);
  }

  public update(id: number, item: Item): Observable<any> {
    const url = this.itemServiceUrl + "/update/" + id;
    return this.http.put<any>(url, item, this.resourceHeaders);
  }

  public delete(id: number): Observable<any> {
    const url = this.itemServiceUrl + "/delete/" + id;
    return this.http.delete<any>(url, this.resourceHeaders);
  }

  public uploadFile(file: File): Observable<any> {
    const url = this.itemServiceUrl + "/upload"
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = this.resourceHeaders.headers.delete("Content-Type");

    const request = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers: headers
    });

    return this.http.request(request);
  }
}
