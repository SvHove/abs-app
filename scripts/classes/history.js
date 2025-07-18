"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _History_loadedSnippets, _History_backHistory, _History_forwardHistory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.navigationRequest = void 0;
require("../constants");
require("../loading");
const constants_1 = require("../constants");
class navigationRequest {
    constructor(link, type) {
        this.url = link;
        this.type = type;
    }
}
exports.navigationRequest = navigationRequest;
class History {
    constructor() {
        /* TODO:
            Function back()
            Function forward()
            Function is_in_cache()
            Function get_from_cache()
         */
        _History_loadedSnippets.set(this, void 0);
        _History_backHistory.set(this, void 0);
        _History_forwardHistory.set(this, void 0);
        __classPrivateFieldSet(this, _History_loadedSnippets, new Map(), "f");
        __classPrivateFieldSet(this, _History_backHistory, [], "f");
        __classPrivateFieldSet(this, _History_forwardHistory, [], "f");
    }
    getbackHistory() {
        return __classPrivateFieldGet(this, _History_backHistory, "f");
    }
    getLastDiv() {
        const lastRequest = __classPrivateFieldGet(this, _History_backHistory, "f").pop();
        if (!lastRequest)
            return constants_1.emergencyPage;
        __classPrivateFieldGet(this, _History_forwardHistory, "f").push(lastRequest);
        return this.getPrior();
    }
    getNextDiv() {
        const lastElement = __classPrivateFieldGet(this, _History_forwardHistory, "f").pop();
        if (!lastElement) {
            return constants_1.emergencyPage;
        }
        __classPrivateFieldGet(this, _History_backHistory, "f").push(lastElement);
        return this.getCurrentElement();
    }
    getPrior() {
        if (__classPrivateFieldGet(this, _History_backHistory, "f").length < 2) {
            throw new Error("Tried getting prior Element with insufficient backHistory length.");
        }
        const priorElement = __classPrivateFieldGet(this, _History_loadedSnippets, "f").get(__classPrivateFieldGet(this, _History_backHistory, "f")[__classPrivateFieldGet(this, _History_backHistory, "f").length - 2]);
        if (!priorElement)
            return constants_1.emergencyPage;
        return priorElement;
    }
    getCurrentElement() {
        if (__classPrivateFieldGet(this, _History_backHistory, "f").length < 1) {
            throw new Error("Tried getting current element with insufficient backHistory length.");
        }
        const currentElement = __classPrivateFieldGet(this, _History_loadedSnippets, "f").get(__classPrivateFieldGet(this, _History_backHistory, "f")[__classPrivateFieldGet(this, _History_backHistory, "f").length - 1]);
        if (!currentElement)
            return constants_1.emergencyPage;
        return currentElement;
    }
    getCurrentRequest() {
        return __classPrivateFieldGet(this, _History_backHistory, "f")[__classPrivateFieldGet(this, _History_backHistory, "f").length - 1];
    }
    add(request) {
        __classPrivateFieldSet(this, _History_forwardHistory, [], "f");
        if (this.getCurrentRequest() !== request) {
            __classPrivateFieldGet(this, _History_backHistory, "f").push(request);
        }
    }
    addPreload(request, snippet) {
        if (!this.has(request)) {
            __classPrivateFieldGet(this, _History_loadedSnippets, "f").set(request, snippet);
        }
    }
    has(request) {
        return __classPrivateFieldGet(this, _History_loadedSnippets, "f").has(request);
    }
    get(request) {
        if (this.has(request)) {
            const requestedSnippet = __classPrivateFieldGet(this, _History_loadedSnippets, "f").get(request);
            return requestedSnippet ? requestedSnippet : constants_1.emergencyPage;
        }
        else {
            throw new Error(`history.mjs: Unable to find dest: ${request.url} and type: ${request.type}`);
        }
    }
}
exports.History = History;
_History_loadedSnippets = new WeakMap(), _History_backHistory = new WeakMap(), _History_forwardHistory = new WeakMap();
