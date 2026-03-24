import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import PostignucaService from "../../services/postignuca/PostignucaService";

export default function NovaPostignuca(){

    const navigate = useNavigate()

    async function dodaj(postignuce){
        //console.table(postignuce)
        await PostignucaService.dodaj(postignuce).then(()=>{
            navigate(RouteNames.POSTIGNUCA)
        })
    }
    
    
    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            procjena: podaci.get('procjena'),
            zavrseno: podaci.get('zavrseno') === 'on'
        })
    }





    return (
        <>
        
        <h3>Unos novog postignuća</h3>
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

             <Form.Group controlId="opis">
                <Form.Label>Opis postignuća</Form.Label>
                <Form.Control type="text" name="opis" />
            </Form.Group>

             <Form.Group controlId="procjena">
                <Form.Label>Vremenska procjena dolaska do postignuća</Form.Label>
                <Form.Control type="text" name="procjena" />
            </Form.Group>

             <Form.Group controlId="zavrseno">
                <Form.Check label="Postignuto" name="zavrseno" />
            </Form.Group>

            <Row className="mt-4">
                <Col>
                    <Link to={RouteNames.POSTIGNUCA} className="btn btn-danger">
                        Odustani
                    </Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success">
                        Dodaj novo postignuće
                    </Button>
                </Col>
            </Row>
        </Form>
        
        </>


    )
}