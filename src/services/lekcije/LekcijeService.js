import LekcijeServiceLocalStorage from "./LekcijeServiceLocalStorage";
import LekcijeServiceMemorija from "./LekcijeServiceMemorija";
import { DATA_SOURCE } from "../../constants";
import LekcijeServiceFireBase from "./LekcijeServiceFireBase";

let Servis = null;


switch (DATA_SOURCE) {
    case "memorija":
        Servis = LekcijeServiceMemorija;
        break;
    case "localStorage":
        Servis = LekcijeServiceLocalStorage;
        break;
    case "firebase":
        Servis = LekcijeServiceFireBase;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: [] }),
    getAll: async () => ({ success: false, data: [] }),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (lekcija) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (lekcija) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra) => {
        console.error("Servis nije učitan");
    },
    getPage: async (page, pageSize) => {
        console.error("Servis nije učitan");
    }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (lekcija) => AktivniServis.dodaj(lekcija),
    promjeni: (lekcija) => AktivniServis.promjeni(lekcija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
    getPage: (page, pageSize) => AktivniServis.getPage(page, pageSize)
};