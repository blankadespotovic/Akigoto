import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import UceniciService from "../../services/ucenici/UceniciService";
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { ShemaUcenici } from '../../schemes/ShemaUcenici.js';

export default function NoviUcenici() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);
    const [errors, setErrors] = useState({})


    async function dodaj(ucenik) {
        await UceniciService.dodaj(ucenik).then(() => {
            navigate(RouteNames.UCENICI)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        console.log(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaUcenici.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};

            // Prolazimo kroz sve issues (probleme) koje je Zod pronašao
            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        } console.log(podaci, objektPodataka)
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };



    return (

        <Card title={"Unos novog učenika"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"ime"}
                    type={"text"}
                    label={"Ime"}
                    placeholder={"Unesite ime"}
                    isInvalid={!!errors.ime}
                    errors={errors.ime}
                    onFocus={() => ocistiGresku('ime')}
                />
                
                <CustomInput
                    id={"prezime"}
                    type={"text"}
                    label={"Prezime"}
                    placeholder={"Unesite prezime"}
                    isInvalid={!!errors.prezime}
                    errors={errors.prezime}
                    onFocus={() => ocistiGresku('prezime')}
                />
                 
                <CustomInput
                    id={"email"}
                    type={"email"}
                    label={"E-mail adresa učenika"}
                    placeholder={"Unesite e-mail"}
                    isInvalid={!!errors.email}
                    errors={errors.email}
                    onFocus={() => ocistiGresku('email')}
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