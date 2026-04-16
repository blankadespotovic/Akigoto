import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Card } from "../../components/Card.jsx";

export function PregledUcenikaTablica(
    { ucenici, navigate, obrisi }
) {



    return (

        <Card
            title={'Učenici'}
            padding={0}
            textAlign={'left'}
        >
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>E-mail adresa</th>
                        <th className={"text-center"}>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {ucenici.map((ucenik) => (
                        <tr key={ucenik.sifra}>
                            <td>{ucenik.ime}</td>
                            <td>{ucenik.prezime}</td>
                            <td>{ucenik.email}</td>
                            <td>
                                <ButtonGroup className={"d-flex justify-content-center gap-2"}>
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