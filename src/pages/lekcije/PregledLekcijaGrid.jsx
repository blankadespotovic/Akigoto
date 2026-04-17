import {Col, Container, Row} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";
import {FaEdit, FaFilePdf, FaInfoCircle, FaMedal, FaRegClock, FaTrash} from "react-icons/fa";
import {FaPeopleGroup} from "react-icons/fa6";
import {CustomButtons} from "../../components/CustomButtons.jsx";

export function PregledLekcijaGrid(
    {lekcije, setPodaci, setModalShow, obrisi, generirajPDFZaLekciju}
) {
    const truncate = (text, max) =>
        text.length > max ? text.slice(0, max) + "..." : text;

    const isMobile = window.innerWidth <= 576;

    return (
        <Container className="pt-0 py-3 px-0">
            {lekcije.map((lekcija) => (
                <Card
                    key={lekcija.sifra}
                    title={isMobile ? truncate(lekcija.naziv, 20) : lekcija.naziv}
                    textAlign={"start"}
                >
                    <Row>
                        <Row>
                            <Col xs={7}>
                                <FaRegClock color={"lightblue"} className={"mb-1"}/>&nbsp;Trajanje:
                            </Col>
                            <Col xs={5}>
                                <b>{lekcija.trajanje} min</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <FaMedal color={"lightblue"} className={"mb-1"}/>&nbsp;Postignuća:
                            </Col>
                            <Col xs={5}>
                                <b>{lekcija.postignuca ? lekcija.postignuca.length : 0}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                <FaPeopleGroup color={"lightblue"} className={"mb-1"}/>&nbsp;Učenika:
                            </Col>
                            <Col xs={5}>
                                <b>{lekcija.ucenici ? lekcija.ucenici.length : 0}</b>
                            </Col>
                        </Row>
                    </Row>
                    <CustomButtons
                        key={lekcija.sifra}
                        sifra={lekcija.sifra}
                        customClass={"mt-3"}

                        detailsFunc={() => {
                            setPodaci(lekcija)
                            setModalShow(true)
                        }}
                        detailsLabel={<FaInfoCircle/>}
                        isDetails={true}

                        editLink={`${lekcija.sifra}`}
                        editLabel={<FaEdit/>}

                        deleteFunc={() => obrisi(lekcija.sifra)}
                        deleteLabel={<FaTrash/>}

                        pdfFunc={() => generirajPDFZaLekciju(lekcija)}
                        pdfLabel={<FaFilePdf/>}
                        needsPdf={true}
                    />
                    {/*<Row>*/}
                    {/*    <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between gap-1"}>*/}
                    {/*        <Button className="btnInfo" onClick={() => {*/}
                    {/*            setPodaci(lekcija)*/}
                    {/*            setModalShow(true)*/}
                    {/*        }}>*/}
                    {/*            Detalji*/}
                    {/*        </Button>*/}
                    {/*        <Button className="btnEdit" onClick={() => {*/}
                    {/*            navigate(`${lekcija.sifra}`)*/}
                    {/*        }}>*/}
                    {/*            Promijeni*/}
                    {/*        </Button>*/}
                    {/*        <Button className="btnCancel" onClick={() => {*/}
                    {/*            obrisi(lekcija.sifra)*/}
                    {/*        }}>*/}
                    {/*            Obriši*/}
                    {/*        </Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Card>
            ))}
        </Container>
    )
}