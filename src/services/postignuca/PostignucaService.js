import { postignuca } from "./PostignucaPodaci"

async function get() {
    return { data: postignuca }
}

async function dodaj(postignuce){
    if(postignuca.length===0){
        postignuce.sifra=1
    }else{
        postignuce.sifra = postignuca[postignuca.length -1].sifra +1
    }

    postignuca[0].postignuca.push(postignuce)
}


export default {
    get,
    dodaj
}