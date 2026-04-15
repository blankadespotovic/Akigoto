import {Button, Col, Container, Row} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";

export function PregledKategorijaGrid(
    {kategorije, postignuca, navigate, obrisi}
) {

    return (
        <Container className="pt-0 py-3 px-0">
            {kategorije.map((kategorija) => {
                const brojPostignucaUKategoriji = postignuca.filter(pos => pos.kategorija === kategorija.sifra).length;
                return (
                    <Card
                        key={kategorija.sifra}
                        title={kategorija.naziv}
                        textAlign={"start"}
                        padding={".5rem 1rem"}
                    >
                        <p className={"mb-0"}>Kategorija ima {brojPostignucaUKategoriji} postignuća.</p>
                        <Row>
                            <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}>
                                <Button className="btnEdit" onClick={() => {
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
                            </Col>
                        </Row>
                    </Card>
                );
            })}
        </Container>
    )
}