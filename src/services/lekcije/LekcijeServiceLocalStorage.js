import { DEFAULT_PAGE_SIZE, PrefixStorage } from "../../constants";


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.LEKCIJE);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.LEKCIJE, JSON.stringify(podaci));
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

async function getPage(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    const lekcije = dohvatiSveIzStorage();
    const startIndex = (page - 1) * pageSize; 
    const endIndex = startIndex + pageSize; 
    const paginatedData = lekcije.slice(startIndex, endIndex);
    const totalItems = lekcije.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        success: true,
        data: paginatedData,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems
    };
}

export default {
    dohvatiSveIzStorage,
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
}