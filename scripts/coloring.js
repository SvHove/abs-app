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
var _ColorSet_base_color, _ColorSet_color_primary, _ColorSet_color_primary_gradient, _ColorSet_color_border, _ColorSet_color_button_fill, _ColorSet_color_background, _ColorSet_color_background_2, _ColorSet_color_text, _ColorSet_hue_button, _ColorSet_color_button_start, _ColorSet_color_button_end, _ColorSet_color_h1_gradient_start, _ColorSet_color_h1_gradient_end;
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate_randomizer = activate_randomizer;
class ColorSet {
    constructor(name, color_base) {
        _ColorSet_base_color.set(this, void 0);
        _ColorSet_color_primary.set(this, void 0);
        _ColorSet_color_primary_gradient.set(this, void 0);
        _ColorSet_color_border.set(this, void 0);
        _ColorSet_color_button_fill.set(this, void 0);
        _ColorSet_color_background.set(this, void 0);
        _ColorSet_color_background_2.set(this, void 0);
        _ColorSet_color_text.set(this, void 0);
        _ColorSet_hue_button.set(this, void 0);
        _ColorSet_color_button_start.set(this, void 0);
        _ColorSet_color_button_end.set(this, void 0);
        _ColorSet_color_h1_gradient_start.set(this, void 0);
        _ColorSet_color_h1_gradient_end.set(this, void 0);
        __classPrivateFieldSet(this, _ColorSet_base_color, color_base, "f");
        this.name = name;
        __classPrivateFieldSet(this, _ColorSet_color_primary, color_base, "f");
        __classPrivateFieldSet(this, _ColorSet_color_primary_gradient, this.get_gradient_color(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_border, this.get_border_color(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_button_fill, this.get_button_fill_color(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_background, this.get_background_color_color(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_background_2, this.get_background_color_2(), "f");
        __classPrivateFieldSet(this, _ColorSet_color_text, this.get_text_color(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_hue_button, (color_base.hue - 30), "f");
        __classPrivateFieldSet(this, _ColorSet_color_button_start, this.get_color_button_start(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_button_end, this.get_color_button_end(color_base), "f");
        __classPrivateFieldSet(this, _ColorSet_color_h1_gradient_start, this.get_color_h1_gradient_start(), "f");
        __classPrivateFieldSet(this, _ColorSet_color_h1_gradient_end, this.get_color_h1_gradient_end(), "f");
    }
    get color_primary() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_primary, "f"));
    }
    get color_primary_gradient() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_primary_gradient, "f"));
    }
    get color_border() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_border, "f"));
    }
    get color_button_fill() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_button_fill, "f"));
    }
    get color_background() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_background, "f"));
    }
    get color_background_2() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_background_2, "f"));
    }
    get color_text() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_text, "f"));
    }
    get color_button_start() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_button_start, "f"));
    }
    get hue_button() {
        return __classPrivateFieldGet(this, _ColorSet_hue_button, "f") + "deg";
    }
    get color_button_end() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_button_end, "f"));
    }
    get color_h1_gradient_start() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_h1_gradient_start, "f"));
    }
    get color_h1_gradient_end() {
        return this.convert_color_array_to_hsl(__classPrivateFieldGet(this, _ColorSet_color_h1_gradient_end, "f"));
    }
    get_background_color_2() {
        return this.adjust_lightness_limited(__classPrivateFieldGet(this, _ColorSet_base_color, "f"), 59);
    }
    get_color_h1_gradient_start() {
        let newColor = copy_color(__classPrivateFieldGet(this, _ColorSet_base_color, "f"));
        newColor = this.adjust_hue(newColor, 10);
        newColor = this.adjust_lightness_limited(newColor, 58);
        return newColor;
    }
    get_color_h1_gradient_end() {
        let newColor = copy_color(__classPrivateFieldGet(this, _ColorSet_base_color, "f"));
        newColor = this.adjust_hue(newColor, 40);
        newColor = this.adjust_lightness_limited(newColor, 55);
        return newColor;
    }
    get_color_button_end(color) {
        let newColor = copy_color(color);
        newColor = this.adjust_hue(newColor, 30);
        newColor.sat = 60;
        newColor.lgt = 85;
        return newColor;
    }
    get_color_button_start(color) {
        let newColor = copy_color(color);
        newColor = this.adjust_hue(newColor, -30);
        newColor.sat = 50;
        newColor.lgt = 90;
        return newColor;
    }
    get_text_color(color) {
        return this.adjust_lightness_with_overspill(color, 70);
    }
    get_background_color_color(color) {
        return this.adjust_lightness_limited(color, 60);
    }
    get_gradient_color(color) {
        let newColor = copy_color(color);
        newColor = this.adjust_hue(newColor, 50);
        newColor = this.adjust_lightness_limited(newColor, 20);
        return newColor;
    }
    get_border_color(color) {
        return this.adjust_lightness_limited(color, 25);
    }
    get_button_fill_color(color) {
        return this.adjust_lightness_with_overspill(color, 60);
    }
    convert_color_array_to_hsl(color) {
        return `hsl(${color.hue}deg, ${color.sat}%, ${color.lgt}%))`;
    }
    adjust_hue(color, adjust_value) {
        let newColor = copy_color(color);
        let hue = newColor.hue + adjust_value;
        if (hue > 360) {
            hue -= 360;
        }
        else if (hue < 0) {
            hue += 360;
        }
        newColor.hue = hue;
        return newColor;
    }
    adjust_lightness_with_overspill(color, adjust_value) {
        let newColor = copy_color(color);
        let lgt = color.lgt + adjust_value;
        if (lgt > 100) {
            lgt -= 100;
        }
        else if (lgt < 0) {
            lgt += 100;
        }
        newColor.lgt = lgt;
        return newColor;
    }
    adjust_lightness_limited(color, adjust_value) {
        let newColor = copy_color(color);
        let lgt = color.lgt + adjust_value;
        if (lgt > 95) {
            lgt = 95;
        }
        else if (lgt < 5) {
            lgt = 5;
        }
        newColor.lgt = lgt;
        return newColor;
    }
}
_ColorSet_base_color = new WeakMap(), _ColorSet_color_primary = new WeakMap(), _ColorSet_color_primary_gradient = new WeakMap(), _ColorSet_color_border = new WeakMap(), _ColorSet_color_button_fill = new WeakMap(), _ColorSet_color_background = new WeakMap(), _ColorSet_color_background_2 = new WeakMap(), _ColorSet_color_text = new WeakMap(), _ColorSet_hue_button = new WeakMap(), _ColorSet_color_button_start = new WeakMap(), _ColorSet_color_button_end = new WeakMap(), _ColorSet_color_h1_gradient_start = new WeakMap(), _ColorSet_color_h1_gradient_end = new WeakMap();
function set_new_color_scheme(color_set) {
    document.documentElement.style.setProperty('--color-primary', color_set.color_primary);
    document.documentElement.style.setProperty('--color-primary-gradient', color_set.color_primary_gradient);
    document.documentElement.style.setProperty('--color-border', color_set.color_border);
    document.documentElement.style.setProperty('--color-button-fill', color_set.color_button_fill);
    document.documentElement.style.setProperty('--color-background', color_set.color_background);
    document.documentElement.style.setProperty('--color-background-2', color_set.color_background_2);
    document.documentElement.style.setProperty('--color-text', color_set.color_text);
    document.documentElement.style.setProperty('--color-button-start', color_set.color_button_start);
    document.documentElement.style.setProperty('--color-button-end', color_set.color_button_end);
    document.documentElement.style.setProperty('--hue-button', color_set.hue_button);
    /*
    Local styles */
    document.documentElement.style.setProperty('--color-h1-gradient-start', color_set.color_h1_gradient_start);
    document.documentElement.style.setProperty('--color-h1-gradient-end', color_set.color_h1_gradient_end);
}
let color_schemes = [
    new ColorSet("blue", { hue: 200, sat: 70, lgt: 35 }),
    new ColorSet("green", { hue: 132, sat: 70, lgt: 35 }),
    new ColorSet("violet", { hue: 292, sat: 70, lgt: 35 }),
    new ColorSet("pink", { hue: 260, sat: 70, lgt: 35 })
];
set_new_color_scheme(color_schemes[3]);
function set_random_color() {
    let random = Math.random();
    let degrees = 360 * random;
    return { hue: degrees, sat: 70, lgt: 35 };
}
function copy_color(color) {
    return {
        hue: color.hue,
        sat: color.sat,
        lgt: color.lgt,
    };
}
function activate_randomizer() {
    let color_randomizer = document.querySelectorAll(".color_randomizer");
    color_randomizer[0].addEventListener("click", function () {
        let random_colors = set_random_color();
        let colors = new ColorSet("random", random_colors);
        set_new_color_scheme(colors);
        console.log("===============\nColors: " + random_colors + "\n======================");
    });
}
