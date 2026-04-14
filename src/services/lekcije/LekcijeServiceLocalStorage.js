const STORAGE_KEY = "lekcije";


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const lekcije = dohvatiSveIzStorage();
    return { success: true, data: [...lekcije] };
}

async function getBySifra(sifra) {
    const lekcije = dohvatiSveIzStorage();
    const lekcija = lekcije.find(p => p.sifra === parseInt(sifra));
    return { success: true, data: lekcija }
}

async function dodaj(lekcija) {
    let lekcije = dohvatiSveIzStorage();

    if (lekcije.length === 0) {
        lekcija.sifra = 1
    } else {
        lekcija.sifra = lekcije.at(-1).sifra + 1
    }

    lekcije.push(lekcija)
    spremiUStorage(lekcije);
    return { data: lekcija };

}

async function promjeni(lekcija) {

    const lekcije = dohvatiSveIzStorage()
    const index = lekcije.findIndex(u => u.sifra === parseInt(lekcija.sifra))


    if (index !== -1) {
    
    lekcije[index] = lekcija
        
        spremiUStorage(lekcije)
    }
    return { data: lekcija }
}


async function obrisi(sifra) {
    let lekcije = dohvatiSveIzStorage();
    lekcije = lekcije.filter(u => u.sifra !== parseInt(sifra))
    spremiUStorage(lekcije);
    return { message: "Obrisano" };
}

export default {
    dohvatiSveIzStorage,
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}