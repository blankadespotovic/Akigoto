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
    dodaj: async (ucenik) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (ucenik) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra) => {
        console.error("Servis nije učitan");
    }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getAll: () => AktivniServis.getAll(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (ucenik) => AktivniServis.dodaj(ucenik),
    promjeni: (ucenik) => AktivniServis.promjeni(ucenik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};