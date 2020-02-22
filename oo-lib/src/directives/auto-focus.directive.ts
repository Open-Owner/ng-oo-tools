import { AfterViewInit, Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
    selector: '[ooAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
    constructor(private element: ElementRef) {}

    public ngAfterViewInit(): void {
        this.element.nativeElement.focus();
    }
}

@NgModule({
    exports: [AutoFocusDirective],
    declarations: [AutoFocusDirective],
})
export class AutoFocusDirectiveModule {
}
