"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeyonApp = exports.View = exports.RouteView = exports.Router = exports.Model = exports.Emitter = exports.CollectionView = exports.Collection = void 0;
require("../util/polyfill");
require("../util/template");
const app_1 = __importDefault(require("./app"));
exports.ZeyonApp = app_1.default;
const router_1 = __importDefault(require("./router"));
exports.Router = router_1.default;
const collection_1 = __importDefault(require("./collection"));
exports.Collection = collection_1.default;
const collectionView_1 = __importDefault(require("./collectionView"));
exports.CollectionView = collectionView_1.default;
const emitter_1 = __importDefault(require("./emitter"));
exports.Emitter = emitter_1.default;
const model_1 = __importDefault(require("./model"));
exports.Model = model_1.default;
const routeView_1 = __importDefault(require("./routeView"));
exports.RouteView = routeView_1.default;
const view_1 = __importDefault(require("./view"));
exports.View = view_1.default;
exports.default = {
    create: (options) => new app_1.default(options),
    registerClass(registrationId) {
        return function (constructor) {
            if (constructor.prototype.hasOwnProperty('constructor')) {
                console.warn(`Class ${registrationId} defines its own constructor. This is discouraged. Include an 'initialize' method instead.`);
            }
            constructor.registrationId = registrationId;
            return constructor;
        };
    },
    Collection: collection_1.default,
    CollectionView: collectionView_1.default,
    Emitter: emitter_1.default,
    Model: model_1.default,
    RouteView: routeView_1.default,
    Router: router_1.default,
    View: view_1.default,
};
//# sourceMappingURL=_index.js.map