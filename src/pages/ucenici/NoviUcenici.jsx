import {useEffect, useState} from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import UceniciService from "../../services/ucenici/UceniciService";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";

export default function NoviUcenici() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);


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
                <CustomInput
                    id={"ime"}
                    type={"text"}
                    label={"Ime"}
                    placeholder={"Unesite ime"}
                    required={true}
                />
                <CustomInput
                    id={"prezime"}
                    type={"text"}
                    label={"Prezime"}
                    placeholder={"Unesite prezime"}
                />
                <CustomInput
                    id={"email"}
                    type={"email"}
                    label={"E-mail adresa učenika"}
                    placeholder={"Unesite e-mail"}
                    required={true}
                />

                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.UCENICI}
                              className={`btn btnCancel${mobilnaSirina ? " w-100 my-1" : ""}`}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={12} md={6} className={"order-1 order-md-2 text-end"}>
                        <Button type="submit" className={`btn btnAdd${mobilnaSirina ? " w-100 my-1" : ""}`}>
                            Spremi
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )
}