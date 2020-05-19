import { __decorate, __param } from "tslib";
import { Component, Input, HostBinding, ElementRef, Output, KeyValueDiffers, KeyValueDiffer, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck, SkipSelf } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { translateXY } from '../../utils/translate';
let DataTableBodyRowComponent = class DataTableBodyRowComponent {
    constructor(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.treeStatus = 'collapsed';
        this.activate = new EventEmitter();
        this.treeAction = new EventEmitter();
        this._groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        this._element = element.nativeElement;
        this._rowDiffer = differs.find({}).create();
    }
    set columns(val) {
        this._columns = val;
        this.recalculateColumns(val);
        this.buildStylesByGroup();
    }
    get columns() {
        return this._columns;
    }
    set innerWidth(val) {
        if (this._columns) {
            const colByPin = columnsByPin(this._columns);
            this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        }
        this._innerWidth = val;
        this.recalculateColumns();
        this.buildStylesByGroup();
    }
    get innerWidth() {
        return this._innerWidth;
    }
    set offsetX(val) {
        this._offsetX = val;
        this.buildStylesByGroup();
    }
    get offsetX() {
        return this._offsetX;
    }
    get cssClass() {
        let cls = 'datatable-body-row';
        if (this.isSelected) {
            cls += ' active';
        }
        const idx = +(/^((\d+)-)?(\d+)$/.exec(this.rowIndex) || [])[3];
        if (idx % 2 !== 0) {
            cls += ' datatable-row-odd';
        }
        if (idx % 2 === 0) {
            cls += ' datatable-row-even';
        }
        if (this.rowClass) {
            const res = this.rowClass(this.row);
            if (typeof res === 'string') {
                cls += ` ${res}`;
            }
            else if (typeof res === 'object') {
                const keys = Object.keys(res);
                for (const k of keys) {
                    if (res[k] === true) {
                        cls += ` ${k}`;
                    }
                }
            }
        }
        return cls;
    }
    get columnsTotalWidths() {
        return this._columnGroupWidths.total;
    }
    ngDoCheck() {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    }
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    buildStylesByGroup() {
        this._groupStyles.left = this.calcStylesByGroup('left');
        this._groupStyles.center = this.calcStylesByGroup('center');
        this._groupStyles.right = this.calcStylesByGroup('right');
        this.cd.markForCheck();
    }
    calcStylesByGroup(group) {
        const widths = this._columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            const totalDiff = widths.total - bodyWidth;
            const offsetDiff = totalDiff - offsetX;
            const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    onActivate(event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    }
    onKeyDown(event) {
        const keyCode = event.keyCode;
        const isTargetRow = event.target === this._element;
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                rowElement: this._element
            });
        }
    }
    onMouseenter(event) {
        this.activate.emit({
            type: 'mouseenter',
            event,
            row: this.row,
            rowElement: this._element
        });
    }
    recalculateColumns(val = this.columns) {
        this._columns = val;
        const colsByPin = columnsByPin(this._columns);
        this._columnsByPin = columnsByPinArr(this._columns);
        this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    }
    onTreeAction() {
        this.treeAction.emit();
    }
};
DataTableBodyRowComponent.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "columns", null);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "innerWidth", null);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "expanded", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "rowClass", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "row", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "group", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "isSelected", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "rowIndex", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "treeStatus", void 0);
__decorate([
    Input()
], DataTableBodyRowComponent.prototype, "offsetX", null);
__decorate([
    HostBinding('class')
], DataTableBodyRowComponent.prototype, "cssClass", null);
__decorate([
    HostBinding('style.height.px'),
    Input()
], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
__decorate([
    HostBinding('style.width.px')
], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
__decorate([
    Output()
], DataTableBodyRowComponent.prototype, "activate", void 0);
__decorate([
    Output()
], DataTableBodyRowComponent.prototype, "treeAction", void 0);
__decorate([
    HostListener('keydown', ['$event'])
], DataTableBodyRowComponent.prototype, "onKeyDown", null);
__decorate([
    HostListener('mouseenter', ['$event'])
], DataTableBodyRowComponent.prototype, "onMouseenter", null);
DataTableBodyRowComponent = __decorate([
    Component({
        selector: 'datatable-body-row',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div
      *ngFor="let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [ngStyle]="_groupStyles[colGroup.type]"
    >
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [treeStatus]="treeStatus"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
    </div>
  `
    }),
    __param(1, SkipSelf())
], DataTableBodyRowComponent);
export { DataTableBodyRowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sZUFBZSxFQUNmLGNBQWMsRUFDZCxZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBOEJwRCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQXFHcEMsWUFDVSxPQUF3QixFQUNaLGVBQWdDLEVBQzVDLEVBQXFCLEVBQzdCLE9BQW1CO1FBSFgsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF2RXRCLGVBQVUsR0FBZSxXQUFXLENBQUM7UUFtRHBDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRN0QsaUJBQVksR0FBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQVVBLElBQUks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RTs2REFBc0M7QUFHOUM7SUFEQyxLQUFLLEVBQUU7d0RBSVA7QUFNRDtJQURDLFdBQVcsQ0FBQyxPQUFPLENBQUM7eURBNkJwQjtBQUlEO0lBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0lBQzlCLEtBQUssRUFBRTs0REFDVTtBQUdsQjtJQURDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzttRUFHN0I7QUFFUztJQUFULE1BQU0sRUFBRTsyREFBa0Q7QUFDakQ7SUFBVCxNQUFNLEVBQUU7NkRBQW9EO0FBMkU3RDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzswREF1Qm5DO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7NkRBUXRDO0FBaE1VLHlCQUF5QjtJQTVCckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO0tBQ0YsQ0FBQztJQXdHRyxXQUFBLFFBQVEsRUFBRSxDQUFBO0dBdkdGLHlCQUF5QixDQTRNckM7U0E1TVkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRG9DaGVjayxcbiAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRyZWVTdGF0dXMgfSBmcm9tICcuL2JvZHktY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocywgY29sdW1uc0J5UGluQXJyIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sdW1uJztcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5LXJvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXJvdy17eyBjb2xHcm91cC50eXBlIH19IGRhdGF0YWJsZS1yb3ctZ3JvdXBcIlxuICAgICAgW25nU3R5bGVdPVwiX2dyb3VwU3R5bGVzW2NvbEdyb3VwLnR5cGVdXCJcbiAgICA+XG4gICAgICA8ZGF0YXRhYmxlLWJvZHktY2VsbFxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IGxldCBpaSA9IGluZGV4OyB0cmFja0J5OiBjb2x1bW5UcmFja2luZ0ZuXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgW2dyb3VwXT1cImdyb3VwXCJcbiAgICAgICAgW2V4cGFuZGVkXT1cImV4cGFuZGVkXCJcbiAgICAgICAgW2lzU2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFwiXG4gICAgICAgIFtyb3dJbmRleF09XCJyb3dJbmRleFwiXG4gICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIlxuICAgICAgICBbZGlzcGxheUNoZWNrXT1cImRpc3BsYXlDaGVja1wiXG4gICAgICAgIFt0cmVlU3RhdHVzXT1cInRyZWVTdGF0dXNcIlxuICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQsIGlpKVwiXG4gICAgICAgICh0cmVlQWN0aW9uKT1cIm9uVHJlZUFjdGlvbigpXCJcbiAgICAgID5cbiAgICAgIDwvZGF0YXRhYmxlLWJvZHktY2VsbD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKHZhbCk7XG4gICAgdGhpcy5idWlsZFN0eWxlc0J5R3JvdXAoKTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNvbEJ5UGluID0gY29sdW1uc0J5UGluKHRoaXMuX2NvbHVtbnMpO1xuICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xCeVBpbiwgdGhpcy5fY29sdW1ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHZhbDtcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgIHRoaXMuYnVpbGRTdHlsZXNCeUdyb3VwKCk7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xuICB9XG5cbiAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XG4gIEBJbnB1dCgpIHJvdzogYW55O1xuICBASW5wdXQoKSBncm91cDogYW55O1xuICBASW5wdXQoKSBpc1NlbGVjdGVkOiBib29sZWFuO1xuICBASW5wdXQoKSByb3dJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IGFueTtcbiAgQElucHV0KCkgdHJlZVN0YXR1czogVHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXRYKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0WCA9IHZhbDtcbiAgICB0aGlzLmJ1aWxkU3R5bGVzQnlHcm91cCgpO1xuICB9XG4gIGdldCBvZmZzZXRYKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjc3NDbGFzcygpIHtcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LXJvdyc7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xuICAgICAgY2xzICs9ICcgYWN0aXZlJztcbiAgICB9XG4gICAgY29uc3QgaWR4ID0gKygvXigoXFxkKyktKT8oXFxkKykkLy5leGVjKHRoaXMucm93SW5kZXggYXMgYW55KSB8fCBbXSlbM107XG4gICAgaWYgKGlkeCAlIDIgIT09IDApIHtcbiAgICAgIGNscyArPSAnIGRhdGF0YWJsZS1yb3ctb2RkJztcbiAgICB9XG4gICAgaWYgKGlkeCAlIDIgPT09IDApIHtcbiAgICAgIGNscyArPSAnIGRhdGF0YWJsZS1yb3ctZXZlbic7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm93Q2xhc3MpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucm93Q2xhc3ModGhpcy5yb3cpO1xuICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNscyArPSBgICR7cmVzfWA7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNscyArPSBgICR7a31gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbHM7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIEBJbnB1dCgpXG4gIHJvd0hlaWdodDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgY29sdW1uc1RvdGFsV2lkdGhzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzLnRvdGFsO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9lbGVtZW50OiBhbnk7XG4gIF9jb2x1bW5Hcm91cFdpZHRoczogYW55O1xuICBfY29sdW1uc0J5UGluOiBhbnk7XG4gIF9vZmZzZXRYOiBudW1iZXI7XG4gIF9jb2x1bW5zOiBhbnlbXTtcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgX2dyb3VwU3R5bGVzOiB7IFtwcm9wOiBzdHJpbmddOiB7fSB9ID0ge1xuICAgIGxlZnQ6IHt9LFxuICAgIGNlbnRlcjoge30sXG4gICAgcmlnaHQ6IHt9XG4gIH07XG5cbiAgcHJpdmF0ZSBfcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX3Jvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jvd0RpZmZlci5kaWZmKHRoaXMucm93KSkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5R3JvdXBzKGluZGV4OiBudW1iZXIsIGNvbEdyb3VwOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2xHcm91cC50eXBlO1xuICB9XG5cbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xuICB9XG5cbiAgYnVpbGRTdHlsZXNCeUdyb3VwKCkge1xuICAgIHRoaXMuX2dyb3VwU3R5bGVzLmxlZnQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdsZWZ0Jyk7XG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMuY2VudGVyID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnY2VudGVyJyk7XG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMucmlnaHQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdyaWdodCcpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBjYWxjU3R5bGVzQnlHcm91cChncm91cDogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5fY29sdW1uR3JvdXBXaWR0aHM7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0WDtcblxuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgIHdpZHRoOiBgJHt3aWR0aHNbZ3JvdXBdfXB4YFxuICAgIH07XG5cbiAgICBpZiAoZ3JvdXAgPT09ICdsZWZ0Jykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYLCAwKTtcbiAgICB9IGVsc2UgaWYgKGdyb3VwID09PSAncmlnaHQnKSB7XG4gICAgICBjb25zdCBib2R5V2lkdGggPSBwYXJzZUludCh0aGlzLmlubmVyV2lkdGggKyAnJywgMCk7XG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSBib2R5V2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXREaWZmID0gdG90YWxEaWZmIC0gb2Zmc2V0WDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IChvZmZzZXREaWZmICsgdGhpcy5zY3JvbGxiYXJIZWxwZXIud2lkdGgpICogLTE7XG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIG9uQWN0aXZhdGUoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGV2ZW50LmNlbGxJbmRleCA9IGluZGV4O1xuICAgIGV2ZW50LnJvd0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgaXNUYXJnZXRSb3cgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICBjb25zdCBpc0FjdGlvbiA9XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnVwIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XG5cbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRSb3cpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgICAgdHlwZTogJ2tleWRvd24nLFxuICAgICAgICBldmVudCxcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgcm93RWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2VlbnRlcihldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdtb3VzZWVudGVyJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIHJvd0VsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIHJlY2FsY3VsYXRlQ29sdW1ucyh2YWw6IGFueVtdID0gdGhpcy5jb2x1bW5zKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XG4gICAgdGhpcy5fY29sdW1uc0J5UGluID0gY29sdW1uc0J5UGluQXJyKHRoaXMuX2NvbHVtbnMpO1xuICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sc0J5UGluLCB0aGlzLl9jb2x1bW5zKTtcbiAgfVxuXG4gIG9uVHJlZUFjdGlvbigpIHtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCgpO1xuICB9XG59XG4iXX0=