export const IME_APLIKACIJE = 'Akigoto'

export const RouteNames = {
    HOME: '/',
    PROFIL: '/profil',
    POSTIGNUCA: '/postignuca',
    POSTIGNUCA_NOVA: '/postignuca/nova',
    PROMJENA_POSTIGNUCA: '/postignuca/:kategorija/:sifra',

    KATEGORIJE: '/kategorije',
    KATEGORIJE_NOVA: '/kategorije/nova',
    PROMJENA_KATEGORIJE: '/kategorije/:sifra',

    GENERIRANJE_PODATAKA: '/generiraj-podatke',

    UCENICI: '/ucenici',
    UCENICI_NOVI: '/ucenici/novi',
    PROMJENA_UCENIKA: '/ucenici/:sifra',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    LEKCIJE: '/lekcije',
    LEKCIJE_NOVE: '/lekcije/nova',
    PROMJENA_LEKCIJA: '/lekcije/:sifra',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',
}

export const DATA_SOURCES = {
    L: 'localStorage',
    M: 'memorija',
}

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [5, 10, 25, 50]

export const DATA_SOURCE = DATA_SOURCES.L

export const PrefixStorage = {
    POSTIGNUCA: 'postignuca',
    KATEGORIJE: 'kategorije',
    UCENICI: 'ucenici',
    LEKCIJE: 'lekcije',
    OPERATERI: 'operateri'
}