'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.emergencyPage = exports.sequencePrerequisites = exports.ANTIBIOTICS = exports.ANTIBIOTICS_DATA = exports.home_request = exports.content = exports.popup = exports.overlay = exports.menuButton = exports.navMenu = exports.homeButton = exports.backButton = exports.footer = exports.header = exports.loader = exports.main = exports.base_url = void 0;
const history_1 = require("./classes/history");
exports.base_url = window.location.origin + "/app-redo/";
exports.main = document.querySelector("main");
exports.loader = document.querySelector("#loader");
exports.header = document.querySelector("header");
exports.footer = document.querySelector("footer");
exports.backButton = document.querySelector("#back-button");
exports.homeButton = document.querySelector("#home-button");
exports.navMenu = document.querySelector("#navMenu");
exports.menuButton = document.querySelector("#menu_button");
exports.overlay = document.querySelector("#overlay");
exports.popup = document.querySelector("#popup");
exports.content = document.querySelector('app-content');
exports.home_request = new history_1.navigationRequest("home.html", "ab_snippet");
exports.ANTIBIOTICS_DATA = await fetch_data("../resources/json_files/antibiotics.json");
exports.ANTIBIOTICS = JSON.parse(exports.ANTIBIOTICS_DATA);
exports.sequencePrerequisites = [
    "Ausarbeitung folgt.",
    "<ul><li><strong>Klinische Besserung, hämodynamische Stabilität</strong></li><li><strong>Keine Kontraindikation wie z.B. gastrointestinale Resorptionsstörung</strong> (Diarrhoe, Erbrechen, Kurzdarmsyndrom), <strong>Schluckbeschwerden</strong></li><li><strong>Keine schwere Infektion</strong> wie z.B. Endokarditis, Meningitis, S. aureus Bakteriämie</li><li><strong>Adäquate initiale i.v. Therapie bei bestimmten Infektionen</strong> wie z.B. Fremdkörper- und Implantatassoziierte Infektionen, Osteomyelitis</li></ul>",
    "<ul><li><strong>Umstellung auf andere Substanzgruppe mit höherem p.o./i.v. Serumspiegel</strong> (ggf. Rücksprache Stabsstelle ABS/Apotheke/Mikrobiologie</li><li><strong>Nur in Ausnahmefällen nach sorgfältiger Nutzen-Risiko-Abwägung!</strong></li>",
    "<ul><li><strong>Angabe nicht sinnvoll!</strong></li><li>Keine systemische Wirksamkeit wegen nicht ausreichender Resorption nach p.o.-Gabe</li><li>Abweichende Indikation i.v. und p.o.</li>"
];
exports.emergencyPage = document.createElement("div");
exports.emergencyPage.innerHTML = `
<p>Leider ist beim Laden etwas schiefgelaufen! Bitte noch einmal versuchen!
</p>
<app-link title="Zurück zum Startbildschirm" href="home.html" type="ab_snippet">
</app-link>`;
