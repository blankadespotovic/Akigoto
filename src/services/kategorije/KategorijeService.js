import KategorijeServiceLocalStorage from "../kategorije/KategorijeServiceLocalStorage.js";
import KategorijeServiceMemorija from "./KategorijeServiceMemorija.js";
import {DATA_SOURCE} from "../../constants.js";

let Servis = null;


switch (DATA_SOURCE) {
    case "memorija":
        Servis = KategorijeServiceMemorija;
        break;
    case "localStorage":
        Servis = KategorijeServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({success: false, data: []}),
    getBySifra: async (kategorija, sifra) => ({success: false, data: {}}),
    dodaj: async (postignuce) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (sifra, postignuce) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra, postignuceSifra) => {
        console.error("Servis nije učitan");
    }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (kategorija) => AktivniServis.dodaj(kategorija),
    promjeni: (sifra, kategorija) => AktivniServis.promjeni(sifra, kategorija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};