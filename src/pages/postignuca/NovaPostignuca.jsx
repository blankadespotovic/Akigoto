import {useEffect, useState} from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import PostignucaService from "../../services/postignuca/PostignucaService";
import KategorijeService from '../../services/kategorije/KategorijeService';

export default function NovaPostignuca() {

    const navigate = useNavigate()

    const [kategorije, setKategorije] = useState();

    async function dohvatiKategorije() {
        const dohvaceneKategorije = await KategorijeService.get()
            .then(res => res.data.map(kat => ({ sifra: kat.sifra, kategorija: kat.kategorija, })));
        setKategorije(dohvaceneKategorije);
    }

    useEffect(() => {
        dohvatiKategorije()
    }, [])


    async function dodaj(postignuce) {
        //console.table(postignuce)
        await PostignucaService.dodaj(postignuce).then(() => {
            navigate(RouteNames.POSTIGNUCA)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            kategorija: podaci.get("kategorija"),
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            procjena: podaci.get('procjena'),
            zavrseno: podaci.get('zavrseno') === 'on'
        })
    }


    return (

        <Card title={"Unos novog postignuća"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="kategorija">
                    <Form.Label>Kategorija</Form.Label>
                    {kategorije && <Form.Select name="kategorija" defaultValue={kategorije[0].sifra}>
                        {kategorije.map((postignuce) => (
                            <option key={postignuce.sifra} value={postignuce.sifra}>{postignuce.kategorija}</option>
                        ))}
                    </Form.Select>}
                </Form.Group>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis postignuća</Form.Label>
                    <Form.Control type="text" name="opis" />
                </Form.Group>

                <Form.Group controlId="procjena">
                    <Form.Label>Vremenska procjena dolaska do postignuća</Form.Label>
                    <Form.Control type="number" min={5} name="procjena" />
                </Form.Group>

                <Form.Group controlId="zavrseno">
                    <Form.Check label="Postignuto" name="zavrseno" />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.POSTIGNUCA} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Dodaj novo postignuće
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )
}