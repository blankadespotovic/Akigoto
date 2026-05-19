import {z} from "zod"

export const ShemaPostignuca = z.object({
    naziv: z.string()
        .trim()
        .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
        .min(3, "Naziv postignuća mora imati najmanje 3 znaka!")
        .max(50, "Naziv postignuća može imati najviše 50 znakova!"),

    opis: z.string()
        .trim()
        .min(1, "Opis je obavezan i ne smije sadržavati samo razmake!")
        .min(3, "Opis postignuća mora imati najmanje 10 znaka!")
        .max(50, "Opis postignuća može imati najviše 50 znakova!"),

    procjena: z.coerce.number({
        invalid_type_error: "Vremenska procjena dolaska do postignuća mora biti broj!",
    })
        .min(1, "Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!")
        .max(500, "Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!"),
});


