import { useEffect, useMemo, useState } from "react"

import useAuth from "../../hooks/useAuth"

import { Button, Col, Form, Row } from "react-bootstrap"
import { ShemaLogin } from "../../schemes/ShemaOperater"
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import { CustomCard } from "../../components/CustomCard.jsx";
import { FaClipboard, FaClipboardCheck, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";

export default function Login() {
    const [errors, setErrors] = useState({})

    const { login } = useAuth();

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})

        const rezultat = ShemaLogin.safeParse({
            email: podaci.get("email"),
            lozinka: podaci.get("lozinka")
        })

        if (!rezultat.success) {
            setErrors({ email: "Kombinacija email i lozinka ne odgovaraju" })
            return
        }

        login(podaci.get("email"), podaci.get("lozinka"))
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors }
            delete noveGreske[nazivPolja]
            setErrors(noveGreske)
        }
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState()

    useEffect(() => {
        const getPasswordIcon = () => {
            if (passwordShown) {
                setPasswordIcon(<FaEyeSlash onClick={() => setPasswordShown(!passwordShown)}
                    className={"cursor-pointer"} />)
            } else {
                setPasswordIcon(<FaEye onClick={() => setPasswordShown(!passwordShown)} className={"cursor-pointer"} />)
            }
        }
        getPasswordIcon();
    }, [passwordShown])

    const [copyIconEmail, setCopyIconEmail] = useState(<FaClipboard size={20} />);
    const [copyIconPassword, setCopyIconPassword] = useState(<FaClipboard size={20} />);

    const handleCopyEmail = async (e) => {
        const text = e.target.innerText.trim();
        const initialIcon = <FaClipboard size={20} />;
        setCopyIconPassword(initialIcon);
        await navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyIconEmail(<FaClipboardCheck size={20} color={"green"} />)
            })
            .catch((err) => console.error("Copy failed: ", err));
        setTimeout(() => setCopyIconEmail(initialIcon), 3000);
    };

    const handleCopyPassword = async (e) => {
        const text = e.target.innerText.trim();
        const initialIcon = <FaClipboard size={20} />;
        setCopyIconEmail(initialIcon);
        await navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyIconPassword(<FaClipboardCheck size={20} color={"green"} />)
            })
            .catch((err) => console.error("Copy failed: ", err));
        setTimeout(() => setCopyIconPassword(initialIcon), 3000);
    }

    return (
        <Form onSubmit={odradiSubmit}>
            <CustomCard
                title={"Prijava"}
                textAlign={"start"}
            >
                <Row>
                    <Col xs={12}>
                        <h4>Podaci za prijavu</h4>
                        <p>
                            <span
                                onClick={handleCopyEmail}
                                className={"d-flex align-items-center cursor-pointer"}
                            >
                                {copyIconEmail}&nbsp;admin@akigoto.hr
                            </span>
                            <span
                                onClick={handleCopyPassword}
                                className={"d-flex align-items-center cursor-pointer"}
                            >
                                {copyIconPassword}&nbsp;Akigoto123!
                            </span>
                        </p>
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
                            type="email"
                            name="email"
                            placeholder="vas@email.hr"
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                            prefix={<FaUser size={12} />}
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
                            prefix={<FaLock size={12} />}
                            suffix={passwordIcon}
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
