import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import UceniciService from "../../services/ucenici/UceniciService.js";
import { PregledUcenikaTablica } from "./PregledUcenikaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { PregledUcenikaGrid } from "./PregledUcenikaGrid.jsx";

export default function PregledUcenika() {

    const navigate = useNavigate()
    const sirina = useBreakpoint();

    const [ucenici, setUcenici] = useState([]);

    async function ucitajUcenike() {
        await UceniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setUcenici(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajUcenike();
    }, []);


    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await UceniciService.obrisi(sifra)
        ucitajUcenike()
    }

    return (

        <>

            <Link to={RouteNames.UCENICI_NOVI} id="btnAdd"
                className="btn btnAdd w-100 my-3">
                Dodavanje novog učenika
            </Link>


            {ucenici.length > 0 &&
                (["xs", "sm", "md"].includes(sirina) ? (
                    <PregledUcenikaGrid
                        ucenici={ucenici}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <PregledUcenikaTablica
                        ucenici={ucenici}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                )

                )

            }
        </>

    )
}