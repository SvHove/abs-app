
"use strict";

export class Dropdown extends HTMLElement {

    readonly #content: HTMLElement;
    readonly #button: HTMLButtonElement;
    readonly #title_span: HTMLSpanElement;
    readonly #svg: SVGSVGElement;
    #svg_vertical_lines: NodeListOf<HTMLElement> | undefined;

    constructor() {
        super();
        this.innerHTML = '<div class="dropdown_content">' + this.innerHTML + `</div>`;
        this.#button = document.createElement('button');
        this.#title_span = document.createElement('span');
        this.#svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.#svg_vertical_lines = undefined;
        this.addButton();
        this.#content = this.#button.nextElementSibling as HTMLElement;
        this.classList.add('dropdown');
        //this.classList.add('active');
        this.#button.addEventListener('click', (event) => {
            event.preventDefault();
            this.change_state();
            this.close_other_buttons();
            this.rotate_plus();
        });
    }

    connectedCallback(): void {
        this.adjust_content_box();
    }

    rotate_plus(): void {
        if(!this.#svg_vertical_lines) return;
        this.#svg_vertical_lines.forEach((element) => {
            if (element.classList.contains('rotate_90')) {
                element.classList.remove('rotate_90');
            } else {
                element.classList.add('rotate_90');
            }
        })
    }

    close_other_buttons(): void {
        const dropdowns: NodeListOf<Dropdown> = document.querySelectorAll('app-dropdown') as NodeListOf<Dropdown>;
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(this) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                dropdown.rotate_plus();
            }
        })
    }

    change_state(): void {
        this.classList.toggle('active');
    }

    adjust_content_box(): void {
        this.#content.style.marginTop = "-" + this.#button.clientHeight / 2 + "px";
        this.#content.style.paddingTop = this.#button.clientHeight / 2 + "px";
    }

    render(): void {
        this.adjust_content_box();
    }

    addButton() {
        this.#button.classList.add('content-button');
        const title = this.getAttribute("title");
        if(!title) throw new Error("Missing title Attribute");
        this.#title_span.innerHTML = title;
        this.#button.appendChild(this.#title_span);
        this.append_svg_to_button();
        this.insertBefore(this.#button, this.firstElementChild)
    }

    append_svg_to_button() {
        this.#svg.setAttributeNS(null, "viewBox", "0 0 22 22");
        this.#svg.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
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
        this.#svg_vertical_lines = this.#svg.querySelectorAll('.plus_vertical');
        this.#button.appendChild(this.#svg)
    }


}

customElements.define("app-dropdown", Dropdown);