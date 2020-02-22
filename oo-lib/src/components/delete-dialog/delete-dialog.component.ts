import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DeleteDialogData } from './delete-dialog.interface';

@Component({
    selector: 'oo-delete-dialog',
    templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public deleteDialogData: DeleteDialogData) {}

    public onNoClick(): void {
        this.dialogRef.close(false);
    }

    public onYesClick(): void {
        this.dialogRef.close(true);
    }
}
