import {debug} from "../helpers";
import {navigationRequest, requestType} from "../classes/history";

"use strict"

export class Link extends HTMLElement {

    readonly #href: string;
    readonly #type: requestType;
    readonly #title: string;
    readonly #navigationRequest: navigationRequest;
    readonly #content: HTMLDivElement;
    readonly #link: HTMLAnchorElement;
    readonly #title_span: HTMLSpanElement;
    readonly #svg: SVGSVGElement;
    hasClickListener: boolean;

    constructor() {
        super();
        this.#title = this.getAttribute("title") as string;
        this.#href = this.getAttribute("href") as string;
        this.#type = this.getAttribute("type") as requestType;
        this.#navigationRequest = new navigationRequest(this.#href, this.#type);
        this.classList.add("link");
        this.#link = document.createElement("a");
        this.#title_span = document.createElement("span");
        this.#content = document.createElement("div");
        this.#svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.init_link();
        this.add_content_container_classes();
        this.hasClickListener = false;
    }

    getRequest(): navigationRequest {
        return this.#navigationRequest;
    }

    add_content_container_classes(): void {
        this.#content.classList.add("snippet_content");
        this.#content.classList.add("preloaded");
    }

    init_link(): void {
        this.#title_span.innerHTML = this.title;
        this.#link.appendChild(this.#title_span);
        this.#link.classList.add('content-button');
        this.#svg.setAttributeNS(null, "viewBox", "0 0 22 22");
        this.#svg.innerHTML = "                <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n" +
            "                <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n" +
            "                <line x1=\"15\" y1=\"16\" x2=\"19\" y2=\"12\"></line>\n" +
            "                <line x1=\"15\" y1=\"8\" x2=\"19\" y2=\"12\"></line>"
        this.#link.appendChild(this.#svg)
        this.appendChild(this.#link);
    }
}

customElements.define("app-link", Link)
