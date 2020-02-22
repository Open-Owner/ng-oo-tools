import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { DeleteDialogComponent } from './delete-dialog.component';
import { LocalizationPipeModule } from '../../pipes/localization.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        RouterModule,
        FlexLayoutModule,
        LocalizationPipeModule,
    ],
    declarations: [
        DeleteDialogComponent,
    ],
    exports: [
        DeleteDialogComponent,
    ],
    entryComponents: [
        DeleteDialogComponent,
    ]
})
export class DeleteDialogModule {}
