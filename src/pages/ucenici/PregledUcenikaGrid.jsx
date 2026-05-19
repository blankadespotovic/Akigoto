import {Button, Col, Container, Row} from "react-bootstrap";
import {CustomCard} from "../../components/CustomCard.jsx";
import {FaAt} from "react-icons/fa6";
import nophoto from "../../../public/nophoto.png"

export function PregledUcenikaGrid(
    {ucenici, navigate, obrisi}
) {
    return (
        <Container className={"pt-0 py-3 px-0"}>
            {ucenici.map((ucenik) => (
                <CustomCard
                    key={ucenik.sifra}
                    title={`${ucenik.ime} ${ucenik.prezime}`}
                >
                    <div className={"pregled-ucenika-image-wrapper"}>
                        <img
                            src={ucenik.slika || nophoto}
                            alt={`${ucenik.ime} ${ucenik.prezime}`}
                            className={"pregled-ucenika-image"}
                        />
                    </div>
                    <Row className={"text-start text-break"}>
                        <Col xs={12}>
                            <FaAt color={"lightblue"} className={"mb-1"}/>&nbsp;<b>E-mail</b>
                        </Col>
                        <Col xs={12}>
                            {ucenik.email}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={12}
                            className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}
                        >
                            <Button
                                className={"btnEdit"}
                                onClick={() => navigate(`${ucenik.sifra}`)}
                            >
                                Promijeni
                            </Button>
                            <Button
                                className={"btnCancel"}
                                onClick={() => obrisi(ucenik.sifra)}
                            >
                                Obriši
                            </Button>
                        </Col>
                    </Row>
                </CustomCard>
            ))}
        </Container>
    )
}

