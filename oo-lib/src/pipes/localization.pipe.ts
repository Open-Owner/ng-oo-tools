import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '../services/localization.service';

@Pipe({
    name: 'l10n',
})
export class LocalizationPipe implements PipeTransform {
    constructor(private localization: LocalizationService) {}

    public transform(key: any): string {
        return this.localization.translate(key);
    }
}

@NgModule({
    exports: [LocalizationPipe],
    declarations: [LocalizationPipe],
})
export class LocalizationPipeModule {}
