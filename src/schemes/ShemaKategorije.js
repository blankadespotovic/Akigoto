import {z} from "zod"

export const ShemaKategorije = z.object({
    naziv: z.string()
        .trim()
        .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
        .min(3, "Naziv kategorije mora imati najmanje 3 znaka!")
        .max(50, "Naziv kategorije može imati najviše 50 znakova!"),
});