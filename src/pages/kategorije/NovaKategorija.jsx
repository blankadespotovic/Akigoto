import {Link, useNavigate} from "react-router-dom";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {RouteNames} from "../../constants.js";
import {Card} from "../../components/Card.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";

export default function NovaKategorija() {
    const navigate = useNavigate()

    async function dodaj(kategorija) {
        //console.table(kategorija)
        await KategorijeService.dodaj(kategorija).then(() => {
            navigate(RouteNames.KATEGORIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({kategorija: podaci.get("kategorija")})
    }

    return (
        <Card title={"Unos nove kategorije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="kategorija">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="kategorija" required/>
                </Form.Group>
                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KATEGORIJE} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Dodaj novu kategoriju
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}