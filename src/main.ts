import './loading'
import './coloring.mjs'
import './custom_elements/abFragments'
import './custom_elements/dropdown';
import './custom_elements/link';
import './custom_elements/content';
import {loadSnippet} from "./loading";
import {
    main,
    backButton,
    footer,
    header,
    homeButton,
    menuButton,
    navMenu,
    popup,
    overlay,
    content,
    home_request
} from "./constants.ts";
import {fetch_data} from "./helpers.ts";

"use strict"



async function start() {

    //TODO: Write detectors for typical mobile actions.

    const ANTIBIOTICS_DATA = await fetch_data("../resources/json_files/antibiotics.json");
    const ANTIBIOTICS = JSON.parse(ANTIBIOTICS_DATA);

    const home_snippet = await loadSnippet(home_request);
    await content.setStartElement(home_request, home_snippet);
}

start().then(() => {
    console.log("Started Application");
});

header.addEventListener(`click`, (event) => {
    checkForAndRemoveOverlays();
})

footer.addEventListener("click", (event) => {
    checkForAndRemoveOverlays();
})

function checkForAndRemoveOverlays() {
    if(overlayIsActive()) {
        deactivateOverlay();
        return true;
    }
    return false;
}


backButton.addEventListener("click", () => {
    if(checkForAndRemoveOverlays()) return;
    content.back();
})


homeButton.addEventListener("click", async (event) => {
    event.stopPropagation();
    if(checkForAndRemoveOverlays()) return;
    await content.home();
})

menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if(checkForAndRemoveOverlays()) return;
    navMenu.classList.toggle("active");
    console.log("Reached");
    overlay.classList.add("active");
    console.log("Also reached?");
})

overlay.addEventListener("click", (event) => {
    event.stopPropagation();
    deactivateOverlay();
})

function overlayIsActive() {
    return overlay.classList.contains("active");
}

function deactivateOverlay() {
    overlay.classList.remove("active");
    popup.classList.remove("active");
    popup.innerHTML = '';
    navMenu.classList.remove("active");
}


/*Saved sets:
256,70,35
 */