import {postignuca} from "../postignuca/PostignucaPodaci"

async function get() {
    return {success: true, data: [...postignuca]}
}

async function getBySifra(sifra) {
    return {success: true, data: postignuca.find(p => p.sifra === parseInt(sifra))}
}

async function dodaj(kategorija) {

    if (postignuca.length === 0) {
        kategorija.sifra = 1
    } else {
        kategorija.sifra = postignuca.at(-1).sifra + 1
    }
    kategorija.postignuca = []

    postignuca.push(kategorija)
}

async function promjeni(sifra, kategorija) {
    const kategorijaIndex = nadiIndexKategorije(sifra)
    kategorija.postignuca = nadiPostignucaZaKategoriju(kategorijaIndex)
    postignuca[kategorijaIndex] = kategorija
}

function nadiIndexKategorije(sifra) {
    return postignuca.findIndex(pos => pos.sifra === Number(sifra))
}

function nadiPostignucaZaKategoriju(kategorijaIndex) {
    return postignuca[kategorijaIndex].postignuca ?? []
}

async function obrisi(sifra) {
    postignuca.splice(sifra, 1)
}


export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}