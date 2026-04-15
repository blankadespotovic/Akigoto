import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Card} from "../../components/Card";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";

export default function PromjenaKategorije() {
    const navigate = useNavigate()
    const params = useParams()
    const [kategorija, setKategorija] = useState()

    useEffect(() => {
        ucitajKategoriju()
    }, [])

    async function ucitajKategoriju() {
        await KategorijeService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setKategorija(p)
        })
    }


    async function promjeni(kategorija) {
        await KategorijeService.promjeni(kategorija).then(() => {
            navigate(RouteNames.KATEGORIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            sifra: kategorija.sifra,
            naziv: podaci.get("naziv")
        })
    }


    return (

        <Card title={"Promjena kategorije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    required={true}
                    defaultValue={kategorija?.naziv}
                />
                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KATEGORIJE} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Promijeni kategoriju
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )
}