import PostignucaServiceLocalStorage from "./PostignucaServiceLocalStorage";
import PostignucaServiceMemorija from "./PostignucaServiceMemorija";
import {DATA_SOURCE} from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case "memorija":
        Servis = PostignucaServiceMemorija;
        break;
    case "localStorage":
        Servis = PostignucaServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({success: false, data: []}),
    getBySifra: async (sifra) => ({success: false, data: []}),
    dodaj: async (postignuce) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (postignuce) => {
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
    dodaj: (postignuce) => AktivniServis.dodaj(postignuce),
    promjeni: (postignuce) => AktivniServis.promjeni(postignuce),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};