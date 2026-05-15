import { useEffect, useState } from "react"
import OperaterService from "../../services/operateri/OperaterService"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint.js";
import OperaterTablica from "./OperaterTablica.jsx";
import { PregledOperateraGrid } from "./PregledOperateraGrid.jsx";

export default function OperaterPregled() {
    const navigate = useNavigate()
    const [operateri, setOperateri] = useState([])
    const sirina = useBreakpoint();

    useEffect(() => {
        document.title = "Operateri, " + IME_APLIKACIJE
    })

    useEffect(() => {
        ucitajOperatere()
    }, [])

    async function ucitajOperatere() {
        await OperaterService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setOperateri(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati operatera?")) return

        const rezultat = await OperaterService.obrisi(sifra)
        if (rezultat.success) {
            ucitajOperatere()
        } else {
            alert(rezultat.message || "Greška pri brisanju")
        }
    }

    return (
        <>
            <Link to={RouteNames.OPERATERI_NOVI}
                className="btn btnAdd w-100 my-3">
                Dodavanje novog operatera
            </Link>
            {operateri.length > 0 &&
                (["xs", "sm", "md"].includes(sirina) ? (
                    <PregledOperateraGrid
                        operateri={operateri}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <OperaterTablica
                        operateri={operateri}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                )
                )}
        </>
    )
}
