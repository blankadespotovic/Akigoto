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
    
    LEKCIJE: '/lekcije',
    LEKCIJE_NOVE: '/lekcije/nova',
    PROMJENA_LEKCIJA: '/lekcije/:sifra'
}

const L = 'localStorage';
const M = 'memorija';

export const DATA_SOURCE = L