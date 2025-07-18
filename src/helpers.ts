"use strict"

let debugging = true;

export function debug(...inputs: any[]): void {
    if (debugging) {
        for(let input of inputs) {
            console.log(input);
        }
    }
}

export async function fetch_data(data_url: string): Promise<string> {
    return await fetch(data_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading data: ${response.statusText}`);
            }
            return response.text();
        });
}

export function convert_rem_to_pixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}