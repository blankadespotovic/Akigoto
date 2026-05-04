import { z } from 'zod'
import { ShemaUcenici } from './ShemaUcenici';

export const ShemaUceniciP = ShemaUcenici.extend({
iznos: z.coerce.number({
    invalid_type_error: "Iznos mora biti broj!",
  })
    .min(0, "Iznos ne može biti negativan broj!")
    .max(100, "Iznos ne može prelaziti 100€"),

    datum: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.coerce
            .date({
                errorMap: (issue, ctx) => {
                    if (issue.code === z.ZodIssueCode.invalid_date) {
                        return {message: "Molimo unesite ispravan format datuma!"};
                    }
                    return {message: ctx.defaultError};
                },
                invalid_type_error: "Molimo unesite ispravan format datuma!",
            })
            .refine((odabraniDatum) => {
                const danas = new Date();
                danas.setHours(0, 0, 0, 0);
                return odabraniDatum >= danas;
            }, "Datum uplate ne može biti u prošlosti!")
        .optional()
    )

});