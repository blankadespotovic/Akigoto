import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Card} from "../../components/Card";
import UceniciService from "../../services/ucenici/UceniciService";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";

export default function PromjenaUcenika() {

    const navigate = useNavigate()
    const params = useParams()
    const [ucenik, setUcenici] = useState({})

    async function ucitajUcenike() {
        await UceniciService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setUcenici(p)
        })
    }

    useEffect(() => {
        ucitajUcenike()
    }, [])


    async function promjeni(ucenik) {
        await UceniciService.promjeni(ucenik).then(() => {
            navigate(RouteNames.UCENICI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // if (!podaci.get('Ime') || podaci.get('Ime').trim().length === 0) {
        //     alert("Ime učenika je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (podaci.get('Ime').trim().length < 3) {
        //     alert("Ime učenika mora imati najmanje 3 znaka!")
        //     return
        // }

        // if (!podaci.get('Prezime') || podaci.get('Prezime').trim() === "") {
        //     alert("Prezime učenika je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (!podaci.get('email') || podaci.get('email').trim() === "") {
        //     alert("E-mail adresa učenika je obvezna i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (podaci.get('procjena') < 0) {
        //     alert("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
        //     return
        // }

        promjeni({
            sifra: ucenik.sifra,
            ime: podaci.get("ime"),
            prezime: podaci.get("prezime"),
            email: podaci.get("email"),
        })
    }


    return (

        <Card title={"Promjena učenika"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"ime"}
                    type={"text"}
                    label={"Ime"}
                    placeholder={"Unesite ime"}
                    required={true}
                    defaultValue={ucenik.ime}
                />
                <CustomInput
                    id={"prezime"}
                    type={"text"}
                    label={"Prezime"}
                    placeholder={"Unesite prezime"}
                    defaultValue={ucenik.prezime}
                />
                <CustomInput
                    id={"email"}
                    type={"email"}
                    label={"E-mail adresa učenika"}
                    placeholder={"Unesite e-mail"}
                    defaultValue={ucenik.email}
                />

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.UCENICI} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Unesi izmjene
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )

}