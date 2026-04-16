import {Card} from "../../components/Card.jsx";
import {Button, ButtonGroup, Table} from "react-bootstrap";

export function PregledKategorijaTablica(
    {kategorije, postignuca, navigate, obrisi}
) {
    return (
        <Card
            key={"sve-kategorije"}
            title={"Kategorije"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Naziv</th>
                    <th className={"text-end"}>Broj postignuća</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {kategorije.map((kategorija) => {
                    const brojPostignucaUKategoriji = postignuca.filter(pos => pos.kategorija === kategorija.sifra).length;
                    return (
                        <tr key={kategorija.sifra}>
                            <td>{kategorija.naziv}</td>
                            <td className={"text-end"}>{brojPostignucaUKategoriji}</td>
                            <td>
                                <ButtonGroup className={"d-flex justify-content-center gap-2"}>
                                    <Button
                                        className={"btnEdit"}
                                        onClick={() => navigate(`/kategorije/${kategorija.sifra}`)}
                                    >
                                        Promijeni
                                    </Button>
                                    <Button
                                        className={"btnCancel"}
                                        onClick={() => obrisi(kategorija.sifra)}
                                    >
                                        Obriši
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Card>
    );
}