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
var _Link_href, _Link_type, _Link_title, _Link_navigationRequest, _Link_content, _Link_link, _Link_title_span, _Link_svg;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const history_1 = require("../classes/history");
"use strict";
class Link extends HTMLElement {
    constructor() {
        super();
        _Link_href.set(this, void 0);
        _Link_type.set(this, void 0);
        _Link_title.set(this, void 0);
        _Link_navigationRequest.set(this, void 0);
        _Link_content.set(this, void 0);
        _Link_link.set(this, void 0);
        _Link_title_span.set(this, void 0);
        _Link_svg.set(this, void 0);
        __classPrivateFieldSet(this, _Link_title, this.getAttribute("title"), "f");
        __classPrivateFieldSet(this, _Link_href, this.getAttribute("href"), "f");
        __classPrivateFieldSet(this, _Link_type, this.getAttribute("type"), "f");
        __classPrivateFieldSet(this, _Link_navigationRequest, new history_1.navigationRequest(__classPrivateFieldGet(this, _Link_href, "f"), __classPrivateFieldGet(this, _Link_type, "f")), "f");
        this.classList.add("link");
        __classPrivateFieldSet(this, _Link_link, document.createElement("a"), "f");
        __classPrivateFieldSet(this, _Link_title_span, document.createElement("span"), "f");
        __classPrivateFieldSet(this, _Link_content, document.createElement("div"), "f");
        __classPrivateFieldSet(this, _Link_svg, document.createElementNS("http://www.w3.org/2000/svg", "svg"), "f");
        this.init_link();
        this.add_content_container_classes();
        this.hasClickListener = false;
    }
    getRequest() {
        return __classPrivateFieldGet(this, _Link_navigationRequest, "f");
    }
    add_content_container_classes() {
        __classPrivateFieldGet(this, _Link_content, "f").classList.add("snippet_content");
        __classPrivateFieldGet(this, _Link_content, "f").classList.add("preloaded");
    }
    init_link() {
        __classPrivateFieldGet(this, _Link_title_span, "f").innerHTML = this.title;
        __classPrivateFieldGet(this, _Link_link, "f").appendChild(__classPrivateFieldGet(this, _Link_title_span, "f"));
        __classPrivateFieldGet(this, _Link_link, "f").classList.add('content-button');
        __classPrivateFieldGet(this, _Link_svg, "f").setAttributeNS(null, "viewBox", "0 0 22 22");
        __classPrivateFieldGet(this, _Link_svg, "f").innerHTML = "                <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n" +
            "                <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n" +
            "                <line x1=\"15\" y1=\"16\" x2=\"19\" y2=\"12\"></line>\n" +
            "                <line x1=\"15\" y1=\"8\" x2=\"19\" y2=\"12\"></line>";
        __classPrivateFieldGet(this, _Link_link, "f").appendChild(__classPrivateFieldGet(this, _Link_svg, "f"));
        this.appendChild(__classPrivateFieldGet(this, _Link_link, "f"));
    }
}
exports.Link = Link;
_Link_href = new WeakMap(), _Link_type = new WeakMap(), _Link_title = new WeakMap(), _Link_navigationRequest = new WeakMap(), _Link_content = new WeakMap(), _Link_link = new WeakMap(), _Link_title_span = new WeakMap(), _Link_svg = new WeakMap();
customElements.define("app-link", Link);
