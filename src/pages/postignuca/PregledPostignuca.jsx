import {useEffect, useState} from "react";
import {Accordion, Button, ButtonGroup, Table} from "react-bootstrap";
import {GrValidate} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants.js";
import {Card} from "../../components/Card.jsx";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import {CustomAlert} from "../../components/CustomAlert.jsx";
import KategorijeService from "../../services/kategorije/KategorijeService.js";

export default function PregledPostignuca() {

    const navigate = useNavigate()
    const [postignuca, setPostignuca] = useState([])
    const [kategorije, setKategorije] = useState([])
    const [brojKategorija, setBrojKategorija] = useState(-1)

    const dohvatiSveKategorije = async () => {
        const sveKategorije = await KategorijeService.get()
        const podaciKategorija = sveKategorije.data;
        setKategorije(podaciKategorija)
        setBrojKategorija(podaciKategorija.length)
    }

    useEffect(() => {
        dohvatiSveKategorije()
    }, [])

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setPostignuca(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPostignuca();
    }, []);


    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) {
            return
        }
        await PostignucaService.obrisi(sifra)
        await ucitajPostignuca()
    }

    return (
        <>
            {brojKategorija < 1 ? (
                <CustomAlert variant={"warning"}>Trenutno nema kategorija. Dodajte kategorije kako bi se omogućio unos
                    postignuća.</CustomAlert>
            ) : (
                <Link to={RouteNames.POSTIGNUCA_NOVA} id="btnAdd"
                      className="btn btnAdd w-100 my-3">
                    Dodavanje novog postignuća
                </Link>
            )}

            {postignuca.length > 0 &&
                <Card
                    title={"Postignuća"}
                    padding={0}
                    textAlign={"left"}
                >
                    <Accordion className={"custom-accordion"} defaultActiveKey={0}>
                        {kategorije?.map((kategorija, idx) => {
                            const imaPostignuca = postignuca.some(pos => pos.kategorija === kategorija.sifra);
                            return imaPostignuca && (
                                <Accordion.Item
                                    className={"custom-accordion-item"}
                                    key={kategorija.sifra}
                                    eventKey={idx}
                                >
                                    <Accordion.Header
                                        className={"custom-accordion-header"}>{kategorija.naziv}</Accordion.Header>
                                    <Accordion.Body className={"custom-accordion-body"}>
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
                                            {postignuca.map((postignuce) => (
                                                postignuce.kategorija === kategorija.sifra &&
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
                                                                obrisi(postignuce.sifra)
                                                            }}>
                                                                Obriši
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </Card>
            }
        </>

    )
}