import { Component, Input } from '@angular/core';

import { IFooterLink } from './footer.interface';
import {
    LocalizationService,
    UtilityService
} from '../../services/index';

@Component({
    selector: 'oo-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    @Input() public color: 'primary' | 'accent' | 'warn' = 'accent';
    @Input() public links: IFooterLink[] = [
        {
            routerLink: '/terms',
            label: this.localization.translate('termsAndConditions'),
        },
        {
            routerLink: '/privacy',
            label: this.localization.translate('privacyPolicy'),
        }
    ];

    constructor(
        private localization: LocalizationService,
        public util: UtilityService,
    ) {}

}
