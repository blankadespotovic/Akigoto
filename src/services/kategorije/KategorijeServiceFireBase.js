import { collection, doc, updateDoc,getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

async function get() {
    const skupKategorija = collection(getFirebaseDB(), PrefixStorage.KATEGORIJE);
    const kategorijeSnapshot = await getDocs(skupKategorija);
    return {success: true, data: kategorijeSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            sifra: doc.id,
            ...data,
        };
    }) }
}

async function dodaj(kategorija) {
    try {
        const skupKategorija = collection(getFirebaseDB(), PrefixStorage.KATEGORIJE);
        const docRef = await addDoc(skupKategorija, kategorija);
        
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
        const docRef = doc(getFirebaseDB(), PrefixStorage.KATEGORIJE, sifra);
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
                message: "Kategorija s tom šifrom ne postoji u bazi." 
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


async function promjeni(kategorija) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.KATEGORIJE, kategorija.sifra);
        await updateDoc(docRef, kategorija);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}


async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.KATEGORIJE, sifra);
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

export default {
    get,
    dodaj,
    promjeni,
    getBySifra,
    obrisi
}
