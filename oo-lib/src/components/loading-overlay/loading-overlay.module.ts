import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        LoadingOverlayComponent,
    ],
    exports: [
        LoadingOverlayComponent,
    ],
})
export class LoadingOverlayModule {}
