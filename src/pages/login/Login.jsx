import {useEffect, useState} from "react"
import useAuth from "../../hooks/useAuth"
import {Button, Col, Form, Row} from "react-bootstrap"
import {ShemaLogin} from "../../schemes/ShemaOperater"
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import {CustomCard} from "../../components/CustomCard.jsx";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa6";
import useBreakpoint from "../../hooks/useBreakpoint.js";

export default function Login() {
    const sirina = useBreakpoint()
    const moiblnaSirina = ["xs", "sm", "md"].includes(sirina)

    const {login} = useAuth();

    const [errors, setErrors] = useState({})
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState()
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})

        const rezultat = ShemaLogin.safeParse({
            email: podaci.get("email"),
            lozinka: podaci.get("lozinka")
        })

        if (!rezultat.success) {
            setErrors({email: "Kombinacija email i lozinka ne odgovaraju"})
            return
        }

        login(podaci.get("email"), podaci.get("lozinka"))
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

    const handleClickFill = (
        isAdmin
    ) => {
        setEmailValue(isAdmin ? "admin@akigoto.hr" : "operater@akigoto.hr");
        setPasswordValue("Akigoto123!");
    }

    return (
        <Form onSubmit={odradiSubmit}>
            <CustomCard
                title={"Prijava"}
                textAlign={"start"}
            >
                <Row>
                    <Col xs={12}>
                        <Row className={`${!moiblnaSirina && "w-100"} mt-2 mb-4 gap-2 gap-md-0`}>
                            <Col xs={12} md={6}>
                                <Button
                                    className={"btn btnInfo w-100 mx-md-2"}
                                    onClick={() => handleClickFill(true)}
                                >
                                    Admin<br/>admin@akigoto.hr
                                </Button>
                            </Col>
                            <Col xs={12} md={6}>
                                <Button
                                    className={"btn btnInfo w-100 mx-md-2"}
                                    onClick={() => handleClickFill(false)}
                                >
                                    Korisnik<br/>operater@akigoto.hr
                                </Button>
                            </Col>
                        </Row>
                        {errors.opce && (
                            <div className="alert alert-danger" role="alert">
                                {errors.opce}
                            </div>
                        )}
                    </Col>
                    <Col xs={12}>
                        <CustomInput
                            label={"E-Mail"}
                            id={"email"}
                            type={"email"}
                            name={"email"}
                            placeholder="vas@email.hr"
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                            prefix={<FaUser size={12}/>}
                            value={emailValue}
                            onChange={e => setEmailValue(e.target.value)}
                        />
                    </Col>
                    <Col xs={12}>
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
                            value={passwordValue}
                            onChange={e => setPasswordValue(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} className="mt-4 text-end">
                        <Button
                            type="submit"
                            variant="success"
                            className="btn btnSuccess w-auto"
                        >
                            Prijavi se
                        </Button>
                    </Col>
                </Row>
            </CustomCard>
        </Form>
    )
}