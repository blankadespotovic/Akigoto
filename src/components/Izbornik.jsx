import useAuth from "../hooks/useAuth"

import {ButtonGroup, Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {useLocation, useNavigate} from "react-router-dom"
import {DATA_SOURCE, DATA_SOURCES, IME_APLIKACIJE, RouteNames} from "../constants"
import {FaUserCircle} from "react-icons/fa";

export default function Izbornik() {
    const navigate = useNavigate()
    const {isLoggedIn, logout, authUser} = useAuth()
    const location = useLocation();

    const getDatasourceName = () => {
        switch (DATA_SOURCE) {
            case DATA_SOURCES.M:
                return "Memorija";
            case DATA_SOURCES.L:
                return "Local Storage";
            case DATA_SOURCES.F:
                return "Firebase";
        }
    }
    return (
        <Navbar expand="xl" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">{IME_APLIKACIJE} </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            className="home-nav"
                            onClick={() => navigate(RouteNames.HOME)}
                            active={location.pathname === RouteNames.HOME}
                        >
                            Početna
                        </Nav.Link>
                        {isLoggedIn && (
                            <>
                                <Nav.Link
                                    className="home-nav"
                                    onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                    active={location.pathname === RouteNames.NADZORNA_PLOCA}
                                >
                                    Nadzorna ploča
                                </Nav.Link>
                                <Nav.Link
                                    className="home-nav"
                                    onClick={() => navigate(RouteNames.POSTIGNUCA)}
                                    active={location.pathname === RouteNames.POSTIGNUCA}
                                >
                                    Postignuća
                                </Nav.Link>
                                <Nav.Link
                                    className="home-nav"
                                    onClick={() => navigate(RouteNames.KATEGORIJE)}
                                    active={location.pathname === RouteNames.KATEGORIJE}
                                >
                                    Kategorije
                                </Nav.Link>
                                <Nav.Link
                                    className="home-nav"
                                    onClick={() => navigate(RouteNames.UCENICI)}
                                    active={location.pathname === RouteNames.UCENICI}
                                >
                                    Učenici
                                </Nav.Link>
                                <Nav.Link
                                    className="home-nav"
                                    onClick={() => navigate(RouteNames.LEKCIJE)}
                                    active={location.pathname === RouteNames.LEKCIJE}
                                >
                                    Lekcije
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="ms-auto my-3 my-xl-0">

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
                                {authUser.uloga === "admin" &&
                                    <>
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
                            <>
                                <Nav.Link
                                    className={"home-nav mb-3 mb-xl-0 me-sm-0 me-xl-3"}
                                    onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                    active={location.pathname === RouteNames.REGISTRACIJA}
                                >
                                    Registracija
                                </Nav.Link>
                                <Nav.Link
                                    className={"home-nav"}
                                    onClick={() => navigate(RouteNames.LOGIN)}
                                    active={location.pathname === RouteNames.LOGIN}
                                >
                                    Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}