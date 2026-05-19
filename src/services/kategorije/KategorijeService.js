import KategorijeServiceLocalStorage from "../kategorije/KategorijeServiceLocalStorage.js";
import KategorijeServiceMemorija from "./KategorijeServiceMemorija.js";
import { DATA_SOURCE } from "../../constants.js";
import KategorijeServiceFireBase from "./KategorijeServiceFireBase.js";

let Servis;


switch (DATA_SOURCE) {
    case "memorija":
        Servis = KategorijeServiceMemorija;
        break;
    case "localStorage":
        Servis = KategorijeServiceLocalStorage;
        break;
    case "firebase":
        Servis = KategorijeServiceFireBase;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (kategorija) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (kategorija) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra) => {
        console.error("Servis nije učitan");
    }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (kategorija) => AktivniServis.dodaj(kategorija),
    promjeni: (kategorija) => AktivniServis.promjeni(kategorija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};