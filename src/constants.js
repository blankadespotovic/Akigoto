export const IME_APLIKACIJE = "Akigoto"

export const RouteNames = {
    HOME: "/",
    POSTIGNUCA: "/postignuca",
    POSTIGNUCA_NOVA: "/postignuca/nova",
    PROMJENA_POSTIGNUCA: "/postignuca/:kategorija/:sifra",

    KATEGORIJE: "/kategorije",
    KATEGORIJE_NOVA: "/kategorije/nova",
    PROMJENA_KATEGORIJE: "/kategorije/:sifra",

    GENERIRANJE_PODATAKA: "/generiraj-podatke",

    UCENICI: "/ucenici",
    UCENICI_NOVI: "/ucenici/novi",
    PROMJENA_UCENIKA: "/ucenici/:sifra",

    OPERATERI: "/operateri",
    OPERATERI_NOVI: "/operateri/novi",
    OPERATERI_PROMJENA: "/operateri/:sifra",
    OPERATERI_PROMJENA_LOZINKE: "/operateri/:sifra/lozinka",

    LEKCIJE: "/lekcije",
    LEKCIJE_NOVE: "/lekcije/nova",
    PROMJENA_LEKCIJA: "/lekcije/:sifra",

    LOGIN: "/login",
    REGISTRACIJA: "/registracija",

    NADZORNA_PLOCA: "/nadzorna-ploca",
}

export const DATA_SOURCES = {
    L: "localStorage",
    M: "memorija",
    F: "firebase"
}

export const ULOGE = {
    ADMIN: "admin",
    KORISNIK: "korisnik",
}

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [5, 10, 25, 50]

export const DATA_SOURCE = localStorage.getItem("dataSource") || DATA_SOURCES.F;

export const PrefixStorage = {
    POSTIGNUCA: "e32.postignuca",
    KATEGORIJE: "e32.kategorije",
    UCENICI: "e32.ucenici",
    LEKCIJE: "e32.lekcije",
    OPERATERI: "e32.operateri"
}