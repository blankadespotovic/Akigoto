const pocetnaPostignuca = [
    {
        sifra: "pocetno-1",
        naziv: "Prvi korak",
        opis: "Završi prvu lekciju",
        procjena: "30 min",
        zavrseno: false,
    },
    {
        sifra: "pocetno-2",
        naziv: "Kana početnik",
        opis: "Nauči 5 znakova hiragane ili katakane",
        procjena: "45 min",
        zavrseno: true,
    },
    {
        sifra: "pocetno-3",
        naziv: "Hiragana starter",
        opis: "Završi prvi set znakova hiragane",
        procjena: "1 h",
        zavrseno: false,
    },
    {
        sifra: "pocetno-4",
        naziv: "Prva riječ",
        opis: "Nauči 1 riječ",
        procjena: "15 min",
        zavrseno: true,
    },
]

export const postignuca = [
    {
        sifra: 1,
        kategorija: "Početni napredak",
        postignuca: pocetnaPostignuca,
    },
    {
        sifra: 2,
        kategorija: "Učenje i znanje",
        postignuca: [],
    }
]