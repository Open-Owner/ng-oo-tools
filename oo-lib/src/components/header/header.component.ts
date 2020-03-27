import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';
import { LocalizationService } from '../../services/index';

@Component({
    selector: 'oo-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() public logo: string;
    @Input() public color: 'primary' | 'accent' | 'warn' = 'primary';

    @ViewChild('sideNav', { static: true }) public sideNav: MatSidenav;

    constructor(
        public auth: AuthService,
        public router: Router,
        private snackBar: MatSnackBar,
        public util: UtilityService,
        private localization: LocalizationService,
    ) {}

    public signOut(): void {
        this.auth
            .signOut()
            .then(() => {
                this.router.navigateByUrl('/');
            })
            .catch(() => {
                this.snackBar.open(`⚠ ${this.localization.translate('problemSigningOut')}`, '', { duration: 3000 });
            });
    }

    public closeBackdrop(): void {
        this.sideNav.close();
    }
}
