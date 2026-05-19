import {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import OperaterService from "../../services/operateri/OperaterService"
import {Button, Col, Form, Row} from "react-bootstrap"
import {RouteNames} from "../../constants"
import {ShemaPromjenaLozinke} from "../../schemes/ShemaOperater"
import {CustomCard} from "../../components/CustomCard.jsx";
import {CustomAlert} from "../../components/CustomAlert.jsx";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa6";
import useBreakpoint from "../../hooks/useBreakpoint.js";

export default function OperaterPromjenaLozinke() {
    const navigate = useNavigate()
    const params = useParams()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)
    
    const [operater, setOperater] = useState({})
    const [errors, setErrors] = useState({})
    const [passwordShown, setPasswordShown] = useState(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(
        <FaEyeSlash
            onClick={() => setPasswordShown(!passwordShown)}
            className={"cursor-pointer"}
        />
    );
    const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(
        <FaEyeSlash
            onClick={() => setRepeatPasswordShown(!repeatPasswordShown)}
            className={"cursor-pointer"}
        />
    );

    useEffect(() => {
        async function ucitajOperatera() {
            const odgovor = await OperaterService.getBySifra(params.sifra)
            if (!odgovor.success) {
                alert("Operater nije pronađen")
                navigate(RouteNames.OPERATERI)
                return
            }
            setOperater(odgovor.data)
        }
        
        ucitajOperatera()
    }, [navigate, params.sifra])

    useEffect(() => {
        const getPasswordIcon = () => {
            if (passwordShown) {
                setPasswordIcon(
                    <FaEyeSlash
                        onClick={() => setPasswordShown(!passwordShown)}
                        className={"cursor-pointer"}
                    />
                );
            } else {
                setPasswordIcon(
                    <FaEye
                        onClick={() => setPasswordShown(!passwordShown)}
                        className={"cursor-pointer"}
                    />
                );
            }
        }
        getPasswordIcon();
    }, [passwordShown])

    useEffect(() => {
        const getRepeatPasswordIcon = () => {
            if (repeatPasswordShown) {
                setRepeatPasswordIcon(
                    <FaEyeSlash
                        onClick={() => setRepeatPasswordShown(!repeatPasswordShown)}
                        className={"cursor-pointer"}
                    />
                );
            } else {
                setRepeatPasswordIcon(
                    <FaEye
                        onClick={() => setRepeatPasswordShown(!repeatPasswordShown)}
                        className={"cursor-pointer"}
                    />
                );
            }
        }
        getRepeatPasswordIcon();
    }, [repeatPasswordShown])

    async function promjeniLozinku(novaLozinka) {
        const rezultat = await OperaterService.promjeniLozinku(params.sifra, novaLozinka)
        if (rezultat.success) {
            alert("Lozinka uspješno promijenjena!")
            navigate(RouteNames.OPERATERI)
        } else {
            alert(rezultat.message || "Greška pri promjeni lozinke")
        }
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        const rezultat = ShemaPromjenaLozinke.safeParse(objektPodataka)

        if (!rezultat.success) {
            const noveGreske = {}

            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0]
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message
                }
            })

            setErrors(noveGreske)
            return
        }

        promjeniLozinku(podaci.get("novaLozinka"))
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = {...errors}
            delete noveGreske[nazivPolja]
            setErrors(noveGreske)
        }
    }

    return (
        <CustomCard title={"Promjena lozinke"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <p>
                    Operater: <strong>{operater.email}</strong>
                </p>
                <CustomAlert variant={"info"}>
                    <strong>Zahtjevi za lozinku:</strong>
                    <ul className="mb-0 mt-2">
                        <li>Najmanje 8 znakova</li>
                        <li>Barem jedno veliko slovo (A-Z)</li>
                        <li>Barem jedno malo slovo (a-z)</li>
                        <li>Barem jedan broj (0-9)</li>
                        <li>Barem jedan interpukcijski znak (!@#$%^&*...)</li>
                    </ul>
                </CustomAlert>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            label={"Lozinka"}
                            id={"novaLozinka"}
                            type={passwordShown ? "text" : "password"}
                            name="novaLozinka"
                            placeholder="Unesite novu lozinku"
                            isInvalid={!!errors.novaLozinka}
                            errors={errors.novaLozinka}
                            onFocus={() => ocistiGresku("novaLozinka")}
                            prefix={<FaLock size={12}/>}
                            suffix={passwordIcon}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <CustomInput
                            label={"Ponovite lozinku"}
                            id={"potvrdaLozinke"}
                            type={repeatPasswordShown ? "text" : "password"}
                            name="potvrdaLozinke"
                            placeholder="Ponovite novu lozinku"
                            isInvalid={!!errors.potvrdaLozinke}
                            errors={errors.potvrdaLozinke}
                            onFocus={() => ocistiGresku("potvrdaLozinke")}
                            prefix={<FaLock size={12}/>}
                            suffix={repeatPasswordIcon}
                        />
                    </Col>
                </Row>
                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.OPERATERI}
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
        </CustomCard>
    )
}
