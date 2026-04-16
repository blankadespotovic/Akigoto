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
                    <th className={"text-end"}>Očekivano trajanje</th>
                    <th className={"text-end"}>Broj postignuća</th>
                    <th className={"text-end"}>Broj učenika</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {lekcije.map((lekcija) => (
                    <tr key={lekcija.sifra}>
                        <td>{lekcija.naziv}</td>
                        <td className={"text-end"}>{lekcija.trajanje}</td>
                        <td className={"text-end"}>
                            {lekcija.postignuca ? lekcija.postignuca.length : 0}
                        </td>
                        <td className={"text-end"}>
                            {lekcija.ucenici ? lekcija.ucenici.length : 0}
                        </td>
                        <td>
                            <ButtonGroup className={"d-flex justify-content-center gap-2"}>
                                <Button
                                    className="btnInfo"
                                    onClick={() => {
                                        setPodaci(lekcija)
                                        setModalShow(true)
                                    }}
                                >
                                    Detalji
                                </Button>
                                <Button
                                    className="btnEdit"
                                    onClick={() => navigate(`${lekcija.sifra}`)}
                                >
                                    Promijeni
                                </Button>
                                <Button
                                    className="btnCancel"
                                    onClick={() => obrisi(lekcija.sifra)}
                                >
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