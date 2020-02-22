import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        RouterModule,
        FlexLayoutModule,
    ],
    declarations: [
        FooterComponent,
    ],
    exports: [
        FooterComponent,
    ],
})
export class FooterModule {}
