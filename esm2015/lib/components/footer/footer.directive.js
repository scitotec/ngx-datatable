/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';
export class DatatableFooterDirective {
    /**
     * @return {?}
     */
    get template() {
        return this._templateInput || this._templateQuery;
    }
}
DatatableFooterDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-footer' },] }
];
DatatableFooterDirective.propDecorators = {
    footerHeight: [{ type: Input }],
    totalMessage: [{ type: Input }],
    selectedMessage: [{ type: Input }],
    pagerLeftArrowIcon: [{ type: Input }],
    pagerRightArrowIcon: [{ type: Input }],
    pagerPreviousIcon: [{ type: Input }],
    pagerNextIcon: [{ type: Input }],
    _templateInput: [{ type: Input, args: ['template',] }],
    _templateQuery: [{ type: ContentChild, args: [DataTableFooterTemplateDirective, { read: TemplateRef, static: false },] }]
};
if (false) {
    /** @type {?} */
    DatatableFooterDirective.prototype.footerHeight;
    /** @type {?} */
    DatatableFooterDirective.prototype.totalMessage;
    /** @type {?} */
    DatatableFooterDirective.prototype.selectedMessage;
    /** @type {?} */
    DatatableFooterDirective.prototype.pagerLeftArrowIcon;
    /** @type {?} */
    DatatableFooterDirective.prototype.pagerRightArrowIcon;
    /** @type {?} */
    DatatableFooterDirective.prototype.pagerPreviousIcon;
    /** @type {?} */
    DatatableFooterDirective.prototype.pagerNextIcon;
    /** @type {?} */
    DatatableFooterDirective.prototype._templateInput;
    /** @type {?} */
    DatatableFooterDirective.prototype._templateQuery;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQXdCLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRy9FLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFlbkMsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OzJCQUU1QyxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUVMLEtBQUssU0FBQyxVQUFVOzZCQUdoQixZQUFZLFNBQUMsZ0NBQWdDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7SUFYcEYsZ0RBQThCOztJQUM5QixnREFBOEI7O0lBQzlCLG1EQUEyQzs7SUFDM0Msc0RBQW9DOztJQUNwQyx1REFBcUM7O0lBQ3JDLHFEQUFtQzs7SUFDbkMsaURBQStCOztJQUUvQixrREFDaUM7O0lBRWpDLGtEQUNpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUtZm9vdGVyJyB9KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUZvb3RlckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGZvb3RlckhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSB0b3RhbE1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KCkgc2VsZWN0ZWRNZXNzYWdlOiBzdHJpbmcgfCBib29sZWFuO1xuICBASW5wdXQoKSBwYWdlckxlZnRBcnJvd0ljb246IHN0cmluZztcbiAgQElucHV0KCkgcGFnZXJSaWdodEFycm93SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWdlclByZXZpb3VzSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWdlck5leHRJY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KCd0ZW1wbGF0ZScpXG4gIF90ZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGF0YVRhYmxlRm9vdGVyVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogZmFsc2UgfSlcbiAgX3RlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUlucHV0IHx8IHRoaXMuX3RlbXBsYXRlUXVlcnk7XG4gIH1cbn1cbiJdfQ==