import { z } from 'zod'

export const ShemaLekcije = z.object({
  naziv: z.string()
    .trim()
    .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Naziv lekcije mora imati najmanje 3 znaka!")
    .max(50, "Naziv lekcije može imati najviše 50 znakova!"),

    opis: z.string()
    .trim()
    .min(1, "Opis je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Opis lekcije mora imati najmanje 10 znaka!")
    .max(50, "Opis lekcije može imati najviše 50 znakova!"),

  trajanje: z.coerce.number({
    invalid_type_error: "Trajanje lekcije mora biti broj!",
  })
    .min(1, "Trajanje lekcije mora biti između 1 i 500 sati!")
    .max(500, "Trajanje lekcije mora biti između 1 i 500 sati!"),

});