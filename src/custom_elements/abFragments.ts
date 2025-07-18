
import {debug, convert_rem_to_pixels} from "../helpers.ts";
import {overlay, popup, sequencePrerequisites} from "../constants.ts";


type AB_Data = {
    alternatives: [
        {
            title: string,
            antibiotic: string,
            text: string,
            dosage: string,
            partners: [] | undefined,
            duration: string,
            comment: string | undefined
        },
        {
            title: string,
            antibiotic: string,
            dosage: string,
            partners: {
                    antibiotic: string,
                    dosage: string,
                    comment: string | undefined
                }[],
            duration: string,
            comment: string | undefined
        }
    ]
}

type Antibiotic = {

    ID: string,
    Exclude: boolean,
    Name: string,
    Standarddosis: string,
    Sequenztherapie: string,
    Sequenztherapie_Voraussetzungen: number,
    Dosisanpassung_Niereninsuffizienz: string,
    Dosisanpassung_Haemodialyse: string,
    Dosisanpassung_Leberinsuffizienz: string,
    Besonderheiten: string,
    Monitoring: string
}

export class AbFragment extends HTMLElement {

    #setupFinished: boolean;
    #content_area: HTMLDivElement;
    #arrow_left_area: HTMLDivElement;
    #arrow_right_area: HTMLDivElement;
    #alternatives_length: number;
    #current_display_id: number;
    #svg_left:  SVGSVGElement;
    #svg_right:  SVGSVGElement;
    #data: AB_Data;
    #containers: HTMLDivElement[];
    #container_holder: HTMLDivElement;

    constructor() {
        super();
        this.#data = JSON.parse(this.getAttribute("data") as string);
        this.#content_area = document.createElement("div");
        this.#arrow_left_area = document.createElement("div");
        this.#arrow_right_area = document.createElement("div");
        this.#svg_left = this.generate_arrow_svg();
        this.#svg_right = this.generate_arrow_svg();
        this.#setupFinished = false;
        this.#containers = [];
        this.#container_holder = document.createElement("div");
        this.set_up_containers();
        this.set_up_arrows();
        this.#alternatives_length = this.#data.alternatives.length;
        this.#current_display_id = 0;
        this.generate_antibiotics();
        this.set_arrow_right_listener();
        this.set_arrow_left_listener();
    }

    connectedCallback() {
        this.set_height();
    }

    set_height() {
        // Dynamically setting height, adding a margin of 0.5rem.
        this.style.height = (this.#containers[this.#current_display_id].firstElementChild.clientHeight + convert_rem_to_pixels(0.5)) + "px";
    }

    set_arrow_right_listener() {
        if(this.#arrow_right_area.hasClickListener) return;
        this.#arrow_right_area.addEventListener('click', () => {
            const current_container = this.#containers[this.#current_display_id];
            current_container.classList.add('hide-left');

            this.#arrow_left_area.classList.remove('hidden');


            this.#current_display_id += 1;
            this.#containers[this.#current_display_id].classList.remove('hide-right');
            this.set_height();

            if(this.#current_display_id === (this.#containers.length - 1)) {
                this.#arrow_right_area.classList.add('hidden');
            }
            this.#arrow_right_area.hasClickListener = true;
        });
    }

