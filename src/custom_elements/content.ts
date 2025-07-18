"use strict";

import {History, navigationRequest} from "../classes/history.ts";
import {hideLoader, loadSnippet, showLoader} from "../loading.ts";
import {Link} from "./link.ts";
import {home_request} from "../constants.ts";

/*TODO:
    Design "connected elements": All elements which need to be preloaded for animations.
    Function "replace": Needs to replace, unload preloaded elements.
    Field "active_element".
    Function to preload links from active element.
 */

export class Content extends HTMLElement {

    #preLoadReady: boolean;
    #activeChild: HTMLDivElement;
    #preLoadedElements: HTMLDivElement[];
    #oldElement: HTMLDivElement | undefined;
    #history: History;

    constructor() {
        super();
        this.#history = new History();
        this.#activeChild = this.firstElementChild as HTMLDivElement;
        this.#preLoadedElements = [];
        this.#preLoadReady = false;
        this.#oldElement = undefined;
    }

    async setStartElement(request: navigationRequest, element: HTMLDivElement): Promise<void> {
        this.replaceChild(element, this.#activeChild);
        hideLoader();
        await this.preloadElementsFrom(element);
        this.#activeChild = element;
        this.#history.addPreload(request, element);
        this.#history.add(request);
    }

    async preloadElementsFrom(element: HTMLDivElement): Promise<void> {
        this.preLoadPending();
        const linkElements: NodeListOf<Link> = element.querySelectorAll(`app-link`) as NodeListOf<Link>;
        for(let link of linkElements) {
            const request = link.getRequest();
            let preLoadedElement;
            if(this.#history.has(request)) {
                preLoadedElement = this.#history.get(request);
            } else {
                preLoadedElement = await loadSnippet(request);
                this.#history.addPreload(request, preLoadedElement);
            }
            preLoadedElement.classList.add("hide-right");
            this.#preLoadedElements.push(preLoadedElement);
            if(!link.hasClickListener) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    if(!this.preLoadReady) {
                        showLoader();
                        while(!this.#preLoadReady) {

                        }
                        hideLoader();
                    }
                    this.switchActiveElementTo(preLoadedElement);
                    this.#history.add(request);
                });
                link.hasClickListener = true;
            }
            this.appendChild(preLoadedElement);
        }
        this.preLoadReady();
    }

    async home(): Promise<void> {
        if(this.#history.getCurrentRequest() !== home_request) {
            const home = await loadSnippet(home_request);
            home.classList.add("hide-right");
            this.appendChild(home);
            await this.switchActiveElementTo(home);
            this.#history.add(home_request);
        } else {
            console.error(`Already at home, ignoring request.`)
        }
    }


    async switchActiveElementTo(element: HTMLDivElement): Promise<void> {
        if(this.#oldElement) {
            this.removeChild(this.#oldElement);
        }
        this.#activeChild.classList.add("hide-left");
        element.classList.remove("hide-right");
        this.#oldElement = this.#activeChild
        this.#activeChild = element;
        await this.preloadElementsFrom(element);
    }

    preLoadPending(): void {
        this.#preLoadedElements.forEach((element) => {
            if(!(element === this.#activeChild)) {
                this.removeChild(element);
            }
        })
        this.#preLoadedElements = [];
        this.#preLoadReady = false;
    }

    preLoadReady(): void {
        this.#preLoadReady = true;
    }

    async back(): Promise<void> {
        if(!this.#oldElement) {
            console.error("No prior element. Staying on home.");
            return;
        }
        this.#activeChild.classList.add("hide-right");
        this.#oldElement.classList.remove("hide-left");
        this.#activeChild = this.#oldElement;
        this.#oldElement = this.#history.getLastDiv();
        if(this.#oldElement) {
            this.#oldElement.classList.add("hide-left");
            this.appendChild(this.#oldElement);
        }
        await this.preloadElementsFrom(this.#activeChild);
    }
}

customElements.define("app-content", Content);