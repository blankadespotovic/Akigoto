import { Container, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../constants"





export default function Izbornik() {


    const navigate = useNavigate()

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">{IME_APLIKACIJE} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="home-nav"
                            onClick={() => navigate(RouteNames.HOME)}
                        >Početna</Nav.Link>
                        <Nav.Link className="home-nav"
                            onClick={() => navigate(RouteNames.PROFIL)}
                        >Profil</Nav.Link>
                        <Nav.Link className="home-nav"
                            onClick={() => navigate(RouteNames.POSTIGNUCA)}
                        >Postignuća</Nav.Link>
                        <Nav.Link className="home-nav"
                            onClick={() => navigate(RouteNames.KATEGORIJE)}
                        >Kategorije</Nav.Link>
                        <Nav.Link className="home-nav"
                            onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}
                        >Generiraj podatke</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}