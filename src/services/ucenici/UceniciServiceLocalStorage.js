import { DEFAULT_PAGE_SIZE, PrefixStorage } from "../../constants";


function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.UCENICI);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.UCENICI, JSON.stringify(podaci));
}

async function get() {
    const ucenici = dohvatiSveIzStorage();
    return { success: true, data: [...ucenici] };
}

async function getBySifra(sifra) {
    const ucenici = dohvatiSveIzStorage();
    const ucenik = ucenici.find(p => p.sifra === sifra);
    return { success: true, data: ucenik }
}

async function getLastFewIds(brojUcenika) {
    const ucenici = dohvatiSveIzStorage()
    const zadnjiUcenici = ucenici.slice(-brojUcenika)
    const zadnjiUceniciIds = zadnjiUcenici.map(u => Number.parseInt(u.sifra))
    return { success: true, data: zadnjiUceniciIds }
}

async function dodaj(ucenik) {
    let ucenici = dohvatiSveIzStorage();

    if (ucenici.length === 0) {
        ucenik.sifra = '1'
    } else {
        ucenik.sifra = String(parseInt(ucenici[ucenici.length - 1].sifra) + 1)
    }

    ucenik.uplate = ucenik?.uplate?.length > 0? ucenik.uplate: [];

    ucenici.push(ucenik)
    spremiUStorage(ucenici);
    return { data: ucenik };

}

async function promjeni(ucenik, datum, iznos) {

    const ucenici = dohvatiSveIzStorage()
    const index = ucenici.findIndex(u => u.sifra === ucenik.sifra)


    if (index !== -1) {
        const uplate = ucenik.uplate
        const sljedecaSifra = Math.max(...uplate.map(uplata => parseInt(uplata.sifra))) + 1;
        if (iznos && datum) {
            uplate.push({ sifra: sljedecaSifra, datum, iznos: Number.parseFloat(iznos) })
        }
        ucenik.uplate = uplate
        ucenici[index] = ucenik

        spremiUStorage(ucenici)
    }
    return { data: ucenik }
}


async function obrisi(sifra) {
    let ucenici = dohvatiSveIzStorage();
    ucenici = ucenici.filter(u => u.sifra !== sifra)
    spremiUStorage(ucenici);
    return { message: "Obrisano" };
}

async function obrisiUplatu(ucenikSifra, sifra) {
    let ucenici = dohvatiSveIzStorage();
    const ucenik = ucenici.find(u => u.sifra === ucenikSifra)

    if (ucenik && Array.isArray(ucenik.uplate)) {
        ucenik.uplate = ucenik.uplate.filter(
            t => t.sifra !== sifra
        );
    }
    spremiUStorage(ucenici);
    return { message: "Obrisano" };
}

async function getPage(page = 1, pageSize = DEFAULT_PAGE_SIZE, vrijednostPretrage = "") {
    let ucenici = dohvatiSveIzStorage();

 if (vrijednostPretrage && vrijednostPretrage.trim() !== '') {
        const lowerVrijednostPretrage = vrijednostPretrage.toLowerCase().trim();
        ucenici = ucenici.filter(ucenik => {
            const ime = (ucenik.ime || '').toLowerCase();
            const prezime = (ucenik.prezime || '').toLowerCase();
            const email = (ucenik.email || '').toLowerCase();
            
            return ime.includes(lowerVrijednostPretrage) ||
                   prezime.includes(lowerVrijednostPretrage) ||
                   email.includes(lowerVrijednostPretrage);
        });
    }


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
    obrisiUplatu,
    getPage
}