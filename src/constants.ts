'use strict'

import {navigationRequest} from "./classes/history";
import {Content} from "./custom_elements/content";

export const base_url: string = window.location.origin + "/app-redo/";
export const main: HTMLElement = document.querySelector("main") as HTMLElement;
export const loader: HTMLElement = document.querySelector("#loader") as HTMLElement;
export const header: HTMLElement = document.querySelector("header")as HTMLElement;
export const footer: HTMLElement = document.querySelector("footer") as HTMLElement;
export const backButton: HTMLElement = document.querySelector("#back-button") as HTMLElement;
export const homeButton: HTMLElement = document.querySelector("#home-button") as HTMLElement;
export const navMenu: HTMLElement = document.querySelector("#navMenu") as HTMLElement;
export const menuButton: HTMLElement = document.querySelector("#menu_button") as HTMLElement;
export const overlay: HTMLElement = document.querySelector("#overlay") as HTMLElement;
export const popup: HTMLElement = document.querySelector("#popup") as HTMLElement;
export const content: Content = document.querySelector('app-content') as Content;
export const home_request: navigationRequest = new navigationRequest("home.html", "ab_snippet");

export const ANTIBIOTICS_DATA = await fetch_data("../resources/json_files/antibiotics.json");
export const ANTIBIOTICS = JSON.parse(ANTIBIOTICS_DATA);

export const sequencePrerequisites: string[] = [
    "Ausarbeitung folgt.",
    "<ul><li><strong>Klinische Besserung, hämodynamische Stabilität</strong></li><li><strong>Keine Kontraindikation wie z.B. gastrointestinale Resorptionsstörung</strong> (Diarrhoe, Erbrechen, Kurzdarmsyndrom), <strong>Schluckbeschwerden</strong></li><li><strong>Keine schwere Infektion</strong> wie z.B. Endokarditis, Meningitis, S. aureus Bakteriämie</li><li><strong>Adäquate initiale i.v. Therapie bei bestimmten Infektionen</strong> wie z.B. Fremdkörper- und Implantatassoziierte Infektionen, Osteomyelitis</li></ul>",
    "<ul><li><strong>Umstellung auf andere Substanzgruppe mit höherem p.o./i.v. Serumspiegel</strong> (ggf. Rücksprache Stabsstelle ABS/Apotheke/Mikrobiologie</li><li><strong>Nur in Ausnahmefällen nach sorgfältiger Nutzen-Risiko-Abwägung!</strong></li>",
    "<ul><li><strong>Angabe nicht sinnvoll!</strong></li><li>Keine systemische Wirksamkeit wegen nicht ausreichender Resorption nach p.o.-Gabe</li><li>Abweichende Indikation i.v. und p.o.</li>"
]

export const emergencyPage: HTMLDivElement = document.createElement("div");
emergencyPage.innerHTML = `
<p>Leider ist beim Laden etwas schiefgelaufen! Bitte noch einmal versuchen!
</p>
<app-link title="Zurück zum Startbildschirm" href="home.html" type="ab_snippet">
</app-link>`