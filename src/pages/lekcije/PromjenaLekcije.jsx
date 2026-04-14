import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import LekcijeService from "../../services/lekcije/LekcijeService";

export default function PromjenaLekcije() {

    const navigate = useNavigate()
    const params = useParams()
    const [lekcija, setLekcije] = useState({})

    async function ucitajLekcije() {
        await LekcijeService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            const p = odgovor.data
            setLekcije(p)
        })
    }

    useEffect(() => {
        ucitajLekcije()
    }, [])



    async function promjeni(lekcija) {
        await LekcijeService.promjeni(lekcija).then(() => {
            navigate(RouteNames.LEKCIJE)
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
            sifra: lekcija.sifra,
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            trajanje: podaci.get('trajanje'),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
        })
    }


    return (

        <Card title={"Promjena lekcije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required  defaultValue={lekcija.naziv}/>
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Sadržaj lekcije</Form.Label>
                    <Form.Control type="text" name="opis" defaultValue={lekcija.opis} />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje lekcije</Form.Label>
                    <Form.Control type="number" name="trajanje" defaultValue={lekcija.trajanje}/>
                </Form.Group>

                <Form.Group controlId="datumPokretanja" className="mb-3">
                    <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                    <Form.Control type="date" name="datumPokretanja"
                        // onClick={(e) => e.target.showPicker()}
                        // onFocus={(e) => e.target.showPicker()}
                     defaultValue={lekcija.datumPokretanja && new Date(lekcija.datumPokretanja).toISOString().split("T")[0]}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.LEKCIJE} className="btn btnCancel">
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
PromjenaLekcije.jsx