    set_arrow_left_listener() {
        this.#arrow_left_area.addEventListener('click', () => {
            const current_container = this.#containers[this.#current_display_id];
            current_container.classList.add('hide-right');

            this.#arrow_right_area.classList.remove('hidden');

            this.#current_display_id -= 1;
            this.#containers[this.#current_display_id].classList.remove('hide-left');
            this.set_height();

            if(this.#current_display_id === 0) {
                this.#arrow_left_area.classList.add('hidden');
            }
        });
    }

    set_up_containers() {
        this.#content_area.classList.add("ab-fragment_content");
        this.#arrow_left_area.classList.add("ab-fragment_arrow-left-area");
        this.#arrow_left_area.classList.add("hidden");
        this.#arrow_right_area.classList.add("ab-fragment_arrow-right-area");
        this.#arrow_right_area.classList.add("hidden");
        this.appendChild(this.#arrow_left_area);
        this.appendChild(this.#content_area);
        this.appendChild(this.#arrow_right_area);
    }

    set_up_arrows() {
        this.set_up_left_arrow();
        this.set_up_right_arrow();

    }

    set_up_left_arrow() {

        this.#arrow_left_area.appendChild(this.#svg_left);
        this.#arrow_left_area.hasClickListener = false;
    }

    set_up_right_arrow() {
        this.#arrow_right_area.appendChild(this.#svg_right);
        this.#arrow_right_area.hasClickListener = false;
    }

    generate_arrow_svg() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "viewBox", "0 0 45 64");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.display = "block";
        svg.innerHTML = '    <path class="stroke_color-primary" \n' +
            '            d="M2,32\n' +
            '       L25,8\n' +
            '       L20,24\n' +
            '       L40,24\n' +
            '       L35,32\n' +
            '       L40,40\n' +
            '       L20,40\n' +
            '       L25,56\n' +
            '       Z"\n' +
            '            fill="none"\n' +
            '            stroke="url(#fragment_stroke_gradient)"\n' +
            '            stroke-width="4"\n' +
            '            stroke-linecap="round"\n' +
            '            stroke-linejoin="round"\n' +
            '    />';
        svg.classList.add('.stroke_text-color');
        return svg;
    }

    generate_antibiotics() {
        this.#container_holder.classList.add("ab-fragment_alternative_holder");

        if (this.#alternatives_length > 1) {
            this.#arrow_right_area.classList.remove("hidden");
        }

        for(let alternative of this.#data.alternatives) {
            const container = new AlternativeContainer(alternative).container;
            container.classList.add("hide-right");
            this.#containers.push(container);
            this.#container_holder.appendChild(container);
        }

        this.#content_area.appendChild(this.#container_holder);
        this.#containers[0].classList.remove("hide-right");
    }
}

/**
 * Given the data object for a single alternative, this class constructs the content for the data, including adding in
 * a AbInfoButton element.
 */
class AlternativeContainer {

    #container;
    #lower_container;
    #data: AB_Data;

