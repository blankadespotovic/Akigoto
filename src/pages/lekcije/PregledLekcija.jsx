import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import LekcijeService from "../../services/lekcije/LekcijeService.js";
import {DetaljiLekcije} from "../../components/DetaljiLekcije.jsx";
import {PregledLekcijaTablica} from "./PregledLekcijaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {PregledLekcijaGrid} from "./PregledLekcijaGrid.jsx";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import {CustomAlert} from "../../components/CustomAlert.jsx";
import LekcijPDFGenerator from "../../components/LekcijaPDFGenerator.jsx";
import UceniciService from "../../services/ucenici/UceniciService.js";

export default function PregledLekcija() {

    const [lekcije, setLekcije] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const [podaci, setPodaci] = useState()
    const [poruka, setPoruka] = useState(null)
    const sirina = useBreakpoint()

    async function ucitajLekcije() {
        await LekcijeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setLekcije(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajLekcije();
    }, []);

    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) {
            return
        }
        await LekcijeService.obrisi(sifra)
        await ucitajLekcije()
    }

    async function generirajPDFZaLekciju(lekcija) {
        // Dohvati postignuća
        const postignucaIds = lekcija.postignuca
        const postignucaLekcije = []
        for (const sifraPostignuca of postignucaIds) {
            try {
                const dohvacenoPostignuce = await PostignucaService.getBySifra(sifraPostignuca)
                postignucaLekcije.push(dohvacenoPostignuce.data)
            } catch (error) {
                setPoruka({
                    tip: "danger",
                    tekst: "Greška pri dohvaćanju postignuća: " + error.message
                });
            }
        }

        // Dohvati učenike
        const uceniciIds = lekcija.ucenici
        const uceniciLekcije = []
        for (const sifraUcenik of uceniciIds) {
            try {
                const dohvaceniUcenik = await UceniciService.getBySifra(sifraUcenik)
                uceniciLekcije.push(dohvaceniUcenik.data)
            } catch (error) {
                setPoruka({
                    tip: "danger",
                    tekst: "Greška pri dohvaćanju učenika: " + error.message
                });
            }
        }

        const generiraj = LekcijPDFGenerator({
            lekcija,
            postignuca: postignucaLekcije,
            ucenici: uceniciLekcije
        })
        await generiraj()
    }

    return (

        <>

            <Link to={RouteNames.LEKCIJE_NOVE} id="btnAdd"
                  className="btn btnAdd w-100 my-3">
                Dodavanje nove lekcije
            </Link>
            {poruka && (
                <CustomAlert variant={poruka.tip} className={"mt-2 mb-0"} dismissible
                             onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </CustomAlert>
            )}


            {lekcije.length > 0 && (
                ["xs", "sm", "md"].includes(sirina) ? (
                    <PregledLekcijaGrid
                        lekcije={lekcije}
                        setPodaci={setPodaci}
                        setModalShow={setModalShow}
                        obrisi={obrisi}
                        generirajPDFZaLekciju={generirajPDFZaLekciju}
                    />
                ) : (
                    <PregledLekcijaTablica
                        lekcije={lekcije}
                        setPodaci={setPodaci}
                        setModalShow={setModalShow}
                        obrisi={obrisi}
                        generirajPDFZaLekciju={generirajPDFZaLekciju}
                    />
                )
            )
            }
            <DetaljiLekcije
                show={modalShow}
                onHide={() => setModalShow(false)}
                podaci={podaci}
            />
        </>

    )
}