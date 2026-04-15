export const POS_STORAGE_KEY = "postignuca";

function nadiIndexPostignuca(sifra) {
    const postignuca =  dohvatiSveIzStorage()
    return postignuca.findIndex(pos => pos.sifra === parseInt(sifra))
}

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(POS_STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(POS_STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const postignuca = dohvatiSveIzStorage();
    return { success: true, data: [...postignuca] };
}

async function getBySifra(sifra) {
    const postignuca = dohvatiSveIzStorage();
    const postignuce = postignuca.find(p => p.sifra === parseInt(sifra))
    return { success: true, data: postignuce }
}

async function dodaj(postignuce) {
    const postignuca = dohvatiSveIzStorage()
    if (postignuca.length === 0) {
        postignuce.sifra = 1
    } else {
        postignuce.sifra = postignuca.at(-1).sifra + 1
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
    postignuca = postignuca.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(postignuca)
    if (postignuca.length <= 0) {
        localStorage.removeItem(POS_STORAGE_KEY)
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