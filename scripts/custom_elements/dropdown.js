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
var _Dropdown_content, _Dropdown_button, _Dropdown_title_span, _Dropdown_svg, _Dropdown_svg_vertical_lines;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = void 0;
class Dropdown extends HTMLElement {
    constructor() {
        super();
        _Dropdown_content.set(this, void 0);
        _Dropdown_button.set(this, void 0);
        _Dropdown_title_span.set(this, void 0);
        _Dropdown_svg.set(this, void 0);
        _Dropdown_svg_vertical_lines.set(this, void 0);
        this.innerHTML = '<div class="dropdown_content">' + this.innerHTML + `</div>`;
        __classPrivateFieldSet(this, _Dropdown_button, document.createElement('button'), "f");
        __classPrivateFieldSet(this, _Dropdown_title_span, document.createElement('span'), "f");
        __classPrivateFieldSet(this, _Dropdown_svg, document.createElementNS("http://www.w3.org/2000/svg", "svg"), "f");
        __classPrivateFieldSet(this, _Dropdown_svg_vertical_lines, undefined, "f");
        this.addButton();
        __classPrivateFieldSet(this, _Dropdown_content, __classPrivateFieldGet(this, _Dropdown_button, "f").nextElementSibling, "f");
        this.classList.add('dropdown');
        //this.classList.add('active');
        __classPrivateFieldGet(this, _Dropdown_button, "f").addEventListener('click', (event) => {
            event.preventDefault();
            this.change_state();
            this.close_other_buttons();
            this.rotate_plus();
        });
    }
    connectedCallback() {
        this.adjust_content_box();
    }
    rotate_plus() {
        if (!__classPrivateFieldGet(this, _Dropdown_svg_vertical_lines, "f"))
            return;
        __classPrivateFieldGet(this, _Dropdown_svg_vertical_lines, "f").forEach((element) => {
            if (element.classList.contains('rotate_90')) {
                element.classList.remove('rotate_90');
            }
            else {
                element.classList.add('rotate_90');
            }
        });
    }
    close_other_buttons() {
        const dropdowns = document.querySelectorAll('app-dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(this) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                dropdown.rotate_plus();
            }
        });
    }
    change_state() {
        this.classList.toggle('active');
    }
    adjust_content_box() {
        __classPrivateFieldGet(this, _Dropdown_content, "f").style.marginTop = "-" + __classPrivateFieldGet(this, _Dropdown_button, "f").clientHeight / 2 + "px";
        __classPrivateFieldGet(this, _Dropdown_content, "f").style.paddingTop = __classPrivateFieldGet(this, _Dropdown_button, "f").clientHeight / 2 + "px";
    }
    render() {
        this.adjust_content_box();
    }
    addButton() {
        __classPrivateFieldGet(this, _Dropdown_button, "f").classList.add('content-button');
        const title = this.getAttribute("title");
        if (!title)
            throw new Error("Missing title Attribute");
        __classPrivateFieldGet(this, _Dropdown_title_span, "f").innerHTML = title;
        __classPrivateFieldGet(this, _Dropdown_button, "f").appendChild(__classPrivateFieldGet(this, _Dropdown_title_span, "f"));
        this.append_svg_to_button();
        this.insertBefore(__classPrivateFieldGet(this, _Dropdown_button, "f"), this.firstElementChild);
    }
    append_svg_to_button() {
        __classPrivateFieldGet(this, _Dropdown_svg, "f").setAttributeNS(null, "viewBox", "0 0 22 22");
        __classPrivateFieldGet(this, _Dropdown_svg, "f").innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "  <!-- Vertical stroke group: initially vertical (rotate 0°) -->\n" +
            "  <g  transform=\"translate(24,24) rotate(0)\">\n" +
            "    <!-- A vertical line defined from -10 to +10 along the y-axis -->\n" +
            "    <line class=\"plus_vertical\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"10\" stroke=\"black\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n" +
            "    <line class=\"plus_vertical\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n" +
            "  </g>\n" +
            "  <!-- Horizontal stroke group: defined as a vertical line but pre-rotated by 90° -->\n" +
            "  <g class=\"plus_horizontal\" transform=\"translate(24,24) rotate(90)\">\n" +
            "    <line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"10\" stroke=\"black\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n" +
            "  </g>\n" +
            "</svg>\n";
        __classPrivateFieldSet(this, _Dropdown_svg_vertical_lines, __classPrivateFieldGet(this, _Dropdown_svg, "f").querySelectorAll('.plus_vertical'), "f");
        __classPrivateFieldGet(this, _Dropdown_button, "f").appendChild(__classPrivateFieldGet(this, _Dropdown_svg, "f"));
    }
}
exports.Dropdown = Dropdown;
_Dropdown_content = new WeakMap(), _Dropdown_button = new WeakMap(), _Dropdown_title_span = new WeakMap(), _Dropdown_svg = new WeakMap(), _Dropdown_svg_vertical_lines = new WeakMap();
customElements.define("app-dropdown", Dropdown);
