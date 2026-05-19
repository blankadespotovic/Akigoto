import {Button, Col, Form, Row} from "react-bootstrap"
import {RouteNames} from "../../constants"
import {useNavigate} from "react-router-dom"
import OperaterService from "../../services/operateri/OperaterService"
import {ShemaOperater} from "../../schemes/ShemaOperater"
import {useEffect, useState} from "react"
import {CustomCard} from "../../components/CustomCard.jsx";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa6";

export default function Registracija() {
    const navigate = useNavigate()

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

    async function registriraj(operater) {
        await OperaterService.dodaj(operater).then(() => {
            navigate(RouteNames.LOGIN)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        if (podaci.get("lozinka") !== podaci.get("potvrdaLozinke")) {
            setErrors({potvrdaLozinke: "Lozinke se ne podudaraju!"})
            return
        }

        const rezultat = ShemaOperater.safeParse({
            email: objektPodataka.email,
            lozinka: objektPodataka.lozinka,
            uloga: "korisnik"
        })

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

        registriraj({
            email: podaci.get("email"),
            lozinka: podaci.get("lozinka"),
            uloga: "korisnik"
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

    return (
        <Form onSubmit={odradiSubmit}>
            <CustomCard
                title={"Registracija"}
                textAlign={"start"}
            >
                <Row>
                    <Col xs={12}>
                        <CustomInput
                            label={"E-Mail"}
                            id={"email"}
                            type="email"
                            name="email"
                            placeholder="vas@email.hr"
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                            autoComplete="email"
                            prefix={<FaUser size={12}/>}
                        />
                    </Col>
                    <Col md={6}>
                        <CustomInput
                            label={"Lozinka"}
                            id={"lozinka"}
                            type={passwordShown ? "text" : "password"}
                            name="lozinka"
                            placeholder="Unesite lozinku"
                            isInvalid={!!errors.lozinka}
                            errors={errors.lozinka}
                            onFocus={() => ocistiGresku("lozinka")}
                            autoComplete="password"
                            prefix={<FaLock size={12}/>}
                            suffix={passwordIcon}
                        />
                    </Col>
                    <Col md={6}>
                        <CustomInput
                            label={"Ponovite lozinku"}
                            id={"potvrdaLozinke"}
                            type={repeatPasswordShown ? "text" : "password"}
                            name="potvrdaLozinke"
                            placeholder="Ponovite lozinku"
                            isInvalid={!!errors.potvrdaLozinke}
                            errors={errors.potvrdaLozinke}
                            onFocus={() => ocistiGresku("potvrdaLozinke")}
                            autoComplete="password"
                            prefix={<FaLock size={12}/>}
                            suffix={repeatPasswordIcon}
                        />
                    </Col>
                </Row>
                <hr/>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button
                        type="submit"
                        variant="success"
                        className="btn btnSuccess w-auto"
                    >
                        Registriraj se
                    </Button>
                </div>
            </CustomCard>
        </Form>
    )
}