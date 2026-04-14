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


export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}