import {DEFAULT_PAGE_SIZE} from "../../constants";

const STORAGE_KEY = "ucenici";


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const ucenici = dohvatiSveIzStorage();
    return {success: true, data: [...ucenici]};
}

async function getBySifra(sifra) {
    const ucenici = dohvatiSveIzStorage();
    const ucenik = ucenici.find(p => p.sifra === parseInt(sifra));
    return {success: true, data: ucenik}
}

async function getLastFewIds(brojUcenika) {
    const ucenici = dohvatiSveIzStorage()
    const zadnjiUcenici = ucenici.slice(-brojUcenika)
    const zadnjiUceniciIds = zadnjiUcenici.map(u => Number.parseInt(u.sifra))
    return {success: true, data: zadnjiUceniciIds}
}

async function dodaj(ucenik) {
    let ucenici = dohvatiSveIzStorage();

    if (ucenici.length === 0) {
        ucenik.sifra = 1
    } else {
        ucenik.sifra = ucenici.at(-1).sifra + 1
    }

    ucenici.push(ucenik)
    spremiUStorage(ucenici);
    return {data: ucenik};

}

async function promjeni(ucenik, datum, iznos) {

    const ucenici = dohvatiSveIzStorage()
    const index = ucenici.findIndex(u => u.sifra === parseInt(ucenik.sifra))


    if (index !== -1) {
        const uplate = ucenik.uplate
        console.log(uplate, iznos, datum)
        if (iznos && datum) {
            uplate.push({datum, iznos: Number.parseFloat(iznos)})
        }
        ucenik.uplate = uplate
        ucenici[index] = ucenik

        spremiUStorage(ucenici)
    }
    return {data: ucenik}
}


async function obrisi(sifra) {
    let ucenici = dohvatiSveIzStorage();
    ucenici = ucenici.filter(u => u.sifra !== parseInt(sifra))
    spremiUStorage(ucenici);
    return {message: "Obrisano"};
}

async function getPage(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    const ucenici = dohvatiSveIzStorage();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = ucenici.slice(startIndex, endIndex);
    const totalItems = ucenici.length;
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
    getBySifra,
    getLastFewIds,
    dodaj,
    promjeni,
    obrisi,
    getPage
}