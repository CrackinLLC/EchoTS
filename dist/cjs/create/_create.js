"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeyonApp = void 0;
require("../_maps");
require("../util/polyfill");
require("../util/template");
const app_1 = __importDefault(require("../app"));
exports.ZeyonApp = app_1.default;
exports.default = {
    create: (options) => new app_1.default(options),
    defineRoutes(routes) {
        return routes;
    },
};
//# sourceMappingURL=_create.js.map