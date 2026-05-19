import {Button, Col, Form, Row} from "react-bootstrap"
import {RouteNames, ULOGE} from "../../constants"
import {Link, useNavigate} from "react-router-dom"
import OperaterService from "../../services/operateri/OperaterService"
import {ShemaOperater} from "../../schemes/ShemaOperater"
import {useEffect, useState} from "react"
import {CustomCard} from "../../components/CustomCard.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import {FaEye, FaEyeSlash, FaLock, FaUser, FaUserGear} from "react-icons/fa6";
import {CustomSelect} from "../../components/customInputs/CustomSelect.jsx";

export default function OperaterNovi() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);

    const [errors, setErrors] = useState({})
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState()

    async function dodaj(operater) {
        const rezultat = await OperaterService.dodaj(operater)
        if (rezultat.success) {
            navigate(RouteNames.OPERATERI)
        } else {
            alert(rezultat.message || "Greška pri dodavanju operatera")
        }
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        const rezultat = ShemaOperater.safeParse(objektPodataka)

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

        dodaj({
            email: podaci.get("email"),
            lozinka: podaci.get("lozinka"),
            uloga: podaci.get("uloga")
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = {...errors}
            delete noveGreske[nazivPolja]
            setErrors(noveGreske)
        }
    }

    useEffect(() => {
        const getPasswordIcon = () => {
            if (passwordShown) {
                setPasswordIcon(<FaEyeSlash
                    onClick={() => setPasswordShown(!passwordShown)}
                    className={"cursor-pointer"}
                />)
            } else {
                setPasswordIcon(<FaEye
                    onClick={() => setPasswordShown(!passwordShown)}
                    className={"cursor-pointer"}
                />)
            }
        }
        getPasswordIcon();
    }, [passwordShown])

    const uloge = [
        {
            value: "none",
            label: "Odaberite ulogu..."
        }
    ];

    Object.values(ULOGE).forEach(uloga => {
        uloge.push({
            value: uloga,
            label: uloga.charAt(0).toUpperCase() + uloga.slice(1),
        })
    });

    return (
        <CustomCard title={"Unos novog operatera"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col xs={12}>
                        <CustomInput
                            id={"email"}
                            type={"email"}
                            label={"E-mail adresa operatera"}
                            placeholder={"operater@akigoto.hr"}
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                            prefix={<FaUser size={12}/>}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <CustomInput
                            label={"Lozinka"}
                            id={"lozinka"}
                            type={passwordShown ? "text" : "password"}
                            name="lozinka"
                            placeholder="Unesite lozinku"
                            isInvalid={!!errors.lozinka}
                            errors={errors.lozinka}
                            onFocus={() => ocistiGresku("lozinka")}
                            prefix={<FaLock size={12}/>}
                            suffix={passwordIcon}
                        />
                        <span className="text-muted small">
                            Lozinka mora sadržavati: najmanje 8 znakova, veliko slovo, malo slovo, broj i interpukcijski znak (!@#$%^&*...)
                        </span>
                    </Col>
                    <Col xs={12} md={6}>
                        <CustomSelect
                            id={"uloga"}
                            label={"Uloga"}
                            podaci={uloge}
                            prefix={<FaUserGear size={12}/>}
                            isInvalid={!!errors.uloga}
                            errors={errors.uloga}
                            onFocus={() => ocistiGresku("uloge")}
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
                            Spremi
                        </Button>
                    </Col>
                </Row>
            </Form>
        </CustomCard>
    )
}