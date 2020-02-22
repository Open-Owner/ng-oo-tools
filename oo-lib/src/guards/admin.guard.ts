import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    public canActivate(
        // @ts-ignore
        next: ActivatedRouteSnapshot,
        // @ts-ignore
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.auth.user$.pipe(
            take(1),
            map((user: User) => {
                if (!user || !user.roles.admin) {
                    // noinspection JSIgnoredPromiseFromCall
                    this.router.navigate(['sign-in']);

                    return false;
                }

                return true;
            }),
        );
    }
}
