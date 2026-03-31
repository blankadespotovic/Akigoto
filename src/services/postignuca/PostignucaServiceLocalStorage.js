const STORAGE_KEY = "kategorije";

function postaviKategorije() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    if (!podaci) {
        const kategorije = [
            {
                sifra: 1,
                kategorija: "Početni napredak",
                postignuca: [],
            },
            {
                sifra: 2,
                kategorija: "Učenje i znanje",
                postignuca: [],
            }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(kategorije));
    }
}

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

async function getBySifra(kategorija, sifra) {
    const kategorije = dohvatiSveIzStorage();
    const postignuce = kategorije.find(p => p.sifra === parseInt(kategorija)).postignuca.find(pos => pos.sifra === parseInt(sifra));
    return {success: true, data: postignuce}
}

async function dodaj(postignuce) {
    let kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(postignuce.kategorija)

    if (kategorije[kategorijaIndex].postignuca.length === 0) {
        postignuce.sifra = 1
    } else {
        postignuce.sifra = kategorije[kategorijaIndex].postignuca.at(-1).sifra + 1
    }

    kategorije[kategorijaIndex].postignuca.push(postignuce)
    spremiUStorage(kategorije);
    return {data: postignuce};

}

async function promjeni(sifra, postignuce) {

    const kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(sifra)
    const index = nadiIndexPostignuca(kategorijaIndex, postignuce.sifra)

    if (index !== -1) {
        kategorije[kategorijaIndex].postignuca[index] = postignuce;
        spremiUStorage(kategorije);
    }
    return {data: kategorije[kategorijaIndex].postignuca[index]};
}

function nadiIndexKategorije(sifra) {
    const kategorije = dohvatiSveIzStorage();
    return kategorije.findIndex(pos => pos.sifra === Number(sifra));
}

function nadiIndexPostignuca(kateogrijaIndex, sifraPostignuca) {
    const kategorije = dohvatiSveIzStorage();
    return kategorije[kateogrijaIndex].postignuca.findIndex(pos => pos.sifra === sifraPostignuca);
}

async function obrisi(sifra, postignuceSifra) {
    const kategorije = dohvatiSveIzStorage();
    const kategorijaIndex = nadiIndexKategorije(sifra);
    kategorije[kategorijaIndex].postignuca = kategorije[kategorijaIndex].postignuca.filter(s => s.sifra !== parseInt(postignuceSifra));
    spremiUStorage(kategorije);
    return {message: "Obrisano"};
}

export default {
    postaviKategorije,
    dohvatiSveIzStorage,
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}