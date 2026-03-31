const pocetnaPostignuca = [
    {
        sifra: 1,
        naziv: "Prvi korak",
        opis: "Završi prvu lekciju",
        procjena: 30,
        zavrseno: false,
    },
    {
        sifra: 2,
        naziv: "Hiragana početnik",
        opis: "Nauči 5 znakova",
        procjena: 45,
        zavrseno: true,
    },
    {
        sifra: 3,
        naziv: "Katakana početnik",
        opis: "Nauči 5 znakova katakane",
        procjena: 45,
        zavrseno: false,
    },
   
    /*
    {
        sifra: 7,
        naziv: "Prvih 10 riječi",
        opis: "Nauči 10 riječi",
        procjena: 45,
        zavrseno: false,
    },
    {
        sifra: 8,
        naziv: "Brojevi",
        opis: "Nauči sve brojeve",
        procjena: 20,
        zavrseno: true,
    },

    {
        sifra: 9,
        naziv: "Bez greške",
        opis: "Riješi lekciju bez ijedne greške",
        procjena: 45,
        zavrseno: false,
    },
    {
        sifra: 10,
        naziv: "Brzo učiš!",
        opis: "Završi lekciju za manje od 10 minuta",
        procjena: 10,
        zavrseno: true,
    },
    {
        sifra: 11,
        naziv: "Uči kontinuirano!",
        opis: "Uči 3 dana za redom",
        procjena: 4320,
        zavrseno: false,
    },
    
    {
        sifra: 12,
        naziv: "Prvi kanji",
        opis: "Nauči svoj prvi kanji znak",
        procjena: 25,
        zavrseno: true,
    },
    {
        sifra: 13,
        naziv: "Konnichiwa!",
        opis: "Nauči osnovne japanske pozdrave",
        procjena: 35,
        zavrseno: false,
    },
    {
        sifra: 14,
        naziv: "Mini kviz",
        opis: "Riješi prvi kviz znanja",
        procjena: 15,
        zavrseno: true,
    },
    {
        sifra: 15,
        naziv: "Točan odgovor",
        opis: "Odgovori točno na 10 pitanja zaredom",
        procjena: 15,
        zavrseno: false,
    },
    {
        sifra: 16,
        naziv: "Noćna ptica",
        opis: "Završi lekciju nakon 22 h",
        procjena: 15,
        zavrseno: true,
    },
    {
        sifra: 17,
        naziv: "Tko rano rani...",
        opis: "Započni lekciju prije 8 h",
        procjena: 20,
        zavrseno: false,
    },
    {
        sifra: 18,
        naziv: "Trud se isplati!",
        opis: "Uči 5 dana za redom",
        procjena: 7200,
        zavrseno: true,
    },
    {
        sifra: 19,
        naziv: "Prva rečenica",
        opis: "Sastavi svoju prvu rečenicu",
        procjena: 30,
        zavrseno: false,
    },
    {
        sifra: 20,
        naziv: "Ponovi i savladaj",
        opis: "Ponovi jednu lekciju 3 puta",
        procjena: 40,
        zavrseno: true,
    },
    */
]

const ucenjeIZnanje = [
     {
        sifra: 1,
        naziv: "Hiragana starter",
        opis: "Završi prvi set znakova hiragane",
        procjena: 60,
        zavrseno: true,
    },
    
    {
        sifra: 2,
        naziv: "Katakana starter",
        opis: "Završi prvi set znakova katakane",
        procjena: 60,
        zavrseno: false,
    },
    {
        sifra: 3,
        naziv: "Prva riječ",
        opis: "Nauči 1 riječ",
        procjena: 5,
        zavrseno: true,
    },
]

export const postignuca = [
    {
        sifra: 1,
        kategorija: "Početni napredak",
        postignuca: [...pocetnaPostignuca],
    },
    {
        sifra: 2,
        kategorija: "Učenje i znanje",
        postignuca: [...ucenjeIZnanje],
    }
]