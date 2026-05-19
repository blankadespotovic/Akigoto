import {lekcije} from "./LekcijePodaci"
import {DEFAULT_PAGE_SIZE} from "../../constants.js";

async function get() {
    return {success: true, data: [...lekcije]}
}

async function getBySifra(sifra) {
    return {success: true, data: lekcije.find(p => p.sifra === sifra)}
}

async function dodaj(lekcija) {
    if (lekcije.length === 0) {
        lekcija.sifra = "1"
    } else {
        lekcija.sifra = String(Number.parseInt(lekcije.at(-1).sifra) + 1)
    }

    lekcije.push(lekcija)
}

async function promjeni(lekcija) {
    const index = lekcije.findIndex(l => l.sifra === lekcija.sifra)
    lekcije[index] = lekcija;
}

async function obrisi(sifra) {
    const index = lekcije.findIndex(l => l.sifra === sifra)
    lekcije.splice(index, 1)
}

async function getPage(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
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
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi,
    getPage
}