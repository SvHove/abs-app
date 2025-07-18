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
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = debug;
exports.fetch_data = fetch_data;
exports.convert_rem_to_pixels = convert_rem_to_pixels;
let debugging = true;
function debug(...inputs) {
    if (debugging) {
        for (let input of inputs) {
            console.log(input);
        }
    }
}
function fetch_data(data_url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(data_url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading data: ${response.statusText}`);
            }
            return response.text();
        });
    });
}
function convert_rem_to_pixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
