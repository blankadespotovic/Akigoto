import { postignuca } from "./PostignucaPodaci"

async function get() {
    return { data: [...postignuca] }
}

async function getBySifra(kategorija,sifra) {
    return { data: postignuca.find(p => p.sifra === parseInt(kategorija)).postignuca.find(pos => pos.sifra === parseInt(sifra)) }
}

async function dodaj(postignuce) {
 const kategorijaIndex = nadiIndexKategorije(postignuce.kategorija)
 if(postignuca[kategorijaIndex].postignuca.length === 0){
    postignuce.sifra = 1
 }else {
    postignuce.sifra = postignuca[kategorijaIndex].postignuca.at(-1).sifra + 1
 }

 postignuca[kategorijaIndex].postignuca.push(postignuce)
}

async function promjeni(sifra, postignuce) {
    const kategorijaIndex = nadiIndexKategorije(sifra)
    const index = nadiIndexPostignuca(kategorijaIndex, postignuce.sifra)
    postignuca[kategorijaIndex].postignuca[index] = postignuce;
}

function nadiIndexKategorije(sifra) {
    return postignuca.findIndex(pos => pos.sifra === Number(sifra));
}

function nadiIndexPostignuca(kateogrijaIndex, sifraPostignuca) {
    return postignuca[kateogrijaIndex].postignuca.findIndex(pos => pos.sifra === sifraPostignuca);
}

async function obrisi(sifra,postignuceSifra){
    const kategorijaIndex = nadiIndexKategorije(sifra)
    const index = nadiIndexPostignuca(kategorijaIndex, postignuceSifra)
    postignuca[kategorijaIndex].postignuca.splice(index,1)
}


export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}