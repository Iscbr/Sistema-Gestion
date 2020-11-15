import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router, RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }


  canLoad(
    route: Route, segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated){
      this.router.navigate(["/", "login"]).then();
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated){
      this.router.navigate(["/", "login"]).then();
    }
    return true;
  }

}
