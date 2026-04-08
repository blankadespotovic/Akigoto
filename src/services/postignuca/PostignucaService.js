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
    getBySifra: async (kategorija, sifra) => ({success: false, data: {}}),
    dodaj: async (postignuce) => {
        console.error("Servis nije učitan");
    },
    promjeni: async (sifra, postignuce, novaKategorija) => {
        console.error("Servis nije učitan");
    },
    obrisi: async (sifra, postignuceSifra) => {
        console.error("Servis nije učitan");
    }
};


const AktivniServis = Servis || PrazanServis;

export default {
    postaviKategorije: () => AktivniServis.postaviKategorije(),
    get: () => AktivniServis.get(),
    getBySifra: (kategorija, sifra) => AktivniServis.getBySifra(kategorija, sifra),
    dodaj: (postignuce) => AktivniServis.dodaj(postignuce),
    promjeni: (sifra, postignuce, novaKategorija) => AktivniServis.promjeni(sifra, postignuce, novaKategorija),
    obrisi: (sifra, postignuceSifra) => AktivniServis.obrisi(sifra, postignuceSifra)
};