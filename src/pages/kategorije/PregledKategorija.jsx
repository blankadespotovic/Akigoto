import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import {Card} from "../../components/Card.jsx";
import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import PostignucaService from "../../services/postignuca/PostignucaService.js";

export default function PregledKategorija() {
    const navigate = useNavigate()

    const [kategorije, setKategorije] = useState([])
    const [postignuca, setPostignuca] = useState([])

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

            {kategorije.length > 0 && <Card
                key={"sve-kategorije"}
                title={"Kategorije"}
                padding={0}
                textAlign={"left"}
            >
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Broj postignuća</th>
                        <th>Akcija</th>
                    </tr>
                    </thead>
                    <tbody>
                    {kategorije.map((kategorija) => {
                        const brojPostignucaUKategoriji = postignuca.filter(pos => pos.kategorija === kategorija.sifra).length;
                        return (
                            <tr key={kategorija.sifra}>
                                <td>{kategorija.naziv}</td>
                                <td style={{minWidth: "250px"}}>{brojPostignucaUKategoriji}</td>
                                <td><Button className="btnEdit" onClick={() => {
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
                        )
                    })}
                    </tbody>
                </Table>
            </Card>}
        </>
    )
}