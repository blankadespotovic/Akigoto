import {DEFAULT_PAGE_SIZE} from "../../constants"
import {ucenici} from "./UceniciPodaci"

async function get() {
    return {success: true, data: [...ucenici]}
}

async function getBySifra(sifra) {
    return {success: true, data: ucenici.find(p => p.sifra === sifra)}
}

async function getLastFewIds(brojUcenika) {
    const zadnjiUcenici = ucenici.slice(-brojUcenika)
    const zadnjiUceniciIds = zadnjiUcenici.map(u => Number.parseInt(u.sifra))
    return {success: true, data: zadnjiUceniciIds}
}

async function dodaj(ucenik) {
    if (ucenici.length === 0) {
        ucenik.sifra = "1"
    } else {
        ucenik.sifra = ucenici.at(-1).sifra + 1
    }

    if (!ucenik.uplate || ucenik.uplate.length < 1) {
        ucenik.uplate = [];
    }

    ucenici.push(ucenik)
}

async function promjeni(ucenik, datum, iznos) {
    const index = ucenici.findIndex(u => u.sifra === ucenik.sifra)
    if (index !== -1) {
        const uplate = ucenik.uplate
        const sljedecaSifra = Math.max(...uplate.map(uplata => Number.parseInt(uplata.sifra))) + 1;
        if (iznos && datum) {
            uplate.push({ sifra: sljedecaSifra, datum, iznos: Number.parseFloat(iznos) })
        }
        ucenik.uplate = uplate
    }
    ucenici[index] = ucenik;
}

async function obrisi(sifra) {
    const index = ucenici.findIndex(u => u.sifra === sifra)
    ucenici.splice(index, 1)
}

async function obrisiUplatu(ucenikSifra, sifra) {
    const ucenik = ucenici.find(u => u.sifra === ucenikSifra)
    const ucenikIndex = ucenici.findIndex(u => u.sifra === ucenikSifra)
    if (ucenik && Array.isArray(ucenik.uplate)) {
        ucenik.uplate = ucenik.uplate.filter(
            t => t.sifra !== sifra
        );
    }
    ucenici[ucenikIndex] = ucenik;
}

async function getPage(page = 1, pageSize = DEFAULT_PAGE_SIZE, vrijednostPretrage = "") {
    let filteredUcenici = [...ucenici];

    if (vrijednostPretrage && vrijednostPretrage.trim() !== "") {
        const lowerVrijednostPretrage = vrijednostPretrage.toLowerCase().trim();
        filteredUcenici = filteredUcenici.filter(ucenik => {
            const ime = (ucenik.ime || "").toLowerCase();
            const prezime = (ucenik.prezime || "").toLowerCase();
            const email = (ucenik.email || "").toLowerCase();

            return ime.includes(lowerVrijednostPretrage) ||
                prezime.includes(lowerVrijednostPretrage) ||
                email.includes(lowerVrijednostPretrage);
        });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredUcenici.slice(startIndex, endIndex);
    const totalItems = filteredUcenici.length;
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
    getLastFewIds,
    dodaj,
    promjeni,
    obrisi,
    obrisiUplatu,
    getPage
}