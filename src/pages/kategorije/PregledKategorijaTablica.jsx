import {Card} from "../../components/Card.jsx";
import {Button, Table} from "react-bootstrap";

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
        </Card>
    );
}