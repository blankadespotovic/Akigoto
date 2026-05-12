import {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import OperaterService from "../../services/operateri/OperaterService"
import {Button, Col, Form, Row} from "react-bootstrap"
import {RouteNames} from "../../constants"
import {z} from "zod"
import {CustomCard} from "../../components/CustomCard.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";

export default function OperaterPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [operater, setOperater] = useState({})
    const [errors, setErrors] = useState({})
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)

    // Shema za email i ulogu (bez lozinke)
    const ShemaEmailUloga = z.object({
        email: z.string()
            .trim()
            .min(1, "Email je obavezan!")
            .email("Unesite ispravan email format!"),
        uloga: z.enum(["admin", "korisnik"], {
            errorMap: () => ({message: "Uloga mora biti 'admin' ili 'korisnik'!"})
        })
    })

    async function ucitajOperatera() {
        const odgovor = await OperaterService.getBySifra(params.sifra)
        if (!odgovor.success) {
            alert("Operater nije pronađen")
            navigate(RouteNames.OPERATERI)
            return
        }
        setOperater(odgovor.data)
    }

    useEffect(() => {
        ucitajOperatera()
    }, [])

    async function promjeni(operater) {
        const rezultat = await OperaterService.promjeni(params.sifra, operater)
        if (rezultat.success) {
            navigate(RouteNames.OPERATERI)
        } else {
            alert(rezultat.message || "Greška pri promjeni operatera")
        }
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        // Provjera pomoću Zod sheme
        const rezultat = ShemaEmailUloga.safeParse(objektPodataka)

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

        promjeni({
            email: podaci.get("email"),
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

    return (
        <CustomCard title={"Promjena operatera"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"email"}
                            type={"email"}
                            label={"E-Mail"}
                            defaultValue={operater.email}
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                       
                        <Form.Group controlId="uloga" className="mb-3">
                            <Form.Label className="fw-bold">Uloga</Form.Label>
                            <Form.Select
                                onChange={(e) => setOperater({...operater, uloga: e.target.value})}
                                name="uloga"
                                value={operater.uloga || ""}
                                isInvalid={!!errors.uloga}
                                onFocus={() => ocistiGresku("uloga")}
                            >
                                <option value="">Odaberite ulogu...</option>
                                <option value="admin">Admin</option>
                                <option value="korisnik">Korisnik</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.uloga}
                            </Form.Control.Feedback>
                        </Form.Group>
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
