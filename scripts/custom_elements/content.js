"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _Content_preLoadReady, _Content_activeChild, _Content_preLoadedElements, _Content_oldElement, _Content_history;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const history_ts_1 = require("../classes/history.ts");
const loading_ts_1 = require("../loading.ts");
const constants_ts_1 = require("../constants.ts");
/*TODO:
    Design "connected elements": All elements which need to be preloaded for animations.
    Function "replace": Needs to replace, unload preloaded elements.
    Field "active_element".
    Function to preload links from active element.
 */
class Content extends HTMLElement {
    constructor() {
        super();
        _Content_preLoadReady.set(this, void 0);
        _Content_activeChild.set(this, void 0);
        _Content_preLoadedElements.set(this, void 0);
        _Content_oldElement.set(this, void 0);
        _Content_history.set(this, void 0);
        __classPrivateFieldSet(this, _Content_history, new history_ts_1.History(), "f");
        __classPrivateFieldSet(this, _Content_activeChild, this.firstElementChild, "f");
        __classPrivateFieldSet(this, _Content_preLoadedElements, [], "f");
        __classPrivateFieldSet(this, _Content_preLoadReady, false, "f");
        __classPrivateFieldSet(this, _Content_oldElement, undefined, "f");
    }
    setStartElement(request, element) {
        return __awaiter(this, void 0, void 0, function* () {
            this.replaceChild(element, __classPrivateFieldGet(this, _Content_activeChild, "f"));
            (0, loading_ts_1.hideLoader)();
            yield this.preloadElementsFrom(element);
            __classPrivateFieldSet(this, _Content_activeChild, element, "f");
            __classPrivateFieldGet(this, _Content_history, "f").addPreload(request, element);
            __classPrivateFieldGet(this, _Content_history, "f").add(request);
        });
    }
    preloadElementsFrom(element) {
        return __awaiter(this, void 0, void 0, function* () {
            this.preLoadPending();
            const linkElements = element.querySelectorAll(`app-link`);
            for (let link of linkElements) {
                const request = link.getRequest();
                let preLoadedElement;
                if (__classPrivateFieldGet(this, _Content_history, "f").has(request)) {
                    preLoadedElement = __classPrivateFieldGet(this, _Content_history, "f").get(request);
                }
                else {
                    preLoadedElement = yield (0, loading_ts_1.loadSnippet)(request);
                    __classPrivateFieldGet(this, _Content_history, "f").addPreload(request, preLoadedElement);
                }
                preLoadedElement.classList.add("hide-right");
                __classPrivateFieldGet(this, _Content_preLoadedElements, "f").push(preLoadedElement);
                if (!link.hasClickListener) {
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        if (!this.preLoadReady) {
                            (0, loading_ts_1.showLoader)();
                            while (!__classPrivateFieldGet(this, _Content_preLoadReady, "f")) {
                            }
                            (0, loading_ts_1.hideLoader)();
                        }
                        this.switchActiveElementTo(preLoadedElement);
                        __classPrivateFieldGet(this, _Content_history, "f").add(request);
                    });
                    link.hasClickListener = true;
                }
                this.appendChild(preLoadedElement);
            }
            this.preLoadReady();
        });
    }
    home() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Content_history, "f").getCurrentRequest() !== constants_ts_1.home_request) {
                const home = yield (0, loading_ts_1.loadSnippet)(constants_ts_1.home_request);
                home.classList.add("hide-right");
                this.appendChild(home);
                yield this.switchActiveElementTo(home);
                __classPrivateFieldGet(this, _Content_history, "f").add(constants_ts_1.home_request);
            }
            else {
                console.error(`Already at home, ignoring request.`);
            }
        });
    }
    switchActiveElementTo(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Content_oldElement, "f")) {
                this.removeChild(__classPrivateFieldGet(this, _Content_oldElement, "f"));
            }
            __classPrivateFieldGet(this, _Content_activeChild, "f").classList.add("hide-left");
            element.classList.remove("hide-right");
            __classPrivateFieldSet(this, _Content_oldElement, __classPrivateFieldGet(this, _Content_activeChild, "f"), "f");
            __classPrivateFieldSet(this, _Content_activeChild, element, "f");
            yield this.preloadElementsFrom(element);
        });
    }
    preLoadPending() {
        __classPrivateFieldGet(this, _Content_preLoadedElements, "f").forEach((element) => {
            if (!(element === __classPrivateFieldGet(this, _Content_activeChild, "f"))) {
                this.removeChild(element);
            }
        });
        __classPrivateFieldSet(this, _Content_preLoadedElements, [], "f");
        __classPrivateFieldSet(this, _Content_preLoadReady, false, "f");
    }
    preLoadReady() {
        __classPrivateFieldSet(this, _Content_preLoadReady, true, "f");
    }
    back() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Content_oldElement, "f")) {
                console.error("No prior element. Staying on home.");
                return;
            }
            __classPrivateFieldGet(this, _Content_activeChild, "f").classList.add("hide-right");
            __classPrivateFieldGet(this, _Content_oldElement, "f").classList.remove("hide-left");
            __classPrivateFieldSet(this, _Content_activeChild, __classPrivateFieldGet(this, _Content_oldElement, "f"), "f");
            __classPrivateFieldSet(this, _Content_oldElement, __classPrivateFieldGet(this, _Content_history, "f").getLastDiv(), "f");
            if (__classPrivateFieldGet(this, _Content_oldElement, "f")) {
                __classPrivateFieldGet(this, _Content_oldElement, "f").classList.add("hide-left");
                this.appendChild(__classPrivateFieldGet(this, _Content_oldElement, "f"));
            }
            yield this.preloadElementsFrom(__classPrivateFieldGet(this, _Content_activeChild, "f"));
        });
    }
}
exports.Content = Content;
_Content_preLoadReady = new WeakMap(), _Content_activeChild = new WeakMap(), _Content_preLoadedElements = new WeakMap(), _Content_oldElement = new WeakMap(), _Content_history = new WeakMap();
customElements.define("app-content", Content);
