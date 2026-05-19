import {kategorije} from "./KategorijePodaci.js";
import {postignuca} from "../postignuca/PostignucaPodaci.js";

function nadiIndexKategorije(sifra) {
    return kategorije.findIndex(kat => kat.sifra === sifra)
}

async function get() {
    return {success: true, data: [...kategorije]}
}

async function getBySifra(sifra) {
    return {success: true, data: kategorije.find(p => p.sifra === sifra)}
}

async function dodaj(kategorija) {
    if (kategorije.length === 0) {
        kategorija.sifra = "1"
    } else {
        kategorija.sifra = String(Number.parseInt(kategorije.at(-1).sifra) + 1)
    }
    kategorije.push(kategorija)
}

async function promjeni(kategorija) {
    const kategorijaIndex = nadiIndexKategorije(kategorija.sifra)
    kategorije[kategorijaIndex] = kategorija
}

function obrisiPostignucaKategorije(sifraKategorije) {
    const postignucaKategorije = postignuca
        .filter(pos => pos.kategorija === sifraKategorije)
        .map(() => postignuca.findIndex(pos => pos.kategorija === sifraKategorije))
    for (const sifra of postignucaKategorije) {
        postignuca.splice(sifra, 1)
    }
}

async function obrisi(sifra) {
    let kategorijaIndex = nadiIndexKategorije(sifra)
    obrisiPostignucaKategorije(sifra)
    kategorije.splice(kategorijaIndex, 1)
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi
}