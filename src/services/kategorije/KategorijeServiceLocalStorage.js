import { PrefixStorage } from "../../constants.js";


function nadiIndexKategorije(sifra) {
    return kategorije.findIndex(kat => kat.sifra === Number(sifra))
}

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.KATEGORIJE);
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
    spremiUStorage(kategorije, PrefixStorage.KATEGORIJE);
    return {data: kategorija};
}

async function promjeni(kategorija) {

    const kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(kategorija.sifra)

    if (kategorijaIndex !== -1) {
        kategorije[kategorijaIndex] = kategorija;
        spremiUStorage(kategorije, PrefixStorage.KATEGORIJE);
    }
    return {data: kategorije[kategorijaIndex]};
}

function obrisiPostignucaKategorije(sifraKategorije) {
    let postignuca = JSON.parse(localStorage.getItem(PrefixStorage.POSTIGNUCA));
    if (postignuca && postignuca.length > 0) {
        postignuca.filter(pos => pos.kategorija !== parseInt(sifraKategorije))
        spremiUStorage(postignuca, PrefixStorage.POSTIGNUCA)
        if (postignuca.length <= 0) {
            localStorage.removeItem(PrefixStorage.POSTIGNUCA)
        }
    }
}

async function obrisi(sifra) {
    let kategorije = dohvatiSveIzStorage();
    kategorije = kategorije.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(kategorije, PrefixStorage.KATEGORIJE);
    obrisiPostignucaKategorije(sifra)
    if (kategorije.length <= 0) {
        localStorage.removeItem(PrefixStorage.KATEGORIJE)
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