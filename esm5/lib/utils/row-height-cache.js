/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var /**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
RowHeightCache = /** @class */ (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this.treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    /**
     * Clear the Tree array.
     * @return {?}
     */
    RowHeightCache.prototype.clearCache = /**
     * Clear the Tree array.
     * @return {?}
     */
    function () {
        this.treeArray = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param {?} details
     * @return {?}
     */
    RowHeightCache.prototype.initCache = /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param {?} details
     * @return {?}
     */
    function (details) {
        var rows = details.rows, rowHeight = details.rowHeight, detailRowHeight = details.detailRowHeight, externalVirtual = details.externalVirtual, rowCount = details.rowCount, rowIndexes = details.rowIndexes, rowExpansions = details.rowExpansions;
        /** @type {?} */
        var isFn = typeof rowHeight === 'function';
        /** @type {?} */
        var isDetailFn = typeof detailRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(detailRowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number or function value: (" + detailRowHeight + ") when 'scrollbarV' is enabled.");
        }
        /** @type {?} */
        var n = externalVirtual ? rowCount : rows.length;
        this.treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            /** @type {?} */
            var row = rows[i];
            /** @type {?} */
            var currentRowHeight = rowHeight;
            if (isFn) {
                currentRowHeight = rowHeight(row);
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            /** @type {?} */
            var expanded = rowExpansions.get(row);
            if (row && expanded === 1) {
                if (isDetailFn) {
                    /** @type {?} */
                    var index = rowIndexes.get(row);
                    currentRowHeight += detailRowHeight(row, index);
                }
                else {
                    currentRowHeight += detailRowHeight;
                }
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     * @param {?} scrollY
     * @return {?}
     */
    RowHeightCache.prototype.getRowIndex = /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     * @param {?} scrollY
     * @return {?}
     */
    function (scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     */
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     * @param {?} atRowIndex
     * @param {?} byRowHeight
     * @return {?}
     */
    RowHeightCache.prototype.update = /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     * @param {?} atRowIndex
     * @param {?} byRowHeight
     * @return {?}
     */
    function (atRowIndex, byRowHeight) {
        if (!this.treeArray.length) {
            throw new Error("Update at index " + atRowIndex + " with value " + byRowHeight + " failed:\n        Row Height cache not initialized.");
        }
        /** @type {?} */
        var n = this.treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this.treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= atRowIndex + 1;
        }
    };
    /**
     * Range Sum query from 1 to the rowIndex
     */
    /**
     * Range Sum query from 1 to the rowIndex
     * @param {?} atIndex
     * @return {?}
     */
    RowHeightCache.prototype.query = /**
     * Range Sum query from 1 to the rowIndex
     * @param {?} atIndex
     * @return {?}
     */
    function (atIndex) {
        if (!this.treeArray.length) {
            throw new Error("query at index " + atIndex + " failed: Fenwick tree array not initialized.");
        }
        /** @type {?} */
        var sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this.treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    };
    /**
     * Find the total height between 2 row indexes
     */
    /**
     * Find the total height between 2 row indexes
     * @param {?} atIndexA
     * @param {?} atIndexB
     * @return {?}
     */
    RowHeightCache.prototype.queryBetween = /**
     * Find the total height between 2 row indexes
     * @param {?} atIndexA
     * @param {?} atIndexB
     * @return {?}
     */
    function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     */
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     * @private
     * @param {?} sum
     * @return {?}
     */
    RowHeightCache.prototype.calcRowIndex = /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     * @private
     * @param {?} sum
     * @return {?}
     */
    function (sum) {
        if (!this.treeArray.length)
            return 0;
        /** @type {?} */
        var pos = -1;
        /** @type {?} */
        var dataLength = this.treeArray.length;
        // Get the highest bit for the block size.
        /** @type {?} */
        var highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (var blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            /** @type {?} */
            var nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
                sum -= this.treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    };
    return RowHeightCache;
}());
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
export { RowHeightCache };
if (false) {
    /**
     * Tree Array stores the cumulative information of the row heights to perform efficient
     * range queries and updates.  Currently the tree is initialized to the base row
     * height instead of the detail row height.
     * @type {?}
     * @private
     */
    RowHeightCache.prototype.treeArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhlaWdodC1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3Jvdy1oZWlnaHQtY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0lBQUE7Ozs7OztRQU1VLGNBQVMsR0FBYSxFQUFFLENBQUM7SUEySW5DLENBQUM7SUF6SUM7O09BRUc7Ozs7O0lBQ0gsbUNBQVU7Ozs7SUFBVjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7SUFDSCxrQ0FBUzs7Ozs7O0lBQVQsVUFBVSxPQUFZO1FBQ1osSUFBQSxtQkFBSSxFQUFFLDZCQUFTLEVBQUUseUNBQWUsRUFBRSx5Q0FBZSxFQUFFLDJCQUFRLEVBQUUsK0JBQVUsRUFBRSxxQ0FBYTs7WUFDeEYsSUFBSSxHQUFHLE9BQU8sU0FBUyxLQUFLLFVBQVU7O1lBQ3RDLFVBQVUsR0FBRyxPQUFPLGVBQWUsS0FBSyxVQUFVO1FBRXhELElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkhBQ3FCLFNBQVMsb0NBQWlDLENBQUMsQ0FBQztTQUNsRjtRQUVELHNGQUFzRjtRQUN0RixJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLGlJQUNxQixlQUFlLG9DQUFpQyxDQUFDLENBQUM7U0FDeEY7O1lBRUssQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlCLEtBQUssSUFBSSxDQUFD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LElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUVqQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztZQUNOLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07OztZQUdsQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWpFLEtBQUssSUFBSSxTQUFTLEdBQUcsVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRTs7Z0JBQzNELE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUztZQUMvQixJQUFJLE9BQU8sR0FBRyxVQUFVLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFELEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQixHQUFHLEdBQUcsT0FBTyxDQUFDO2FBQ2Y7U0FDRjtRQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBakpELElBaUpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBM0lDLG1DQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGNhY2hlIG9mIHRoZSB2YXJpb3VzIHJvdyBoZWlnaHRzIHRoYXQgYXJlIHByZXNlbnQgaW5zaWRlXG4gKiB0aGUgZGF0YSB0YWJsZS4gICBJdHMgYmFzZWQgb24gRmVud2ljayB0cmVlIGRhdGEgc3RydWN0dXJlIHRoYXQgaGVscHMgd2l0aFxuICogcXVlcnlpbmcgc3VtcyB0aGF0IGhhdmUgdGltZSBjb21wbGV4aXR5IG9mIGxvZyBuLlxuICpcbiAqIEZlbndpY2sgVHJlZSBDcmVkaXRzOiBodHRwOi8vcGV0ci1taXRyaWNoZXYuYmxvZ3Nwb3QuY29tLzIwMTMvMDUvZmVud2ljay10cmVlLXJhbmdlLXVwZGF0ZXMuaHRtbFxuICogaHR0cHM6Ly9naXRodWIuY29tL21pa29sYWx5c2Vua28vZmVud2ljay10cmVlXG4gKlxuICovXG5leHBvcnQgY2xhc3MgUm93SGVpZ2h0Q2FjaGUge1xuICAvKipcbiAgICogVHJlZSBBcnJheSBzdG9yZXMgdGhlIGN1bXVsYXRpdmUgaW5mb3JtYXRpb24gb2YgdGhlIHJvdyBoZWlnaHRzIHRvIHBlcmZvcm0gZWZmaWNpZW50XG4gICAqIHJhbmdlIHF1ZXJpZXMgYW5kIHVwZGF0ZXMuICBDdXJyZW50bHkgdGhlIHRyZWUgaXMgaW5pdGlhbGl6ZWQgdG8gdGhlIGJhc2Ugcm93XG4gICAqIGhlaWdodCBpbnN0ZWFkIG9mIHRoZSBkZXRhaWwgcm93IGhlaWdodC5cbiAgICovXG4gIHByaXZhdGUgdHJlZUFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgVHJlZSBhcnJheS5cbiAgICovXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7XG4gICAgdGhpcy50cmVlQXJyYXkgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGZW53aWNrIHRyZWUgd2l0aCByb3cgSGVpZ2h0cy5cbiAgICpcbiAgICogQHBhcmFtIHJvd3MgVGhlIGFycmF5IG9mIHJvd3Mgd2hpY2ggY29udGFpbiB0aGUgZXhwYW5kZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0gcm93SGVpZ2h0IFRoZSByb3cgaGVpZ2h0LlxuICAgKiBAcGFyYW0gZGV0YWlsUm93SGVpZ2h0IFRoZSBkZXRhaWwgcm93IGhlaWdodC5cbiAgICovXG4gIGluaXRDYWNoZShkZXRhaWxzOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB7IHJvd3MsIHJvd0hlaWdodCwgZGV0YWlsUm93SGVpZ2h0LCBleHRlcm5hbFZpcnR1YWwsIHJvd0NvdW50LCByb3dJbmRleGVzLCByb3dFeHBhbnNpb25zIH0gPSBkZXRhaWxzO1xuICAgIGNvbnN0IGlzRm4gPSB0eXBlb2Ygcm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGlzRGV0YWlsRm4gPSB0eXBlb2YgZGV0YWlsUm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nO1xuXG4gICAgaWYgKCFpc0ZuICYmIGlzTmFOKHJvd0hlaWdodCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUm93IEhlaWdodCBjYWNoZSBpbml0aWFsaXphdGlvbiBmYWlsZWQuIFBsZWFzZSBlbnN1cmUgdGhhdCAncm93SGVpZ2h0JyBpcyBhXG4gICAgICAgIHZhbGlkIG51bWJlciBvciBmdW5jdGlvbiB2YWx1ZTogKCR7cm93SGVpZ2h0fSkgd2hlbiAnc2Nyb2xsYmFyVicgaXMgZW5hYmxlZC5gKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhpcyBhZGRpdGlvbmFsIGd1YXJkIGluIGNhc2UgZGV0YWlsUm93SGVpZ2h0IGlzIHNldCB0byAnYXV0bycgYXMgaXQgd29udCB3b3JrLlxuICAgIGlmICghaXNEZXRhaWxGbiAmJiBpc05hTihkZXRhaWxSb3dIZWlnaHQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJvdyBIZWlnaHQgY2FjaGUgaW5pdGlhbGl6YXRpb24gZmFpbGVkLiBQbGVhc2UgZW5zdXJlIHRoYXQgJ2RldGFpbFJvd0hlaWdodCcgaXMgYVxuICAgICAgICB2YWxpZCBudW1iZXIgb3IgZnVuY3Rpb24gdmFsdWU6ICgke2RldGFpbFJvd0hlaWdodH0pIHdoZW4gJ3Njcm9sbGJhclYnIGlzIGVuYWJsZWQuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgbiA9IGV4dGVybmFsVmlydHVhbCA/IHJvd0NvdW50IDogcm93cy5sZW5ndGg7XG4gICAgdGhpcy50cmVlQXJyYXkgPSBuZXcgQXJyYXkobik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgdGhpcy50cmVlQXJyYXlbaV0gPSAwO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCByb3cgPSByb3dzW2ldO1xuICAgICAgbGV0IGN1cnJlbnRSb3dIZWlnaHQgPSByb3dIZWlnaHQ7XG4gICAgICBpZiAoaXNGbikge1xuICAgICAgICBjdXJyZW50Um93SGVpZ2h0ID0gcm93SGVpZ2h0KHJvdyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0aGUgZGV0YWlsIHJvdyBoZWlnaHQgdG8gdGhlIGFscmVhZHkgZXhwYW5kZWQgcm93cy5cbiAgICAgIC8vIFRoaXMgaXMgdXNlZnVsIGZvciB0aGUgdGFibGUgdGhhdCBnb2VzIHRocm91Z2ggYSBmaWx0ZXIgb3Igc29ydC5cbiAgICAgIGNvbnN0IGV4cGFuZGVkID0gcm93RXhwYW5zaW9ucy5nZXQocm93KTtcbiAgICAgIGlmIChyb3cgJiYgZXhwYW5kZWQgPT09IDEpIHtcbiAgICAgICAgaWYgKGlzRGV0YWlsRm4pIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHJvd0luZGV4ZXMuZ2V0KHJvdyk7XG4gICAgICAgICAgY3VycmVudFJvd0hlaWdodCArPSBkZXRhaWxSb3dIZWlnaHQocm93LCBpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudFJvd0hlaWdodCArPSBkZXRhaWxSb3dIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGUoaSwgY3VycmVudFJvd0hlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIHRoZSBTY3JvbGxZIHBvc2l0aW9uIGkuZS4gc3VtLCBwcm92aWRlIHRoZSByb3dJbmRleFxuICAgKiB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIGN1cnJlbnQgdmlldyBwb3J0LiAgQmVsb3cgaGFuZGxlcyBlZGdlIGNhc2VzLlxuICAgKi9cbiAgZ2V0Um93SW5kZXgoc2Nyb2xsWTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoc2Nyb2xsWSA9PT0gMCkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHRoaXMuY2FsY1Jvd0luZGV4KHNjcm9sbFkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gYSByb3cgaXMgZXhwYW5kZWQgb3Igcm93SGVpZ2h0IGlzIGNoYW5nZWQsIHVwZGF0ZSB0aGUgaGVpZ2h0LiAgVGhpcyBjYW5cbiAgICogYmUgdXRpbGl6ZWQgaW4gZnV0dXJlIHdoZW4gQW5ndWxhciBEYXRhIHRhYmxlIHN1cHBvcnRzIGR5bmFtaWMgcm93IGhlaWdodHMuXG4gICAqL1xuICB1cGRhdGUoYXRSb3dJbmRleDogbnVtYmVyLCBieVJvd0hlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRyZWVBcnJheS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVXBkYXRlIGF0IGluZGV4ICR7YXRSb3dJbmRleH0gd2l0aCB2YWx1ZSAke2J5Um93SGVpZ2h0fSBmYWlsZWQ6XG4gICAgICAgIFJvdyBIZWlnaHQgY2FjaGUgbm90IGluaXRpYWxpemVkLmApO1xuICAgIH1cblxuICAgIGNvbnN0IG4gPSB0aGlzLnRyZWVBcnJheS5sZW5ndGg7XG4gICAgYXRSb3dJbmRleCB8PSAwO1xuXG4gICAgd2hpbGUgKGF0Um93SW5kZXggPCBuKSB7XG4gICAgICB0aGlzLnRyZWVBcnJheVthdFJvd0luZGV4XSArPSBieVJvd0hlaWdodDtcbiAgICAgIGF0Um93SW5kZXggfD0gYXRSb3dJbmRleCArIDE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJhbmdlIFN1bSBxdWVyeSBmcm9tIDEgdG8gdGhlIHJvd0luZGV4XG4gICAqL1xuICBxdWVyeShhdEluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy50cmVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHF1ZXJ5IGF0IGluZGV4ICR7YXRJbmRleH0gZmFpbGVkOiBGZW53aWNrIHRyZWUgYXJyYXkgbm90IGluaXRpYWxpemVkLmApO1xuICAgIH1cblxuICAgIGxldCBzdW0gPSAwO1xuICAgIGF0SW5kZXggfD0gMDtcblxuICAgIHdoaWxlIChhdEluZGV4ID49IDApIHtcbiAgICAgIHN1bSArPSB0aGlzLnRyZWVBcnJheVthdEluZGV4XTtcbiAgICAgIGF0SW5kZXggPSAoYXRJbmRleCAmIChhdEluZGV4ICsgMSkpIC0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VtO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIHRvdGFsIGhlaWdodCBiZXR3ZWVuIDIgcm93IGluZGV4ZXNcbiAgICovXG4gIHF1ZXJ5QmV0d2VlbihhdEluZGV4QTogbnVtYmVyLCBhdEluZGV4QjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeShhdEluZGV4QikgLSB0aGlzLnF1ZXJ5KGF0SW5kZXhBIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gdGhlIFNjcm9sbFkgcG9zaXRpb24gaS5lLiBzdW0sIHByb3ZpZGUgdGhlIHJvd0luZGV4XG4gICAqIHRoYXQgaXMgcHJlc2VudCBpbiB0aGUgY3VycmVudCB2aWV3IHBvcnQuXG4gICAqL1xuICBwcml2YXRlIGNhbGNSb3dJbmRleChzdW06IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnRyZWVBcnJheS5sZW5ndGgpIHJldHVybiAwO1xuXG4gICAgbGV0IHBvcyA9IC0xO1xuICAgIGNvbnN0IGRhdGFMZW5ndGggPSB0aGlzLnRyZWVBcnJheS5sZW5ndGg7XG5cbiAgICAvLyBHZXQgdGhlIGhpZ2hlc3QgYml0IGZvciB0aGUgYmxvY2sgc2l6ZS5cbiAgICBjb25zdCBoaWdoZXN0Qml0ID0gTWF0aC5wb3coMiwgZGF0YUxlbmd0aC50b1N0cmluZygyKS5sZW5ndGggLSAxKTtcblxuICAgIGZvciAobGV0IGJsb2NrU2l6ZSA9IGhpZ2hlc3RCaXQ7IGJsb2NrU2l6ZSAhPT0gMDsgYmxvY2tTaXplID4+PSAxKSB7XG4gICAgICBjb25zdCBuZXh0UG9zID0gcG9zICsgYmxvY2tTaXplO1xuICAgICAgaWYgKG5leHRQb3MgPCBkYXRhTGVuZ3RoICYmIHN1bSA+PSB0aGlzLnRyZWVBcnJheVtuZXh0UG9zXSkge1xuICAgICAgICBzdW0gLT0gdGhpcy50cmVlQXJyYXlbbmV4dFBvc107XG4gICAgICAgIHBvcyA9IG5leHRQb3M7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvcyArIDE7XG4gIH1cbn1cbiJdfQ==