import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import LekcijeService from "../../services/lekcije/LekcijeService.js";
import {DetaljiLekcije} from "../../components/DetaljiLekcije.jsx";
import {PregledLekcijaTablica} from "./PregledLekcijaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {PregledLekcijaGrid} from "./PregledLekcijaGrid.jsx";

export default function PregledLekcija() {

    const navigate = useNavigate()
    const [lekcije, setLekcije] = useState([]);
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
        ucitajLekcije()
    }

    const [modalShow, setModalShow] = useState(false)
    const [podaci, setPodaci] = useState();

    return (

        <>

            <Link to={RouteNames.LEKCIJE_NOVE} id="btnAdd"
                  className="btn btnAdd w-100 my-3">
                Dodavanje nove lekcije
            </Link>


            {lekcije.length > 0 && (
                ["xs", "sm", "md"].includes(sirina) ? (
                    <PregledLekcijaGrid
                        lekcije={lekcije}
                        setPodaci={setPodaci}
                        setModalShow={setModalShow}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <PregledLekcijaTablica
                        lekcije={lekcije}
                        setPodaci={setPodaci}
                        setModalShow={setModalShow}
                        navigate={navigate}
                        obrisi={obrisi}
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