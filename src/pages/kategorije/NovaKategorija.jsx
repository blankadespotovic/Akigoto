import {Link, useNavigate} from "react-router-dom";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {RouteNames} from "../../constants.js";
import {Card} from "../../components/Card.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";

export default function NovaKategorija() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);

    async function dodaj(kategorija) {
        //console.table(kategorija)
        await KategorijeService.dodaj(kategorija).then(() => {
            navigate(RouteNames.KATEGORIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({naziv: podaci.get("naziv")})
    }

    return (
        <Card title={"Unos nove kategorije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    required={true}
                />
                <Row className="mt-4">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.KATEGORIJE} className={`btn btnCancel${mobilnaSirina ? " w-100 my-1" : ""}`}>
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