import {Button, ButtonGroup, Table} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";

export function PregledLekcijaTablica(
    {lekcije, setPodaci, setModalShow, navigate, obrisi}
) {
    return (
        <Card
            title={"Lekcije"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Naziv lekcije</th>
                    <th>Očekivano trajanje</th>
                    <th>Broj postignuća</th>
                    <th>Broj učenika</th>
                    <th>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {lekcije.map((lekcija) => (
                    <tr key={lekcija.sifra}>
                        <td>{lekcija.naziv}</td>
                        <td>{lekcija.trajanje}</td>
                        <td className="text-center">
                            {lekcija.postignuca ? lekcija.postignuca.length : 0}
                        </td>
                        <td className="text-center">
                            {lekcija.ucenici ? lekcija.ucenici.length : 0}
                        </td>
                        <td>
                            <ButtonGroup className={"d-flex gap-2"}>
                                <Button className="btnInfo" onClick={() => {
                                    setPodaci(lekcija)
                                    setModalShow(true)
                                }}>
                                    Detalji
                                </Button>
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
    );
}