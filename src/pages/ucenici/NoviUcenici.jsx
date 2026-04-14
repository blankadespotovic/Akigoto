import {useEffect, useState} from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import UceniciService from "../../services/ucenici/UceniciService";

export default function NoviUcenici() {

    const navigate = useNavigate()


    async function dodaj(ucenik) {
        await UceniciService.dodaj(ucenik).then(() => {
            navigate(RouteNames.UCENICI)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // if(!podaci.get('naziv') || podaci.get('naziv').trim().length === 0){
        //     alert ("Naziv je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if(podaci.get('naziv').trim().length < 3){
        //     alert ("Naziv postignuca mora imati najmanje 3 znaka!")
        //     return
        // }

        // if(!podaci.get('opis') || podaci.get('opis').trim() === ""){
        //     alert ("Opis postignuća je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        //  if(podaci.get('opis').trim().length < 5){
        //     alert ("Opis postignuća mora imati najmanje 5 znakova!")
        //     return
        // }

        // if(!podaci.get('procjena') || podaci.get('procjena').trim() === ""){
        //     alert ("Vremenska procjena dolaska do postignuća je obvezna i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if(podaci.get('procjena') < 0){
        //     alert ("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
        //     return
        // }

        //   if(podaci.get('procjena') <1 || podaci.get('procjena') > 500){
        //     alert ("Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!")
        //     return
        // }

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
        })
    }


    return (

        <Card title={"Unos novog učenika"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail adresa učenika</Form.Label>
                    <Form.Control type="email"  name="email" />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.UCENICI} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Dodaj novog učenika
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )
}