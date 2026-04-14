import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import { Card } from "../../components/Card.jsx";
import LekcijeService from "../../services/lekcije/LekcijeService.js";

export default function PregledLekcija() {

    const navigate = useNavigate()
    const [lekcije, setLekcije] = useState([]);

    async function ucitajLekcije() {
        await LekcijeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setLekcije(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajLekcije();
    }, []);


    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await LekcijeService.obrisi(sifra)
        ucitajLekcije()
    }

    return (

        <>

            <Link to={RouteNames.LEKCIJE_NOVE} id="btnAdd"
                className="btn btnAdd w-100 my-3">
                Dodavanje nove lekcije
            </Link>


            {lekcije.length > 0 &&
                <Card
                    title={'Lekcije'}
                    padding={0}
                    textAlign={'left'}
                >
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Naziv lekcije</th>
                                    <th>Sadržaj lekcije</th>
                                    <th>Očekivano trajanje</th>
                                    <th>Datum pokretanja</th>
                                    <th>Akcija</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lekcije.map((lekcija) => (
                                    <tr key={lekcija.sifra}>
                                        <td>{lekcija.naziv}</td>
                                        <td>{lekcija.opis}</td>
                                        <td>{lekcija.trajanje}</td>
                                        <td>{new Date(lekcija.datumPokretanja).toLocaleDateString('hr-HR')}</td>
                                        <td>
                                            <ButtonGroup className={"d-flex gap-2"}>
                                                <Button className="btnEdit" onClick={() => {
                                                    navigate(`${lekcija.sifra}`)
                                                }}>
                                                    Promijeni
                                                </Button>
                                                <Button className="btnCancel" onClick={() => {
                                                    obrisi(lekcija.sifra)
                                                }}>
                                                    Obriši
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                </Card>

            }
        </>

    )
}