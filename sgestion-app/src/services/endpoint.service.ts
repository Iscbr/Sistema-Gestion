import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class EndpointService {

  private _resourceHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer " + this.authService.token
  });

  constructor(
    protected http: HttpClient,
    private authService: AuthService
  ) {}

  public get baseUrl() {
    return environment.baseUrl;
  }

  public get resourceHeaders() {
    return { headers: this._resourceHeaders }
  }


}
