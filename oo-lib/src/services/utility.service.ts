import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    // noinspection JSMethodCanBeStatic
    public trackByIndex(index: number): number {
        return index;
    }
}
