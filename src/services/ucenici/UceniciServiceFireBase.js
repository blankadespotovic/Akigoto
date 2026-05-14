import {
    addDoc,
    arrayRemove,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc
} from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import {PrefixStorage} from "../../constants";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupUcenika = collection(getFirebaseDB(), PrefixStorage.UCENICI);
        const snapshot = await getDocs(skupUcenika);
        const data = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        return {success: true, data: data};
    } catch (e) {
        return {success: false, message: e.message};
    }
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.UCENICI, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {success: true, data: {sifra: docSnap.id, ...docSnap.data()}};
        }
        return {success: false, message: "Učenik nije pronađen"};
    } catch (e) {
        return {success: false, message: e.message};
    }
}

// 2/4 Create - dodaj novi
async function dodaj(ucenik) {
    try {
        const skupUcenika = collection(getFirebaseDB(), PrefixStorage.UCENICI);
        if (!ucenik.uplate || ucenik.uplate.length < 1)
            ucenik.uplate = []
        const docRef = await addDoc(skupUcenika, ucenik);
        return {success: true, data: {sifra: docRef.id, ...ucenik}};
    } catch (e) {
        return {success: false, message: e.message};
    }
}

// 3/4 Update - promjeni postojeći
async function promjeni(ucenik, datum, iznos) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.UCENICI, ucenik.sifra);
        const uplate = ucenik.uplate
        const sljedecaSifra = Math.max(...uplate.map(uplata => parseInt(uplata.sifra))) + 1;
        if (iznos && datum) {
            uplate.push({sifra: sljedecaSifra, datum, iznos: Number.parseFloat(iznos)})
        }
        ucenik.uplate = uplate
        await updateDoc(docRef, ucenik);
        return {success: true, data: {...ucenik}};
    } catch (e) {
        return {success: false, message: e.message};
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.UCENICI, sifra);
        await deleteDoc(docRef);
        return {success: true, message: "Uspješno obrisano"};
    } catch (e) {
        return {success: false, message: e.message};
    }
}

async function obrisiUplatu(ucenikSifra, sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.UCENICI, ucenikSifra);
        const ucenik = await getDoc(docRef);
        if (ucenik.exists()) {
            console.log(ucenik.data());
            const uplataToDelete = ucenik.data().uplate.find(t => t.sifra === sifra);
            await updateDoc(docRef, {uplate: arrayRemove(uplataToDelete)});
            return {success: true, data: {...ucenik}};
        }
    } catch (e) {
        return {success: false, message: e.message};
    }
}

/**
 * Straničenje - dohvati stranicu ucenika
 * NAPOMENA: Firestore ne podržava "offset" na način kao SQL ili JS slice.
 * Za pravo serversko straničenje (startAfter) potreban je zadnji dokument prethodne stranice.
 * Ovdje koristimo pojednostavljenu verziju koja dohvaća podatke i filtrira ih.
 */
async function getPage(page = 1, pageSize = 8, searchTerm = "") {
    try {
        const skupUcenika = collection(getFirebaseDB(), PrefixStorage.UCENICI);
        let q = query(skupUcenika, orderBy("prezime"));

        const snapshot = await getDocs(q);
        let ucenici = snapshot.docs.map(doc => {
            return {
                sifra: doc.id,
                ...doc.data()
            }
        });

        // Filtriranje (budući da Firestore ne podržava kompleksni "OR" search na više polja s "includes")
        if (searchTerm && searchTerm.trim() !== "") {
            const lowerSearchTerm = searchTerm.toLowerCase().trim();
            ucenici = ucenici.filter(u =>
                (u.ime || "").toLowerCase().includes(lowerSearchTerm) ||
                (u.prezime || "").toLowerCase().includes(lowerSearchTerm) ||
                (u.email || "").toLowerCase().includes(lowerSearchTerm)
            );
        }

        const totalItems = ucenici.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedData = ucenici.slice(startIndex, startIndex + pageSize);

        return {
            success: true,
            data: paginatedData,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        };
    } catch (e) {
        return {success: false, message: e.message};
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    obrisiUplatu,
    getPage
};