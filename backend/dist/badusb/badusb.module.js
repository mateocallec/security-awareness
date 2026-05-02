"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadusbModule = void 0;
const common_1 = require("@nestjs/common");
const badusb_controller_1 = require("./badusb.controller");
const badusb_service_1 = require("./badusb.service");
let BadusbModule = class BadusbModule {
};
exports.BadusbModule = BadusbModule;
exports.BadusbModule = BadusbModule = __decorate([
    (0, common_1.Module)({
        controllers: [badusb_controller_1.BadusbController],
        providers: [badusb_service_1.BadusbService],
    })
], BadusbModule);
//# sourceMappingURL=badusb.module.js.map