import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import {CustomAlert} from "../../components/CustomAlert.jsx";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {PregledPostignucaTablica} from "./PregledPostignucaTablica.jsx";
import { PregledPostignucaGrid } from "./PregledPostignucaGrid.jsx";
import useLoading from "../../hooks/useLoading.js";

export default function PregledPostignuca() {

    const navigate = useNavigate()
    const sirina = useBreakpoint();
    const [postignuca, setPostignuca] = useState([])
    const [kategorije, setKategorije] = useState([])
    const [brojKategorija, setBrojKategorija] = useState(-1)
    const { showLoading, hideLoading, loading } = useLoading()
    

    const dohvatiSveKategorije = async () => {
        const sveKategorije = await KategorijeService.get()
        const podaciKategorija = sveKategorije.data;
        setKategorije(podaciKategorija)
        setBrojKategorija(podaciKategorija.length)
    }

    useEffect(() => {
        dohvatiSveKategorije()
    }, [])

    async function ucitajPostignuca() {
        showLoading();
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setPostignuca(odgovor.data)
            hideLoading()
        })
    }

    useEffect(() => {
        ucitajPostignuca();
    }, []);

    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) {
            return 
        }
        await PostignucaService.obrisi(sifra)
        await ucitajPostignuca()
        hideLoading()
    }
    
    return !loading && (
        <>
            {brojKategorija < 1 ? (
                <CustomAlert variant={"warning"}>Trenutno nema kategorija. Dodajte kategorije kako bi se omogućio unos
                    postignuća.</CustomAlert>
            ) : (
                <Link to={RouteNames.POSTIGNUCA_NOVA} id="btnAdd"
                      className="btn btnAdd w-100 my-3">
                    Dodavanje novog postignuća
                </Link>
            )}

            {postignuca.length > 0 &&
                (["xs", "sm", "md"].includes(sirina) ? (
                        <PregledPostignucaGrid
                            kategorije={kategorije}
                            postignuca={postignuca}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    ) : (
                        <PregledPostignucaTablica
                            kategorije={kategorije}
                            postignuca={postignuca}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    )
                )}
        </>

    )
}