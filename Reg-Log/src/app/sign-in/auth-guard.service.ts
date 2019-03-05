import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: CommonService,
    private myRoute: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggednIn()) {
      return true;
    } else {
      this.myRoute.navigate(["login"]);
      return false;
    }
  }
}
