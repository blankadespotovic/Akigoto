import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../constants"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"





export default function Izbornik() {


    const navigate = useNavigate()
    const { isLoggedIn, logout, authUser } = useAuth()

    useEffect(()=>{
        console.log(authUser)
    },[authUser])

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

                        {isLoggedIn && (
                            <>
                                <Nav.Link
                                    onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                >Nadzorna ploča</Nav.Link>
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
                                    onClick={() => navigate(RouteNames.UCENICI)}
                                >Učenici</Nav.Link>
                                <Nav.Link className="home-nav"
                                    onClick={() => navigate(RouteNames.LEKCIJE)}
                                >Lekcije</Nav.Link>

                                {authUser.uloga === 'admin' && (
                                    <>
                                        <Nav.Link className="home-nav d-block"
                                            onClick={() => navigate(RouteNames.OPERATERI)}
                                        >Operateri</Nav.Link>
                                        <Nav.Link className="home-nav d-block"
                                            onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}
                                        >Generiraj podatke</Nav.Link>
                                    </>
                                )}
                            </>
                        )}
                    </Nav>

                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <Button
                                className="btn btnCancel"
                                onClick={() => logout()}
                            >Logout {authUser.email}</Button>
                        ) : (
                            <>
                            <div className="buttonContainer">
                                <Button
                                    className="btn btnAdd"
                                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                >Registracija</Button>
                                <Button
                                    className="btn btnAdd"
                                    onClick={() => navigate(RouteNames.LOGIN)}
                                >Login</Button>
                                </div>
                            </>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}