    constructor(single_alternative_data: AB_Data) {
        this.#container = document.createElement("div");
        this.#container.classList.add("ab-fragment_alternative_upper_container");
        this.#lower_container = document.createElement("div");
        this.#lower_container.classList.add("ab-fragment_alternative_lower_container");
        this.#container.appendChild(this.#lower_container)
        this.#data = single_alternative_data;

        this.add_title(this.#data);
        this.add_button(this.#data);
        this.add_dosage(this.#data);
        this.add_partners(this.#data);
        this.add_duration(this.#data);
        this.add_comment(this.#data);
    }

    get container() {
        return this.#container;
    }

    get lower_container() {
        return this.#lower_container;
    }

    add_duration(single_alternative_data: AB_Data) {
        const duration_paragraph = document.createElement("p");
        duration_paragraph.innerHTML = '<strong>Therapiedauer:</strong><br>'
        duration_paragraph.innerHTML += single_alternative_data.duration;
        this.lower_container.append(duration_paragraph);
    }

    add_comment(single_alternative_data) {
        if(single_alternative_data.comment) {
            const comment_paragraph = document.createElement("p");
            comment_paragraph.innerHTML += single_alternative_data.comment;
            this.lower_container.append(comment_paragraph);
        }
    }

    add_partners() {
        if(this.data.partners) {
            this.data.partners.forEach((partner) => {
                let connector = document.createElement("span");
                connector.innerHTML = '<br><strong>+</strong><br><br>';
                this.lower_container.appendChild(connector);
                this.add_button(partner);
                this.add_dosage(partner);
                this.add_comment(partner);
            })
        }
    }

    add_dosage(single_alternative_data) {
        if(single_alternative_data.dosage) {
            const dosage_paragraph = document.createElement("p");
            dosage_paragraph.innerHTML += '<strong>Dosierung: </strong><br>';
            dosage_paragraph.innerHTML += single_alternative_data.dosage;
            this.lower_container.appendChild(dosage_paragraph);
        }
    }


    add_button(single_alternative_data) {
        const button = new AbInfoButton(single_alternative_data).container;
        this.lower_container.appendChild(button);
    }

    add_title(single_alternative_data) {
        const title_container = document.createElement("h6");
        title_container.classList.add("ab-fragment_alternative_title")
        if(single_alternative_data.title) {
            title_container.innerHTML = single_alternative_data.title + ":";
        } else {
            title_container.innerHTML = "Therapie der Wahl:"
        }
        this.lower_container.append(title_container);
    }



}

/**
 * Given the data object for a single alternative, this class constructs a custom button with the antibiotic name and
 * a click-listener to open the info page.
 * Resulting html:
 * <div class="ab-fragment_alternative_info_button">
 *     <svg>....</svg>
 *     <span>...</span>
 *     <svg>...</svg>
 * </div>
 */
class AbInfoButton {

    #container;

    constructor(single_alternative_data) {
        this.data = single_alternative_data;
        this.connected_antibiotic = ANTIBIOTICS[this.data.antibiotic];
        this.#container = document.createElement("div");
        this.container.classList.add("ab-fragment_alternative_info_button")
        this.set_up_child_elements();
        this.generate_popup_content();
        this.set_up_listener();
    }

    set_up_listener() {
        this.container.addEventListener('click', (e) => {
            popup.appendChild(this.popup_content);
            popup.classList.add("active");
            overlay.classList.add("active");
        })
    }

    generate_popup_content() {
        const content = document.createElement("div");
        if(this.connected_antibiotic.Name) {
            let name = document.createElement("h6");
            name.innerHTML = this.connected_antibiotic.Name;
            content.appendChild(name)
        }

        if(this.connected_antibiotic.Standarddosis) {
            let dosage = document.createElement("p");
            dosage.innerHTML = "<strong>Standarddosis:</strong><br>" + this.connected_antibiotic.Standarddosis;
            content.appendChild(dosage);
        }

        if(this.connected_antibiotic.Sequenztherapie) {
            let sequence = document.createElement("p");
            sequence.innerHTML = '<strong>Sequenztherapie:</strong><br><span class="small-text">(Bedingungen s.u.)</span><br>' + this.connected_antibiotic.Sequenztherapie;
            content.appendChild(sequence);
        }

        if(this.connected_antibiotic.Dosisanpassung_Niereninsuffizienz) {
            let dosage_kidney_failure = document.createElement("p");
            dosage_kidney_failure.innerHTML = '<strong>Dosisanpassung bei Niereninsuffizienz:</strong><br>' + this.connected_antibiotic.Dosisanpassung_Niereninsuffizienz;
            content.appendChild(dosage_kidney_failure);
        }

        if(this.connected_antibiotic.Dosisanpassung_Niereninsuffizienz) {
            let dosage_dialysis = document.createElement("p");
            dosage_dialysis.innerHTML = '<strong>Dosisanpassung bei Hämodialyse:</strong><br>' + this.connected_antibiotic.Dosisanpassung_Niereninsuffizienz;
            content.appendChild(dosage_dialysis);
        }

        if(this.connected_antibiotic.Dosisanpassung_Leberinsuffizienz) {
            let dosage_liver_failure = document.createElement("p");
            dosage_liver_failure.innerHTML = '<strong>Dosisanpassung bei Leberinsuffizienz:</strong><br>' + this.connected_antibiotic.Dosisanpassung_Leberinsuffizienz;
            content.appendChild(dosage_liver_failure)
        }

        if(this.connected_antibiotic.Besonderheiten) {
            let special_notes = document.createElement("p");
            special_notes.innerHTML = '<strong>Besonderheiten:</strong><br>' + this.connected_antibiotic.Besonderheiten;
            content.appendChild(special_notes);
        }

        if(this.connected_antibiotic.Monitoring) {
            let monitoring = document.createElement("p");
            monitoring.innerHTML = '<strong>Monitoring:</strong><br>' + this.connected_antibiotic.Monitoring;
            content.appendChild(monitoring)
        }

        if(this.connected_antibiotic.Sequenztherapie_Voraussetzungen) {
            let sequence_pre = document.createElement("p");
            sequence_pre.innerHTML = sequencePrerequisites[this.connected_antibiotic.Sequenztherapie_Voraussetzungen];
            content.appendChild(sequence_pre);
        }

        let back_button = this.generate_popup_back_button()
        content.appendChild(back_button);

        this.popup_content = content;

        /*
    "ampicillin_iv": {
      "ID": "ampicillin_iv",
      "Exclude": false,
      "Name": "Ampicillin",
      "Standarddosis": "3x 2g tgl. i.v.",
      "Sequenztherapie": "Eingeschränkt möglich:<br><br>Amoxicillin p.o., 3x 1g tgl. (BV 70-90%)<br>p.o./i.v. Serumspiegel 35-45%<br>Gleiche Wirkstoffgruppe und identisches Wirkspektrum.",
      "Sequenztherapie_Voraussetzungen": "1",
      "Dosisanpassung_Niereninsuffizienz": "<em>GFR 30-20 ml/min:</em><br>2-4 x 1-2g tgl.<br><em>GFR 20-10 ml/min:</em><br>1-4 x 1-2g tgl.<br><em>GFR <10 ml/min:</em><br>1-3 x 1-2g bis 4 x 1g tgl.",
      "Dosisanpassung_Haemodialyse": "<em>Erhaltungsdosis:</em><br>1-2 x 1-2g<br><em>+ Ersatzdosis:</em><br>1g nach Dialyse.",
      "Dosisanpassung_Leberinsuffizienz": "Keine Dosisanpassung.",
      "Besonderheiten": "MTX-Toxizität steigt, insbesondere bei eingeschränkter Nierenfunktion",
      "Monitoring": "Therapie >7-10 Tage:<br>Nierenfunktion, Blutbild (insb. Thrombozyten), ggf. INR"
    }
         */
    }

    generate_popup_back_button() {
        let back_button = document.createElement("div");
        back_button.classList.add('content-button', 'popup-button');
        back_button.innerHTML = '<span>Zurück</span>';
        back_button.addEventListener('click', () => {
            overlay.classList.remove("active");
            popup.classList.remove("active");
            popup.innerHTML = '';
        })
        return back_button;
    }

    set_up_child_elements() {
        this.info_icon_left = create_info_icon();
        this.info_icon_area_left = document.createElement("div");
        this.info_icon_area_left.classList.add("ab-fragment_info_icon_area_left");
        this.info_icon_area_left.appendChild(this.info_icon_left);
        this.name_span = document.createElement("span");
        this.name_span.innerText = this.connected_antibiotic.Name;
        this.info_icon_right = create_info_icon();
        this.info_icon_area_right = document.createElement("div");
        this.info_icon_area_right.classList.add("ab-fragment_info_icon_area_right");
        this.info_icon_area_right.appendChild(this.info_icon_right);

        this.container.appendChild(this.info_icon_area_left);
        this.container.appendChild(this.name_span);
        this.container.appendChild(this.info_icon_area_right);
    }

    get container() {
        return this.#container;
    }
}



function create_info_icon() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "viewBox", "0 0 18 18");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.display = "block";
    svg.innerHTML = '  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>\n' +
        '  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>\n';
    svg.classList.add('.stroke_text-color');
    return svg;
}

customElements.define("app-ab_fragment", AbFragment);