const STORAGE_KEY = "kategorije";

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
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
    kategorija.postignuca = [];
    kategorije.push(kategorija)
    spremiUStorage(kategorije);
    return {data: kategorija};

}

async function promjeni(sifra, kategorija) {

    const kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(sifra)

    if (kategorijaIndex !== -1) {
        kategorija.sifra = Number(sifra);
        kategorija.postignuca = nadiPostignucaZaKategoriju(kategorijaIndex)
        kategorije[kategorijaIndex] = kategorija;
        spremiUStorage(kategorije);
    }
    return {data: kategorije[kategorijaIndex]};
}

function nadiIndexKategorije(sifra) {
    const kategorije = dohvatiSveIzStorage();
    return kategorije.findIndex(pos => pos.sifra === Number(sifra));
}

function nadiPostignucaZaKategoriju(kategorijaIndex) {
    const kategorije = dohvatiSveIzStorage();
    return kategorije[kategorijaIndex].postignuca ?? []
}

async function obrisi(sifra) {
    let kategorije = dohvatiSveIzStorage();
    kategorije = kategorije.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(kategorije);
    if (kategorije.length === 0) {
        localStorage.removeItem(STORAGE_KEY)
    }
    return {message: "Obrisano"};
}

export default {
    dohvatiSveIzStorage,
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}