// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Components imports
import { TabComponent } from './components';
// Containers imports
import { TabsContainer } from './containers';
var TabModule = /** @class */ (function () {
    function TabModule() {
    }
    TabModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [
                        TabComponent,
                        TabsContainer
                    ],
                    exports: [
                        TabComponent,
                        TabsContainer
                    ]
                },] },
    ];
    /** @nocollapse */
    TabModule.ctorParameters = function () { return []; };
    return TabModule;
}());
export { TabModule };
//# sourceMappingURL=angular-tabs-component.module.js.map