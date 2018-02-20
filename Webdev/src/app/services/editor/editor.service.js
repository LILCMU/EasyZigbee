System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1;
    var EditorService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            EditorService = (function () {
                function EditorService() {
                    this._editors = {};
                    this._updatesSubject = new Rx_1.Subject();
                    this._openSubject = new Rx_1.Subject();
                    this.updates = this._updatesSubject.asObservable();
                    this.open = this._openSubject.asObservable();
                }
                EditorService.prototype.save = function (name, editor) {
                    this._editors[name] = editor;
                    this._updatesSubject.next([name, editor]);
                };
                EditorService.prototype.load = function (name) {
                    return this._editors[name];
                };
                EditorService.prototype.remove = function (name) {
                    this._editors[name] = null;
                };
                EditorService.prototype.all = function () {
                    return Object.keys(this._editors);
                };
                EditorService.prototype.fireOpen = function (name) {
                    var editor = this._editors[name];
                    this._openSubject.next([name, editor]);
                };
                EditorService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], EditorService);
                return EditorService;
            }());
            exports_1("EditorService", EditorService);
        }
    }
});
//# sourceMappingURL=editor.service.js.map