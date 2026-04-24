import { ucenici } from "./UceniciPodaci"


async function get() {
    return { success: true, data: [...ucenici] }
}

async function getBySifra(sifra) {
    return { success: true, data: ucenici.find(p => p.sifra === parseInt(sifra)) }
}

async function dodaj(ucenik) {
 if(ucenici.length === 0){
    ucenik.sifra = 1
 }else {
    ucenik.sifra = ucenici.at(-1).sifra + 1
 }

 ucenici.push(ucenik)
}

async function promjeni(ucenik) {
    const index = ucenici.findIndex(u => u.sifra === parseInt(ucenik.sifra))
    ucenici[index] = ucenik;
}

async function obrisi(sifra){
    const index = ucenici.findIndex(u => u.sifra === parseInt(sifra))
    ucenici.splice(index,1)
}

async function obrisiUplatu(ucenikSifra, sifra) {
    const ucenik = ucenici.find(u => u.sifra === parseInt(ucenikSifra))
    if (ucenik && Array.isArray(ucenik.uplate)) {
        ucenik.uplate = ucenik.uplate.filter(
            t => t.sifra !== parseInt(sifra)
        );
    }
    ucenici[parseInt(ucenikSifra)] = ucenik;
}

async function getPage(page = 1, pageSize = 8){
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
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    obrisiUplatu,
    getPage
}