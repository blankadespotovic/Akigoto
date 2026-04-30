import { z } from 'zod'

export const ShemaUcenici = z.object({
  ime: z.string()
    .trim()
    .min(1, "Ime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Ime mora imati najmanje 2 znaka!")
    .max(20, "Ime može imati najviše 20 znakova!"),
    
  prezime: z.string()
    .trim()
    .min(1, "Prezime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Prezime mora imati najmanje 2 znaka!")
    .max(20, "Prezime može imati najviše 20 znakova!"),
    
  email: z.email({ message: "Email nije u ispravnom formatu!" })
    .transform(val => val.trim()),

  iznos: z.coerce.number({
    invalid_type_error: "Iznos mora biti broj!",
  })
    .min(0, "Iznos ne može biti negativan broj!")
    .max(100, "Iznos ne može prelaziti 100€"),

    datum: z.coerce.date({
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_date) {
        return { message: "Molimo unesite ispravan format datuma!" };
      }
      return { message: ctx.defaultError };
    },
    invalid_type_error: "Molimo unesite ispravan format datuma!",
  })
    .refine((odabraniDatum) => {
      const danas = new Date();
      danas.setHours(0, 0, 0, 0);
      return odabraniDatum >= danas;
    }, "Datum uplate ne može biti u prošlosti!")
    
});

