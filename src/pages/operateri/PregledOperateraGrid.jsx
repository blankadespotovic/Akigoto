import {Button, Col, Container, Row} from "react-bootstrap";
import {CustomCard} from "../../components/CustomCard.jsx";
import {FaEdit, FaKey, FaTrash} from "react-icons/fa";
import {FaUserGear} from "react-icons/fa6";

export function PregledOperateraGrid(
    {operateri, navigate, obrisi}
) {
    return (
        <Container className={"pt-0 py-3 px-0"}>
            {operateri.map((operater) => (
                <CustomCard
                    key={operater.sifra}
                    title={operater.email}
                >
                    <Row className={"text-start text-break"}>
                        <Col xs={12}>
                            <FaUserGear color={"lightblue"} className={"mb-1"}/>&nbsp;<b>Uloga</b>:&nbsp;<span
                            style={{color: operater.uloga === "admin" ? "#E07C7C" : "#6FAFF0"}}>{operater.uloga}</span>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-2 gap-2">
                        <Col xs={12}>
                            <Button
                                className={"btnEdit w-100 d-flex align-items-center justify-content-center"}
                                onClick={() => navigate(`${operater.sifra}`)}
                            >
                                <FaEdit/>&nbsp;Promijeni
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <Button
                                className={"btnWarning w-100 d-flex align-items-center justify-content-center"}
                                onClick={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                            >
                                <FaKey/>&nbsp;Promijeni lozinku
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <Button
                                className={"btnCancel w-100 d-flex align-items-center justify-content-center"}
                                onClick={() => obrisi(operater.sifra)}
                            >
                                <FaTrash/>&nbsp;Obriši
                            </Button>
                        </Col>
                    </Row>
                </CustomCard>
            ))}
        </Container>
    )
}