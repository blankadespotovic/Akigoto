import {postignuca} from "./PostignucaPodaci"


function nadiIndexPostignuca(sifra) {
    return postignuca.findIndex(pos => pos.sifra === sifra)
}

async function get() {
    return {success: true, data: [...postignuca]}
}

async function getBySifra(sifra) {
    return {success: true, data: postignuca.find(p => p.sifra === sifra)}
}

async function dodaj(postignuce) {
    if (postignuca.length === 0) {
        postignuce.sifra = '1'
    } else {
        postignuce.sifra = String(parseInt(postignuca[postignuca.length - 1].sifra) + 1)
    }

    postignuca.push(postignuce)
}

async function promjeni(postignuce) {
    const index = nadiIndexPostignuca(postignuce.sifra)
    postignuca[index] = postignuce;
}

async function obrisi(sifra) {
    const index = nadiIndexPostignuca(sifra)
    postignuca.splice(index, 1)
}


export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi
}