import { NgModule } from '@angular/core';

import { LocalizationPipeModule } from './pipes/localization.pipe';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { LoadingOverlayModule } from './components/loading-overlay/loading-overlay.module';
import { DeleteDialogModule } from './components/delete-dialog/delete-dialog.module';
import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';

@NgModule({
    exports: [
        LocalizationPipeModule,

        DeleteDialogModule,
        FooterModule,
        HeaderModule,
        LoadingOverlayModule,

        AutoFocusDirectiveModule,
    ],
})
export class OpenOwnerToolsModule {
}
