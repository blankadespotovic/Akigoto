import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import UceniciService from "../../services/ucenici/UceniciService";
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { FaTrash } from "react-icons/fa";

export default function PromjenaUcenika() {

    const navigate = useNavigate()
    const params = useParams()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)
    const [ucenik, setUcenik] = useState({})

    async function ucitajUcenika() {
        await UceniciService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setUcenik(p)
        })
    }

    useEffect(() => {
        ucitajUcenika()
    }, [])


    async function promjeni(ucenik, datum, iznos) {
        await UceniciService.promjeni(ucenik, datum, iznos).then(() => {
            navigate(RouteNames.UCENICI)
        })
    }

    async function obrisiUplatu(sifraUplate){
        await UceniciService.obrisiUplatu(ucenik.sifra, sifraUplate).then(() =>{
            ucitajUcenika()
        })
    }

    function handleDelete(e, sifraUplate){
        e.preventDefault()
        obrisiUplatu(sifraUplate)
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
            uplate: ucenik.uplate,
        },
            podaci.get("datum") ? new Date(podaci.get("datum")).toISOString() : null,
            podaci.get("iznos")
        )
    }


    return (

        <Card title={"Promjena učenika"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"ime"}
                            type={"text"}
                            label={"Ime"}
                            placeholder={"Unesite ime"}
                            required={true}
                            defaultValue={ucenik.ime}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"iznos"}
                            type={"number"}
                            label={"Iznos uplate"}
                            placeholder={"Unesite iznos uplate"}
                            suffix={"€"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomInput
                            id={"prezime"}
                            type={"text"}
                            label={"Prezime"}
                            placeholder={"Unesite prezime"}
                            defaultValue={ucenik.prezime}
                        />
                    </Col>
                    <Col>
                        <CustomInput
                            id={"datum"}
                            type={"date"}
                            label={"Datum uplate"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"email"}
                            type={"email"}
                            label={"E-mail adresa učenika"}
                            placeholder={"Unesite e-mail"}
                            defaultValue={ucenik.email}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <h4 className="mt-3">Trenutne uplate</h4>
                        {ucenik?.uplate?.length > 0?
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <td>Datum</td>
                                    <td className="text-end">Iznos</td>
                                    <td className="text-center">Akcija</td>
                                </tr>
                            </thead>
                            <tbody>
                                {ucenik?.uplate?.sort((a, b) => new Date(a.datum) - new Date(b.datum))
                                    .map((u, idx) =>
                                        <tr key={`naplata-${u.datum}`}>
                                        <td>{new Date(u.datum).toLocaleDateString('hr-HR')}</td>
                                        <td className="text-end">{u.iznos} €</td>
                                        <td className="text-center">
                                            <Button className="btn btnCancel btn-sm" onClick={(e)=>handleDelete(e, u.sifra)}><FaTrash color="white" /></Button>
                                        </td>
                                        </tr>
                                    )}
                            </tbody>

                        </Table> : <p>Nema podataka o uplati</p>
                        }
                    </Col>

                </Row>


                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.UCENICI}
                            className={`btn btnCancel${mobilnaSirina ? " w-100 my-1" : ""}`}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={12} md={6} className={"order-1 order-md-2 text-end"}>
                        <Button type="submit" className={`btn btnAdd${mobilnaSirina ? " w-100 my-1" : ""}`}>
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )

}