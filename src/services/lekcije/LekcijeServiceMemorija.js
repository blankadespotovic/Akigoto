import { lekcije } from "./LekcijePodaci"


async function get() {
    return { success: true, data: [...lekcije] }
}

async function getBySifra(sifra) {
    return { success: true, data: lekcije.find(p => p.sifra === parseInt(sifra)) }
}

async function dodaj(lekcija) {
 if(lekcije.length === 0){
    lekcija.sifra = 1
 }else {
    lekcija.sifra = lekcije.at(-1).sifra + 1
 }

 lekcije.push(lekcija)
}

async function promjeni(lekcija) {
    const index = lekcije.findIndex(l => l.sifra === parseInt(lekcija.sifra))
    lekcije[index] = lekcija;
}

async function obrisi(sifra){
    const index = lekcije.findIndex(l => l.sifra === parseInt(sifra))
    lekcije.splice(index,1)
}


export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}