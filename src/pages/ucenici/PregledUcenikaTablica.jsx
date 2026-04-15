import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Card } from "../../components/Card.jsx";

export function PregledUcenikaTablica(
    { ucenici, navigate, obrisi }
) {



    return (

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
    )
}