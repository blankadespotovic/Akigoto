import { postignuca } from "./PostignucaPodaci"

async function get() {
    return { data: [...postignuca] }
}

async function getBySifra(kategorija,sifra) {
    return { data: postignuca.find(p => p.sifra === parseInt(kategorija)).postignuca.find(pos => pos.sifra === sifra) }
}

async function dodaj(postignuce) {
    if (postignuca.length === 0) {
        postignuce.sifra = 1
    } else {
        postignuce.sifra = postignuca[postignuca.length - 1].sifra + 1
    }

    postignuca[0].postignuca.push(postignuce)
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


export default {
    get,
    dodaj,
    getBySifra,
    promjeni
}