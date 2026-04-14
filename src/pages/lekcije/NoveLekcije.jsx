import { Button, Col, Form, Row } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import LekcijeService from "../../services/lekcije/LekcijeService";

export default function NoveLekcije() {

    const navigate = useNavigate()

    async function dodaj(lekcija) {
        await LekcijeService.dodaj(lekcija).then(() => {
            navigate(RouteNames.LEKCIJE)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

    //     if(!podaci.get('naziv') || podaci.get('naziv').trim().length === 0){
    //         alert ("Naziv je obvezan i ne smije sadržavati samo razmake!")
    //         return
    //     }

    //     if(podaci.get('naziv').trim().length < 3){
    //         alert ("Naziv postignuca mora imati najmanje 3 znaka!")
    //         return
    //     }

    //     if(!podaci.get('opis') || podaci.get('opis').trim() === ""){
    //         alert ("Opis postignuća je obvezan i ne smije sadržavati samo razmake!")
    //         return
    //     }

    //      if(podaci.get('opis').trim().length < 5){
    //         alert ("Opis postignuća mora imati najmanje 5 znakova!")
    //         return
    //     }

    //     if(!podaci.get('procjena') || podaci.get('procjena').trim() === ""){
    //         alert ("Vremenska procjena dolaska do postignuća je obvezna i ne smije sadržavati samo razmake!")
    //         return
    //     }

    //     if(podaci.get('procjena') < 0){
    //         alert ("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
    //         return
    //     }

    //       if(podaci.get('procjena') <1 || podaci.get('procjena') > 500){
    //         alert ("Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!")
    //         return
    //     }

    dodaj({
        naziv: podaci.get('naziv'),
        opis: podaci.get('opis'),
        trajanje: podaci.get('trajanje'),
        datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
    })
}


return (

    <Card title={"Unos nove lekcije"} textAlign={"left"}>
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="opis">
                <Form.Label>Sadržaj lekcije</Form.Label>
                <Form.Control type="text" name="opis" />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje lekcije</Form.Label>
                <Form.Control type="number" name="trajanje" />
            </Form.Group>

            <Form.Group controlId="datumPokretanja" className="mb-3">
                <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                <Form.Control type="date" name="datumPokretanja"
                    onClick={(e) => e.target.showPicker()}
                    onFocus={(e) => e.target.showPicker()}
                />
            </Form.Group>

            <Row className="mt-4">
                <Col>
                    <Link to={RouteNames.LEKCIJE} className="btn btnCancel">
                        Odustani
                    </Link>
                </Col>
                <Col className={"text-end"}>
                    <Button type="submit" className="btn btnAdd">
                        Dodaj novu lekciju
                    </Button>
                </Col>
            </Row>
        </Form>
    </Card >


)}
