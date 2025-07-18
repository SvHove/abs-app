"use strict"

import '../constants';
import '../loading';
import {emergencyPage} from "../constants";

export type requestType = "main_snippet" | "ab_snippet" | "pdf";

export class navigationRequest {
    url: string;
    type: requestType;

    constructor(link: string, type: requestType) {
        this.url = link;
        this.type = type;
    }
}


export class History {

    /* TODO:
        Function back()
        Function forward()
        Function is_in_cache()
        Function get_from_cache()
     */

    #loadedSnippets: Map<navigationRequest, HTMLDivElement>;
    #backHistory: navigationRequest[];
    #forwardHistory: navigationRequest[];

    constructor() {
        this.#loadedSnippets = new Map();
        this.#backHistory = [];
        this.#forwardHistory = [];
    }

    getbackHistory(): navigationRequest[] {
        return this.#backHistory;
    }

    getLastDiv(): HTMLDivElement {
        const lastRequest: navigationRequest | undefined = this.#backHistory.pop();
        if (!lastRequest) return emergencyPage;
        this.#forwardHistory.push(lastRequest);
        return this.getPrior();
    }

    getNextDiv(): HTMLDivElement {
        const lastElement: navigationRequest | undefined = this.#forwardHistory.pop();
        if (!lastElement) {return emergencyPage}
        this.#backHistory.push(lastElement);
        return this.getCurrentElement();
    }

    getPrior(): HTMLDivElement {
        if(this.#backHistory.length < 2) {
            throw new Error("Tried getting prior Element with insufficient backHistory length.");
        }
        const priorElement = this.#loadedSnippets.get(this.#backHistory[this.#backHistory.length -2]);
        if (!priorElement) return emergencyPage;
        return priorElement;
    }

    getCurrentElement(): HTMLDivElement {
        if(this.#backHistory.length < 1) {
            throw new Error("Tried getting current element with insufficient backHistory length.");
        }
        const currentElement: HTMLDivElement | undefined = this.#loadedSnippets.get(this.#backHistory[this.#backHistory.length - 1]);
        if (!currentElement) return emergencyPage;
        return currentElement;
    }

    getCurrentRequest(): navigationRequest {
        return this.#backHistory[this.#backHistory.length - 1];
    }

    add(request: navigationRequest): void {
        this.#forwardHistory = [];
        if(this.getCurrentRequest() !== request) {
            this.#backHistory.push(request);
        }
    }

    addPreload(request: navigationRequest, snippet: HTMLDivElement): void {
        if(!this.has(request)) {
            this.#loadedSnippets.set(request, snippet);
        }
    }

    has(request: navigationRequest): boolean {
        return this.#loadedSnippets.has(request);
    }

    get(request: navigationRequest): HTMLDivElement {
        if (this.has(request)) {
            const requestedSnippet: HTMLDivElement | undefined = this.#loadedSnippets.get(request);
            return requestedSnippet ? requestedSnippet : emergencyPage;
        } else {
            throw new Error(`history.mjs: Unable to find dest: ${request.url} and type: ${request.type}`);
        }
    }
}