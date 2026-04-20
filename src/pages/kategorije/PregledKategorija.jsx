import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import {useEffect, useState} from "react";
import useBreakpoint from "../../hooks/useBreakpoint"
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import {PregledKategorijaTablica} from "./PregledKategorijaTablica.jsx";
import {PregledKategorijaGrid} from "./PregledKategorijaGrid.jsx";

export default function PregledKategorija() {
    const navigate = useNavigate()
    const sirina = useBreakpoint();

    const [kategorije, setKategorije] = useState([])
    const [postignuca, setPostignuca] = useState([])
    const [kategorijeSPostignucima, setKategorijeSPostignucima] = useState([])

    async function ucitajKategorije() {
        await KategorijeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setKategorije(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajKategorije()
    }, [])

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }

            setPostignuca(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPostignuca()
    }, [])

    useEffect(() => {
        const dohvatiKategorijeSPostignucima = () => {
            const noveKategorije = [];
            for (const kat of kategorije) {
                noveKategorije.push({
                    ...kat,
                    brojPostignuca: postignuca.filter(pos => pos.kategorija === kat.sifra).length
                })
            }
            setKategorijeSPostignucima(noveKategorije);
        }
        dohvatiKategorijeSPostignucima()
    }, [kategorije, postignuca]);

    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?\nOPREZ! Obrisat će se sva postignuća iz kategorije.")) {
            return
        }
        await KategorijeService.obrisi(sifra)
        ucitajKategorije()
    }

    return (
        <>
            <Link to={RouteNames.KATEGORIJE_NOVA} id="btnAdd"
                  className="btn btnAdd w-100 my-3">
                Dodavanje nove kategorije
            </Link>

            {kategorije.length > 0 &&
                (["xs", "sm", "md"].includes(sirina) ? (
                        <PregledKategorijaGrid
                            kategorije={kategorije}
                            postignuca={postignuca}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    ) : (
                    kategorijeSPostignucima && <PregledKategorijaTablica
                            kategorije={kategorijeSPostignucima}
                            postignuca={postignuca}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    )

                )}
        </>
    )
}