import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Card} from "../../components/Card";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";

export default function PromjenaKategorije() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);

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
                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.KATEGORIJE}
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