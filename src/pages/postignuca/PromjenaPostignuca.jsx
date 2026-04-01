import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import PostignucaService from "../../services/postignuca/PostignucaService";

export default function PromjenaPostignuca() {

    const navigate = useNavigate()
    const params = useParams()
    const [postignuce, setPostignuce] = useState({})
    const [zavrseno, setZavrseno] = useState(false)

    useEffect(() => {
        ucitajPostignuce()
    }, [])

    async function ucitajPostignuce() {
        await PostignucaService.getBySifra(params.kategorija, params.sifra).then((odgovor) => {
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            const p = odgovor.data
            setPostignuce(p)
            setZavrseno(p.zavrseno)
        })
    }


    async function promjeni(postignuce) {
        await PostignucaService.promjeni(params.kategorija, postignuce).then(() => {
            navigate(RouteNames.POSTIGNUCA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            sifra: postignuce.sifra,
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            procjena: podaci.get('procjena'),
            zavrseno: zavrseno
        })
    }


    return (

        <Card title={"Promjena postignuća"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required defaultValue={postignuce.naziv}/>
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis postignuća</Form.Label>
                    <Form.Control type="text" name="opis" defaultValue={postignuce.opis} />
                </Form.Group>

                <Form.Group controlId="procjena">
                    <Form.Label>Vremenska procjena dolaska do postignuća</Form.Label>
                    <Form.Control type="number" min={5} name="procjena" defaultValue={postignuce.procjena}/>
                </Form.Group>

                <Form.Group controlId="zavrseno">
                    <Form.Check label="Postignuto" name="zavrseno" checked={zavrseno} onChange={(e)=>{setZavrseno(e.target.checked)}}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.POSTIGNUCA} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Promijeni postignuće
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )

}