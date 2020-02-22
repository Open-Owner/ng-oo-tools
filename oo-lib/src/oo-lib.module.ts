import { NgModule } from '@angular/core';

import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';

import { LocalizationPipeModule } from './pipes/localization.pipe';

import {
    DeleteDialogModule,
    FooterModule,
    HeaderModule,
    LoadingOverlayModule,
} from './components';

@NgModule({
    imports: [
        AutoFocusDirectiveModule,
        DeleteDialogModule,
        FooterModule,
        HeaderModule,
        LocalizationPipeModule,
        LoadingOverlayModule,
    ],
    exports: [
        AutoFocusDirectiveModule,
        DeleteDialogModule,
        FooterModule,
        LoadingOverlayModule,
        LocalizationPipeModule,
    ],
})
export class OpenOwnerToolsModule {
}
