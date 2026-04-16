import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";
import {useState} from "react";
import {FaTimes} from "react-icons/fa";
import {FaAt, FaMagnifyingGlass} from "react-icons/fa6";

export function PregledUcenikaGrid({ucenici, navigate, obrisi}) {

    const [vrijednostPretrage, setVrijednostPretrage] = useState("")

    const filtriraniUcenici = ucenici.filter((ucenik) => {
        const upit = vrijednostPretrage.toLowerCase()
        return (
            ucenik.ime.toLowerCase().includes(upit) ||
            ucenik.prezime.toLowerCase().includes(upit) ||
            ucenik.email.toLowerCase().includes(upit)
        )
    })

    return (
        <Container className={"pt-0 py-3 px-0"}>
            <InputGroup>
                <Form.Control
                    type={"text"}
                    value={vrijednostPretrage}
                    className={"custom-input"}
                    placeholder={"Pretraži učenike..."}
                    onChange={(e) => {
                        setVrijednostPretrage(e.target.value)
                    }}
                />
                <InputGroup.Text className={"custom-addon"}>
                    {vrijednostPretrage !== "" ? (
                        <FaTimes onClick={() => setVrijednostPretrage("")}/>
                    ) : (
                        <FaMagnifyingGlass/>
                    )}
                </InputGroup.Text>
            </InputGroup>
            {filtriraniUcenici.map((ucenik) => (
                <Card
                    key={ucenik.sifra}
                    title={`${ucenik.ime} ${ucenik.prezime}`}
                >
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
                </Card>
            ))}
        </Container>
    )
}

