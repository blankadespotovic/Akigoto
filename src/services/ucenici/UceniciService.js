import UceniciServiceLocalStorage from "./UceniciServiceLocalStorage";
import UceniciServiceMemorija from "./UceniciServiceMemorija";
import {DATA_SOURCE} from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case "memorija":
        Servis = UceniciServiceMemorija;
        break;
    case "localStorage":
        Servis = UceniciServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({success: false, data: []}),
    getAll: async () => ({success: false, data: []}),
    getBySifra: async (sifra) => ({success: false, data: {}}),
    getLastFewIds: async (brojUcenika) => ({success: false, data: []}),
    dodaj: async (ucenik) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (ucenik, datum, iznos) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra) => {
        console.error("Servis nije učitan");
    },
    obrisiUplatu: async (ucenikSifra, sifra) => {
        console.error("Servis nije učitan");
    },
    getPage: async (page, pageSize, vrijednostPretrage) => ({ success: false, data: [], totalPages: 0, totalItems: 0 })
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getAll: () => AktivniServis.getAll(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    getLastFewIds: (brojUcenika) => AktivniServis.getLastFewIds(brojUcenika),
    dodaj: (ucenik) => AktivniServis.dodaj(ucenik),
    promjeni: (ucenik, datum, iznos) => AktivniServis.promjeni(ucenik, datum, iznos),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
    obrisiUplatu: (ucenikSifra, sifra) => AktivniServis.obrisiUplatu(ucenikSifra, sifra),
    getPage: (page, pageSize, vrijednostPretrage) => AktivniServis.getPage(page, pageSize, vrijednostPretrage)
};