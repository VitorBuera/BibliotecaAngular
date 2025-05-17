import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor
  (
    private router: Router
  ) { }

    canActivate() {
      var user = JSON.parse(localStorage.getItem('user')!)
      for (let i = 0; i <= user?.length; i++) {
        if (user[i].id > 0) {
          return true
        }
      }

      this.router.navigate([''])
      return false
    }
}
