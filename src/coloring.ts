type Color =  {
    hue: number,
    sat: number,
    lgt: number
};


class ColorSet {

    #base_color: Color;
    name: string;

    #color_primary: Color;
    #color_primary_gradient: Color;
    #color_border: Color;
    #color_button_fill: Color;
    #color_background: Color;
    #color_background_2: Color;
    #color_text: Color;
    #hue_button: number;
    #color_button_start: Color;
    #color_button_end: Color;

    #color_h1_gradient_start: Color;
    #color_h1_gradient_end: Color;


    constructor(name: string, color_base: Color) {
        this.#base_color = color_base;

        this.name = name;
        this.#color_primary = color_base;
        this.#color_primary_gradient = this.get_gradient_color(color_base)
        this.#color_border = this.get_border_color(color_base)
        this.#color_button_fill = this.get_button_fill_color(color_base)
        this.#color_background = this.get_background_color_color(color_base);
        this.#color_background_2 = this.get_background_color_2();
        this.#color_text = this.get_text_color(color_base);
        this.#hue_button = (color_base.hue - 30);
        this.#color_button_start = this.get_color_button_start(color_base);
        this.#color_button_end = this.get_color_button_end(color_base)

        this.#color_h1_gradient_start = this.get_color_h1_gradient_start();
        this.#color_h1_gradient_end = this.get_color_h1_gradient_end();
    }

    get color_primary(): string {
        return this.convert_color_array_to_hsl(this.#color_primary);
    }

    get color_primary_gradient(): string {
        return this.convert_color_array_to_hsl(this.#color_primary_gradient);
    }

    get color_border(): string {
        return this.convert_color_array_to_hsl(this.#color_border);
    }

    get color_button_fill(): string {
        return this.convert_color_array_to_hsl(this.#color_button_fill)
    }

    get color_background(): string {
        return this.convert_color_array_to_hsl(this.#color_background);
    }

    get color_background_2(): string {
        return this.convert_color_array_to_hsl(this.#color_background_2);
    }

    get color_text(): string {
        return this.convert_color_array_to_hsl(this.#color_text);
    }

    get color_button_start(): string {
        return this.convert_color_array_to_hsl(this.#color_button_start);
    }

    get hue_button(): string {
        return this.#hue_button + "deg";
    }

    get color_button_end(): string {
        return this.convert_color_array_to_hsl(this.#color_button_end);
    }

    get color_h1_gradient_start(): string {
        return this.convert_color_array_to_hsl(this.#color_h1_gradient_start);
    }

    get color_h1_gradient_end(): string {
        return this.convert_color_array_to_hsl(this.#color_h1_gradient_end);
    }

    get_background_color_2(): Color {
        return this.adjust_lightness_limited(this.#base_color, 59);
    }

    get_color_h1_gradient_start(): Color {
        let newColor: Color = copy_color(this.#base_color);
        newColor = this.adjust_hue(newColor, 10);
        newColor = this.adjust_lightness_limited(newColor, 58);
        return newColor;
    }


    get_color_h1_gradient_end(): Color {
        let newColor = copy_color(this.#base_color);
        newColor = this.adjust_hue(newColor, 40);
        newColor = this.adjust_lightness_limited(newColor, 55);
        return newColor;
    }

    get_color_button_end(color: Color): Color {
        let newColor: Color = copy_color(color);
        newColor = this.adjust_hue(newColor, 30);
        newColor.sat = 60;
        newColor.lgt = 85;
        return newColor;
    }

    get_color_button_start(color: Color): Color {
        let newColor: Color = copy_color(color);
        newColor = this.adjust_hue(newColor, -30);
        newColor.sat = 50;
        newColor.lgt = 90;
        return newColor;
    }

    get_text_color(color: Color): Color {
        return this.adjust_lightness_with_overspill(color,70)
    }

    get_background_color_color(color: Color) {
        return this.adjust_lightness_limited(color,60)
    }

    get_gradient_color(color: Color): Color {
        let newColor = copy_color(color);
        newColor = this.adjust_hue(newColor, 50);
        newColor = this.adjust_lightness_limited(newColor, 20);
        return newColor;
    }

    get_border_color(color: Color): Color {
        return this.adjust_lightness_limited(color,25);
    }

    get_button_fill_color(color: Color): Color {
        return this.adjust_lightness_with_overspill(color, 60);
    }

    convert_color_array_to_hsl(color: Color): string {
        return `hsl(${color.hue}deg, ${color.sat}%, ${color.lgt}%))`;
    }

    adjust_hue(color: Color, adjust_value: number): Color {
        let newColor: Color = copy_color(color);
        let hue: number = newColor.hue + adjust_value;
        if (hue > 360) {
            hue -= 360;
        } else if(hue < 0) {
            hue += 360;
        }
        newColor.hue = hue;
        return newColor;
    }

    adjust_lightness_with_overspill(color: Color, adjust_value: number): Color {
        let newColor = copy_color(color);
        let lgt = color.lgt + adjust_value;
        if(lgt > 100) {
            lgt -= 100;
        } else if (lgt < 0) {
            lgt += 100;
        }
        newColor.lgt = lgt;
        return newColor;
    }

    adjust_lightness_limited(color: Color, adjust_value: number): Color {
        let newColor = copy_color(color);
        let lgt = color.lgt + adjust_value;
        if (lgt > 95) {
            lgt = 95;
        } else if (lgt <5) {
            lgt = 5;
        }
        newColor.lgt = lgt;
        return newColor;
    }
}

function set_new_color_scheme(color_set: ColorSet): void {
    document.documentElement.style.setProperty('--color-primary', color_set.color_primary);
    document.documentElement.style.setProperty('--color-primary-gradient', color_set.color_primary_gradient);
    document.documentElement.style.setProperty('--color-border', color_set.color_border);
    document.documentElement.style.setProperty('--color-button-fill', color_set.color_button_fill);
    document.documentElement.style.setProperty('--color-background', color_set.color_background);
    document.documentElement.style.setProperty('--color-background-2', color_set.color_background_2);
    document.documentElement.style.setProperty('--color-text', color_set.color_text);
    document.documentElement.style.setProperty('--color-button-start', color_set.color_button_start);
    document.documentElement.style.setProperty('--color-button-end', color_set.color_button_end);
    document.documentElement.style.setProperty('--hue-button', color_set.hue_button);

    /*
    Local styles */
    document.documentElement.style.setProperty('--color-h1-gradient-start', color_set.color_h1_gradient_start);
    document.documentElement.style.setProperty('--color-h1-gradient-end', color_set.color_h1_gradient_end);
}

let color_schemes = [
    new ColorSet("blue", {hue: 200, sat: 70, lgt: 35}),
    new ColorSet("green", {hue: 132, sat: 70, lgt: 35}),
    new ColorSet("violet", {hue: 292, sat: 70, lgt: 35}),
    new ColorSet("pink", {hue: 260, sat: 70, lgt: 35})
]

set_new_color_scheme(color_schemes[3]);

function set_random_color(): Color {
    let random = Math.random();
    let degrees = 360 * random;
    return {hue: degrees, sat: 70, lgt: 35};
}

function copy_color(color: Color): Color {
    return {
        hue: color.hue,
        sat: color.sat,
        lgt: color.lgt,
    }
}

export function activate_randomizer(): void {
    let color_randomizer = document.querySelectorAll(".color_randomizer");

    color_randomizer[0].addEventListener("click", function() {
        let random_colors = set_random_color();
        let colors = new ColorSet("random", random_colors)
        set_new_color_scheme(colors);
        console.log("===============\nColors: " + random_colors + "\n======================")
    })
}
