import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

async function get() {
    const skupLekcija = collection(getFirebaseDB(), PrefixStorage.LEKCIJE);
    const postignucaSnapshot = await getDocs(skupLekcija);
    return {success: true, data: postignucaSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            sifra: doc.id,
            ...data,
        };
    }) }
}

async function dodaj(lekcija) {
    try {
        const skupLekcija = collection(getFirebaseDB(), PrefixStorage.LEKCIJE);
        const docRef = await addDoc(skupLekcija, lekcija);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}


async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.LEKCIJE, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
          
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...data,
                }
            };
        } else {
            return { 
                success: false, 
                message: "Lekcija s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}


async function promjeni(lekcija) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.LEKCIJE, lekcija.sifra);
        await updateDoc(docRef, lekcija);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}


async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.LEKCIJE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    try {
        const skupLekcija = collection(getFirebaseDB(), PrefixStorage.LEKCIJE);
        let q = query(skupLekcija, orderBy("naziv"));

        const snapshot = await getDocs(q);
        let lekcije = snapshot.docs.map(doc => {
            return {
                sifra: doc.id,
                ...doc.data()
            }
        });

        const totalItems = lekcije.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedData = lekcije.slice(startIndex, startIndex + pageSize);

        return {
            success: true,
            data: paginatedData,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    promjeni,
    getBySifra,
    obrisi,
    getPage
}
