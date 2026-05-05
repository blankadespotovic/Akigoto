import useAuth from "../hooks/useAuth"

import {Button, ButtonGroup, Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {IME_APLIKACIJE, RouteNames} from "../constants"
import {FaUserCircle} from "react-icons/fa";

export default function Izbornik() {
    const navigate = useNavigate()
    const {isLoggedIn, logout, authUser} = useAuth()

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">{IME_APLIKACIJE} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="home-nav"
                                  onClick={() => navigate(RouteNames.HOME)}
                        >Početna</Nav.Link>
                        {isLoggedIn && (
                            <>
                                <Nav.Link className="home-nav"
                                          onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                >Nadzorna ploča</Nav.Link>
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
                            </>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <NavDropdown
                                title={
                                    <>
                                        <FaUserCircle size={20} className="me-2"/>{authUser.email}
                                    </>
                                }
                                id="user-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item className={"user"} onClick={() => navigate(RouteNames.PROFIL)}>
                                    Profil
                                </NavDropdown.Item>
                                {authUser.uloga === "admin" &&
                                    <>
                                        <hr className={"dropdown-divider"}/>
                                        <NavDropdown.Item onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}>
                                            Generiraj podatke
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate(RouteNames.OPERATERI)}>
                                            Operateri
                                        </NavDropdown.Item>
                                        <hr className={"dropdown-divider"}/>
                                    </>
                                }
                                <NavDropdown.Item className={"logout"} onClick={() => logout()}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <ButtonGroup className={"gap-3"}>
                                <Button
                                    className="btn btnAdd"
                                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                >Registracija</Button>
                                <Button
                                    className="btn btnAdd"
                                    onClick={() => navigate(RouteNames.LOGIN)}
                                >Login</Button>
                            </ButtonGroup>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}