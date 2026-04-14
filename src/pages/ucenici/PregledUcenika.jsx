import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import { Card } from "../../components/Card.jsx";
import UceniciService from "../../services/ucenici/UceniciService.js";

export default function PregledUcenika() {

    const navigate = useNavigate()
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
                <Card
                    title={'Lista učenika'}
                    padding={0}
                    textAlign={'left'}
                >
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Prezime</th>
                                    <th>E-mail adresa</th>
                                    <th>Akcija</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ucenici.map((ucenik) => (
                                    <tr key={ucenik.sifra}>
                                        <td>{ucenik.ime}</td>
                                        <td>{ucenik.prezime}</td>
                                        <td>{ucenik.email}</td>
                                        <td>
                                            <ButtonGroup className={"d-flex gap-2"}>
                                                <Button className="btnEdit" onClick={() => {
                                                    navigate(`${ucenik.sifra}`)
                                                }}>
                                                    Promijeni
                                                </Button>
                                                <Button className="btnCancel" onClick={() => {
                                                    obrisi(ucenik.sifra)
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