import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";

export function PregledLekcijaGrid(
    {lekcije, setPodaci, setModalShow, navigate, obrisi}
) {
    return (
        <Container className="pt-0 py-3 px-0">
            {lekcije.map((lekcija) => (
                <Card
                    key={lekcija.sifra}
                    title={lekcija.naziv}
                    textAlign={"start"}
                >
                    <ul>
                        <li>Trajanje: {lekcija.trajanje}</li>
                        <li>Postignuća: {lekcija.postignuca ? lekcija.postignuca.length : 0}</li>
                        <li>Učenici: {lekcija.ucenici ? lekcija.ucenici.length : 0}</li>
                    </ul>
                    <Row>
                        <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between gap-1"}>
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
                        </Col>
                    </Row>
                </Card>
            ))}
        </Container>
    )
}