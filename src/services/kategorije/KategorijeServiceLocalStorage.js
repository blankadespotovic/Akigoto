import {kategorije} from "./KategorijePodaci.js";
import {POS_STORAGE_KEY} from "../postignuca/PostignucaServiceLocalStorage.js";

const STORAGE_KEY = "kategorije";

function nadiIndexKategorije(sifra) {
    return kategorije.findIndex(kat => kat.sifra === Number(sifra))
}

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci, key) {
    localStorage.setItem(key, JSON.stringify(podaci));
}

async function get() {
    const kategorije = dohvatiSveIzStorage();
    return {success: true, data: [...kategorije]};
}

async function getBySifra(sifra) {
    const kategorije = dohvatiSveIzStorage();
    const dohvacenaKategorija = kategorije.find(p => p.sifra === parseInt(sifra));
    return {success: true, data: dohvacenaKategorija}
}

async function dodaj(kategorija) {
    let kategorije = dohvatiSveIzStorage();

    if (kategorije.length === 0) {
        kategorija.sifra = 1
    } else {
        kategorija.sifra = kategorije.at(-1).sifra + 1
    }
    kategorije.push(kategorija)
    spremiUStorage(kategorije, STORAGE_KEY);
    return {data: kategorija};
}

async function promjeni(kategorija) {

    const kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(kategorija.sifra)

    if (kategorijaIndex !== -1) {
        kategorije[kategorijaIndex] = kategorija;
        spremiUStorage(kategorije, STORAGE_KEY);
    }
    return {data: kategorije[kategorijaIndex]};
}

function obrisiPostignucaKategorije(sifraKategorije) {
    let postignuca = JSON.parse(localStorage.getItem(POS_STORAGE_KEY));
    if (postignuca && postignuca.length > 0) {
        postignuca.filter(pos => pos.kategorija !== parseInt(sifraKategorije))
        spremiUStorage(postignuca, POS_STORAGE_KEY)
        if (postignuca.length <= 0) {
            localStorage.removeItem(POS_STORAGE_KEY)
        }
    }
}

async function obrisi(sifra) {
    let kategorije = dohvatiSveIzStorage();
    kategorije = kategorije.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(kategorije, STORAGE_KEY);
    obrisiPostignucaKategorije(sifra)
    if (kategorije.length <= 0) {
        localStorage.removeItem(STORAGE_KEY)
    }
    return {message: "Obrisano"};
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}