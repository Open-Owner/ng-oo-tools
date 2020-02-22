import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    public display$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public show(delayed: boolean = false): void {
        if (delayed) {
            // NOTE: Using a setTimeout to avoid an angular error that expression value has changed
            setTimeout(() => {
                this.display$.next(true);
            });

            return;
        }

        this.display$.next(true);
    }

    public hide(delayed: boolean = false): void {
        if (delayed) {
            setTimeout(() => {
                this.display$.next(false);
            });

            return;
        }

        this.display$.next(false);
    }
}
