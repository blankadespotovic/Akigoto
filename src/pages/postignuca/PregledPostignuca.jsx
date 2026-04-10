import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import { Card } from "../../components/Card.jsx";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import { CustomAlert } from "../../components/CustomAlert.jsx";
import KategorijeService from "../../services/kategorije/KategorijeService.js";

export default function PregledPostignuca() {

    const navigate = useNavigate()
    const [postignuca, setPostignuca] = useState([]);
    const [brojKategorija, setBrojKategorija] = useState(-1)

    const dohvatiSveKategorije = async () => {
        const sveKategorije = await KategorijeService.get()
        setBrojKategorija(sveKategorije?.data?.length)
    }

    useEffect(() => {
        dohvatiSveKategorije()
    }, [])

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPostignuca(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPostignuca();
    }, []);


    async function obrisi(kategorija, postignuce) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await PostignucaService.obrisi(kategorija, postignuce)
        ucitajPostignuca()
    }

    return (

        <>
            {brojKategorija < 1 ? (
                <CustomAlert variant={'warning'}>Trenutno nema kategorija. Dodajte kategorije kako bi se omogućio unos postignuća.</CustomAlert>
            ) : (
                <Link to={RouteNames.POSTIGNUCA_NOVA} id="btnAdd"
                    className="btn btnAdd w-100 my-3">
                    Dodavanje novog postignuća
                </Link>
            )}

            {postignuca.length > 0 &&
                <Card
                    title={'Postignuća'}
                    padding={0}
                    textAlign={'left'}
                >
                     <Tab.Container id="left-tabs-example">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    {postignuca && postignuca.map((kategorija, idx) => (
                                        kategorija.postignuca && kategorija.postignuca.length > 0 &&
                                        <Nav.Item className="pill-nav-item">
                                            <Nav.Link className="pill-nav" eventKey={idx}>{kategorija.kategorija}</Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    {postignuca && postignuca.map((kategorija, idx) => (
                                        kategorija.postignuca && kategorija.postignuca.length > 0 &&
                                        <Tab.Pane eventKey={idx}>
                                            <Table striped hover responsive>
                                                <thead>
                                                <tr>
                                                    <th>Naziv postignuća</th>
                                                    <th>Opis</th>
                                                    <th>Procjena</th>
                                                    <th>Postignuto</th>
                                                    <th>Akcija</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {kategorija.postignuca.map((postignuce) => (
                                                    <tr key={postignuce.sifra}>
                                                        <td>{postignuce.naziv}</td>
                                                        <td style={{minWidth: "250px"}}>{postignuce.opis}</td>
                                                        <td>{postignuce.procjena} min</td>
                                                        <td>
                                                            <GrValidate
                                                                size={25}
                                                                color={postignuce.zavrseno ? "green" : "red"}
                                                            />
                                                        </td>
                                                        <td>
                                                            <ButtonGroup className={"d-flex gap-2"}>
                                                                <Button className="btnEdit" onClick={() => {
                                                                    navigate(`/postignuca/${kategorija.sifra}/${postignuce.sifra}`)
                                                                }}>
                                                                    Promijeni
                                                                </Button>
                                                                <Button className="btnCancel" onClick={() => {
                                                                    obrisi(kategorija.sifra, postignuce.sifra)
                                                                }}>
                                                                    Obriši
                                                                </Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card>

            }
        </>

    )
}