import { Button, Col, Container, Row } from "react-bootstrap";
import { Card } from "../../components/Card.jsx";

export function PregledUcenikaGrid({ ucenici, navigate, obrisi }) {

    return (

        <Container className="pt-0 py-3 px-0">
            {ucenici.map((ucenik) => (
                <Card
                    key={ucenik.sifra}
                    title={`${ucenik.ime} ${ucenik.prezime}`}
                >
                    <p><b>E-mail:</b> {ucenik.email}</p>
                    <Row>
                        <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}>
                            <Button className="btnEdit" onClick={() => {
                                navigate(`${ucenik.sifra}`)
                            }}>
                                Promijeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button className="btnCancel" onClick={() => {
                                obrisi(ucenik.sifra)
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

