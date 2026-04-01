import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import {Card} from "../../components/Card.jsx";
import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import KategorijeService from "../../services/kategorije/KategorijeService.js";

export default function PregledKategorija() {
    const navigate = useNavigate()

    const [kategorije, setKategorije] = useState([])

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
        ucitajKategorije();
    }, [])


    async function obrisi(kategorija) {
        if (!confirm("Sigurno obrisati?")) {
            return
        }
        const kategorijaIndex = kategorija - 1;
        await KategorijeService.obrisi(kategorijaIndex)
        ucitajKategorije()
    }

    return (
        <>
            <Link to={RouteNames.KATEGORIJE_NOVA} id="btnAdd"
                  className="btn btnAdd w-100 my-3">
                Dodavanje nove kategorije
            </Link>
            <Card
                key={"sve-kategorije"}
                title={"Kategorije"}
                padding={0}
                textAlign={"left"}
            >
                {kategorije.length > 0 ? (
                    <Table striped hover responsive>
                        <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Broj postignuća</th>
                            <th>Akcija</th>
                        </tr>
                        </thead>
                        <tbody>
                        {kategorije.map((kategorija) => (
                            <tr key={kategorija.sifra}>
                                <td>{kategorija.kategorija}</td>
                                <td style={{minWidth: "250px"}}>{kategorija?.postignuca?.length}</td>
                                <td><Button onClick={() => {
                                    navigate(`/kategorije/${kategorija.sifra}`)
                                }}>
                                    Promijeni kategoriju
                                </Button>
                                    &nbsp;&nbsp;
                                    <Button className="btnCancel" onClick={() => {
                                        obrisi(kategorija.sifra)
                                    }}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (<div style={{margin: "1rem"}}>Nema podataka</div>)}
            </Card>
        </>
    )
}