
class ColorSet {
    constructor(name, color_base) {
        this.base_hue = color_base[0];
        this.base_sat = color_base[1];
        this.base_lgt = color_base[2];

        this.name = name;
        this.color_primary = this.convert_array_to_hsl(color_base);
        this.color_primary_gradient = this.get_gradient_hsl(color_base)
        this.color_border = this.get_border_hsl(color_base)
        this.color_button_fill = this.get_button_fill_hsl(color_base)
        this.color_background = this.get_background_color_hsl(color_base);
        this.color_background_2 = this.get_color_background_2();
        this.color_text = this.get_color_text_hsl(color_base);
        this.hue_button = (color_base[0] - 30) + "deg"
        this.color_button_start = this.get_color_button_start(color_base);
        this.color_button_end = this.get_color_button_end(color_base)

        this.color_h1_gradient_start = this.get_color_h1_gradient_start();
        this.color_h1_gradient_end = this.get_color_h1_gradient_end();
    }

    get_color_background_2() {
        let hue = this.base_hue;
        let sat = this.base_sat;
        let lgt = this.increase_lightness_limited(60) -1;
        return this.convert_array_to_hsl([hue, sat, lgt]);
    }

    decrease_lightness(dec) {
        let lgt = this.base_lgt - dec;
        if (lgt < 0) {
            return 0;
        } else {
            return lgt;
        }
    }

    get_color_h1_gradient_start(color_base) {
        let hue = this.increase_degrees(this.base_hue, 10);
        let sat = this.base_sat;
        let lgt = this.increase_lightness_limited(58);
        return this.convert_array_to_hsl([hue, sat, lgt]);
    }


    get_color_h1_gradient_end(color_base) {
        let hue = this.increase_degrees(this.base_hue, 40);
        let sat = this.base_sat;
        let lgt = this.increase_lightness_limited(55);
        return this.convert_array_to_hsl([hue, sat, lgt]);
    }

    get_color_button_end(array) {
        let hue = array[0] + 30;
        let saturation = 60;
        let lightness = 85;
        return this.convert_array_to_hsl([hue, saturation, lightness])
    }

    get_color_button_start(array) {
        let hue = this.increase_degrees(array[0], -30);
        let saturation = 50;
        let lightness = 90;
        return this.convert_array_to_hsl([hue, saturation, lightness]);
    }

    get_color_text_hsl(array) {
        return this.convert_array_to_hsl([array[0], array[1], this.increase_lightness_overspill(70)])
    }

    get_background_color_hsl(array) {
        return this.convert_array_to_hsl([array[0], array[1], this.increase_lightness_limited( 60)])
    }

    get_gradient_hsl(array) {
        return this.convert_array_to_hsl([this.increase_degrees(array[0], 50), array[1], this.increase_lightness_limited(20)])
    }

    get_border_hsl(array) {
        return this.convert_array_to_hsl([array[0], array[1], this.increase_lightness_limited(25)])
    }

    get_button_fill_hsl(array) {
        return this.convert_array_to_hsl([array[0], array[1], this.increase_lightness_overspill(60)])
    }

    convert_array_to_hsl(array) {
        return "hsl(" + array[0] + "deg, " + array[1] + "%, " + array[2] + "%)";
    }

    increase_degrees(drg, inc) {
        let degrees = drg + inc;
        if (degrees < 360) {
            return degrees;
        } else {
            return degrees - 360;
        }
    }

    increase_lightness_overspill(inc) {
        let lgt = this.base_lgt + inc;
        if(lgt > 100) {
            return (lgt - 100);
        } else {
            return lgt;
        }
    }

    increase_lightness_limited(inc) {
        let lgt = this.base_lgt + inc;
        if (lgt < 95) {
            return lgt;
        } else {
            return 95;
        }
    }
}

function set_new_color_scheme(color_set) {
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
    new ColorSet("blue",[200, 70, 35]),
    new ColorSet("green", [132, 70, 35]),
    new ColorSet("violet", [292, 70, 35]),
    new ColorSet("pink", [260, 70, 35])
]

set_new_color_scheme(color_schemes[3]);

function set_random_color() {
    let random = Math.random();
    let degrees = 360 * random;
    return [degrees, 70, 35];
}



function activate_randomizer() {
    let color_randomizer = document.querySelectorAll(".color_randomizer");

    color_randomizer[0].addEventListener("click", function() {
        let random_colors = set_random_color();
        let colors = new ColorSet("random", random_colors)
        set_new_color_scheme(colors);
        console.log("===============\nColors: " + random_colors + "\n======================")
    })
}