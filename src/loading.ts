"use strict"
import './constants';
import './helpers';
import './classes/history';
// @ts-ignore
import * as pdfjsLib from '../pdf_js/build/pdf.mjs';
import {base_url, emergencyPage, loader} from "./constants.ts";
import {navigationRequest} from "./classes/history";

pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdf_js/build/pdf.worker.mjs';

//TODO: Somehow home button usage results in not appended inhaltsverzeichnis...




export async function loadSnippet(request: navigationRequest): Promise<HTMLDivElement> {
    const element = await loadByType(request);
    if(!element) return emergencyPage;
    const container = document.createElement("div");
    container.classList.add('page');
    container.appendChild(element);
    return container;
}

export function showLoader(): void {
    //TODO: Make the loader independend element, show and hide it (possibly with very fast transition?)
    loader.classList.remove(`hidden`);
}

export function hideLoader(): void {
    //TODO: Write function for hiding the loader.
    loader.classList.add(`hidden`);
}

async function loadByType(request: navigationRequest): Promise<HTMLDivElement> {
    switch (request.type) {
        case "ab_snippet":
            return await loadAbSnippet(request);
        case "pdf":
            return await loadPdf(request);
        default:
            return emergencyPage;
    }
}

async function loadAbSnippet(request: navigationRequest): Promise<HTMLDivElement> {
    const link = base_url + "ab_snippets/" + request.url;
    const container = document.createElement("div");
    container.classList.add('ab_snippet_container');
    container.innerHTML = await fetchData(link);
    return container;
}

async function loadPdf(request: navigationRequest): Promise<HTMLDivElement> {
    const link = base_url + "resources/pdf/" + request.url;
    const frame = createPdfIframe();
    frame.src = base_url + "pdf_js/web/viewer.html?file=" + link;
    return frame;
}

function createPdfIframe() {
    const frame = document.createElement("iframe");
    frame.classList.add("pdf-viewer");
    return frame;
}

async function fetchData(data_url: string): Promise<string> {
    return await fetch(data_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading data: ${response.statusText}`);
            }
            return response.text();
        });
}


//TODO: Write back function for window.popstate. Remember: If last history entry is reached, use default.
/*
window.addEventListener('popstate', async (event) => {
    event.preventDefault();
    let prior_content = document.querySelector(".snippet.current");
    console.log("Popping");
    console.log("State name: " + event.state.url + "\nState type: " + event.state.data_type);
    let loader = get_loader(new NavigationRequest(event.state.url, event.state.data_type, prior_content), true);
    console.log("Loader: " + loader);
    await loader.preload();
    setTimeout(() => {
        loader.activate();
    }, 50)
})
*/
