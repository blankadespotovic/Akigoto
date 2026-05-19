import {Button, Col, Container, Row} from "react-bootstrap";
import {CustomCard} from "../../components/CustomCard.jsx";
import {FaMedal} from "react-icons/fa";

export function PregledKategorijaGrid(
    {kategorije, postignuca, navigate, obrisi}
) {
    return (
        <Container className="pt-0 py-3 px-0">
            {kategorije.map((kategorija) => {
                const brojPostignucaUKategoriji = postignuca.filter(pos => pos.kategorija === kategorija.sifra).length
                const tekst = `postignuć${brojPostignucaUKategoriji === 1 ? "e" : "a"}`
                return (
                    <CustomCard
                        key={kategorija.sifra}
                        title={kategorija.naziv}
                        textAlign={"start"}
                        padding={".5rem 1rem"}
                    >
                        <Row className={"mt-2"}>
                            <Col xs={7}>
                                <FaMedal color={"lightblue"} className={"mb-1"}/>&nbsp;
                                <b>{brojPostignucaUKategoriji}</b>&nbsp;{tekst}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}>
                                <Button className="btnEdit" onClick={() => {
                                    navigate(`/kategorije/${kategorija.sifra}`)
                                }}>
                                    Promijeni
                                </Button>
                                <Button className="btnCancel" onClick={() => {
                                    obrisi(kategorija.sifra)
                                }}>
                                    Obriši
                                </Button>
                            </Col>
                        </Row>
                    </CustomCard>
                );
            })}
        </Container>
    )
}