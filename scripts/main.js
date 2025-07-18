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
require("./loading");
require("./coloring.mjs");
require("./custom_elements/abFragments");
require("./custom_elements/dropdown");
require("./custom_elements/link");
require("./custom_elements/content");
const loading_1 = require("./loading");
const constants_ts_1 = require("./constants.ts");
"use strict";
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: Write detectors for typical mobile actions.
        const home_snippet = yield (0, loading_1.loadSnippet)(constants_ts_1.home_request);
        yield constants_ts_1.content.setStartElement(constants_ts_1.home_request, home_snippet);
    });
}
start().then(() => {
    console.log("Started Application");
});
constants_ts_1.header.addEventListener(`click`, (event) => {
    checkForAndRemoveOverlays();
});
constants_ts_1.footer.addEventListener("click", (event) => {
    checkForAndRemoveOverlays();
});
function checkForAndRemoveOverlays() {
    if (overlayIsActive()) {
        deactivateOverlay();
        return true;
    }
    return false;
}
constants_ts_1.backButton.addEventListener("click", () => {
    if (checkForAndRemoveOverlays())
        return;
    constants_ts_1.content.back();
});
constants_ts_1.homeButton.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.stopPropagation();
    if (checkForAndRemoveOverlays())
        return;
    yield constants_ts_1.content.home(constants_ts_1.home_request);
}));
constants_ts_1.menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (checkForAndRemoveOverlays())
        return;
    constants_ts_1.navMenu.classList.toggle("active");
    console.log("Reached");
    constants_ts_1.overlay.classList.add("active");
    console.log("Also reached?");
});
constants_ts_1.overlay.addEventListener("click", (event) => {
    event.stopPropagation();
    deactivateOverlay();
});
function overlayIsActive() {
    return constants_ts_1.overlay.classList.contains("active");
}
function deactivateOverlay() {
    constants_ts_1.overlay.classList.remove("active");
    constants_ts_1.popup.classList.remove("active");
    constants_ts_1.popup.innerHTML = '';
    constants_ts_1.navMenu.classList.remove("active");
}
/*Saved sets:
256,70,35
 */ 
