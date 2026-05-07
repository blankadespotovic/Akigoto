import { PrefixStorage } from "../../constants";

function nadiIndexPostignuca(sifra) {
    const postignuca =  dohvatiSveIzStorage()
    return postignuca.findIndex(pos => pos.sifra === sifra)
}

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(PrefixStorage.POSTIGNUCA);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(PrefixStorage.POSTIGNUCA, JSON.stringify(podaci));
}

async function get() {
    const postignuca = dohvatiSveIzStorage();
    return { success: true, data: [...postignuca] };
}

async function getBySifra(sifra) {
    const postignuca = dohvatiSveIzStorage();
    const postignuce = postignuca.find(p => p.sifra === sifra)
    return { success: true, data: postignuce }
}

async function dodaj(postignuce) {
    const postignuca = dohvatiSveIzStorage()
    if (postignuca.length === 0) {
        postignuce.sifra = '1'
    } else {
        postignuce.sifra = String(parseInt(postignuca[postignuca.length - 1].sifra) + 1)
    }

    postignuca.push(postignuce)
    spremiUStorage(postignuca);
    return { data: postignuce };
}

async function promjeni(postignuce) {

    const postignuca = dohvatiSveIzStorage()
    const index = nadiIndexPostignuca(postignuce.sifra)

    if (index !== -1) {
        postignuca[index] = postignuce
        spremiUStorage(postignuca)
    }
    return { data: postignuce }
}

async function obrisi(sifra) {
    let postignuca = dohvatiSveIzStorage();
    postignuca = postignuca.filter(s => s.sifra !== sifra);
    spremiUStorage(postignuca)
    if (postignuca.length <= 0) {
        localStorage.removeItem(PrefixStorage.POSTIGNUCA)
    }
    return { message: "Obrisano" };
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi
}