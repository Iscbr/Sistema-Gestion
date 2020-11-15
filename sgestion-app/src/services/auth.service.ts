import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private readonly oauthTokenUrl = "https://localhost:8443/oauth/token";
  private headers = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + btoa("sgestion-app:"+"Password")
  });

  private _user: User;
  private _token: string;

  constructor(
    private http: HttpClient
  ) {  }

  public get user() {
    if (this._user) {
      return this._user;
    } else {
      const userInSession = sessionStorage.getItem("user");
      if (userInSession) {
        this._user = JSON.parse(userInSession) as User;
        return this._user;
      }
    }
    return null;
  }

  public get token() {
    if (this._token) {
      return this._token;
    } else {
      const tokenInSession = sessionStorage.getItem("token");
      if (tokenInSession) {
        this._token = tokenInSession
        return this._token;
      }
    }
    return null;
  }

  public get isAuthenticated() {
    return sessionStorage.getItem("user") !== null
  }

  public login(email: string, password: string): Observable<any> {
    const params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", email);
    params.set("password", password);
    return this.http.post<any>(this.oauthTokenUrl, params.toString(), { headers: this.headers });
  }

  public logout() {
    this._user = null;
    this._token = null;
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }

  public saveUser(token: string) {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    this._user = new User(
      tokenPayload.name,
      tokenPayload.first_name,
      tokenPayload.second_name,
      tokenPayload.user_name,
      tokenPayload.authorities
    );
    sessionStorage.setItem("user", JSON.stringify(this._user));
  }

  public saveToken(token: string) {
    this._token = token;
    sessionStorage.setItem("token", this._token);
  }
}
