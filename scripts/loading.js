"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.loadSnippet = loadSnippet;
exports.showLoader = showLoader;
exports.hideLoader = hideLoader;
require("./constants");
require("./helpers");
require("./classes/history");
// @ts-ignore
const pdfjsLib = __importStar(require("../pdf_js/build/pdf.mjs"));
const constants_ts_1 = require("./constants.ts");
pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdf_js/build/pdf.worker.mjs';
//TODO: Somehow home button usage results in not appended inhaltsverzeichnis...
function loadSnippet(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield loadByType(request);
        if (!element)
            return constants_ts_1.emergencyPage;
        const container = document.createElement("div");
        container.classList.add('page');
        container.appendChild(element);
        return container;
    });
}
function showLoader() {
    //TODO: Make the loader independend element, show and hide it (possibly with very fast transition?)
    constants_ts_1.loader.classList.remove(`hidden`);
}
function hideLoader() {
    //TODO: Write function for hiding the loader.
    constants_ts_1.loader.classList.add(`hidden`);
}
function loadByType(request) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (request.type) {
            case "ab_snippet":
                return yield loadAbSnippet(request);
            case "pdf":
                return yield loadPdf(request);
            default:
                return constants_ts_1.emergencyPage;
        }
    });
}
function loadAbSnippet(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = constants_ts_1.base_url + "ab_snippets/" + request.url;
        const container = document.createElement("div");
        container.classList.add('ab_snippet_container');
        container.innerHTML = yield fetchData(link);
        return container;
    });
}
function loadPdf(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = constants_ts_1.base_url + "resources/pdf/" + request.url;
        const frame = createPdfIframe();
        frame.src = constants_ts_1.base_url + "pdf_js/web/viewer.html?file=" + link;
        return frame;
    });
}
function createPdfIframe() {
    const frame = document.createElement("iframe");
    frame.classList.add("pdf-viewer");
    return frame;
}
function fetchData(data_url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(data_url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading data: ${response.statusText}`);
            }
            return response.text();
        });
    });
}
