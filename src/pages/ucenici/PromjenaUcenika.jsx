import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {CustomCard} from "../../components/CustomCard.jsx";
import UceniciService from "../../services/ucenici/UceniciService";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {FaTrash} from "react-icons/fa";
import {ShemaUceniciP} from "../../schemes/ShemaUceniciP.js";

export default function PromjenaUcenika() {

    const navigate = useNavigate()
    const params = useParams()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)
    const [ucenik, setUcenik] = useState({})
    const [errors, setErrors] = useState({})
    const [uplateUcenika, setUplateUcenika] = useState(ucenik?.uplate ?? []);

    async function ucitajUcenika() {
        await UceniciService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const ucitaniUcenik = odgovor.data
            setUcenik(ucitaniUcenik)
            setUplateUcenika(ucitaniUcenik.uplate);
        })
    }

    useEffect(() => {
        ucitajUcenika()
    }, [])

    async function promjeni(ucenik, datum, iznos) {
        await UceniciService.promjeni(ucenik, datum, iznos).then(() => {
            navigate(RouteNames.UCENICI)
        })
    }

    async function obrisiUplatu(sifraUplate) {
        await UceniciService.obrisiUplatu(ucenik.sifra, sifraUplate).then(() => {
            ucitajUcenika()
        })
    }

    function handleDelete(e, sifraUplate) {
        e.preventDefault()
        obrisiUplatu(sifraUplate)
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaUceniciP.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};

            // Prolazimo kroz sve issues (probleme) koje je Zod pronašao
            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        promjeni({
                sifra: ucenik.sifra,
                ime: podaci.get("ime"),
                prezime: podaci.get("prezime"),
                email: podaci.get("email"),
                uplate: ucenik.uplate,
            },
            podaci.get("datum") ? new Date(podaci.get("datum")).toISOString() : null,
            podaci.get("iznos")
        )
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = {...errors};
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };


    return (

        <CustomCard title={"Promjena učenika"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"ime"}
                            type={"text"}
                            label={"Ime"}
                            placeholder={"Unesite ime"}
                            defaultValue={ucenik.ime}
                            isInvalid={!!errors.ime}
                            errors={errors.ime}
                            onFocus={() => ocistiGresku("ime")}
                        />

                    </Col>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"iznos"}
                            type={"number"}
                            label={"Iznos uplate"}
                            placeholder={"Unesite iznos uplate"}
                            suffix={"€"}
                            isInvalid={!!errors.iznos}
                            errors={errors.iznos}
                            onFocus={() => ocistiGresku("iznos")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomInput
                            id={"prezime"}
                            type={"text"}
                            label={"Prezime"}
                            placeholder={"Unesite prezime"}
                            defaultValue={ucenik.prezime}
                            isInvalid={!!errors.prezime}
                            errors={errors.prezime}
                            onFocus={() => ocistiGresku("prezime")}
                        />

                    </Col>
                    <Col>
                        <CustomInput
                            id={"datum"}
                            type={"date"}
                            label={"Datum uplate"}
                            isInvalid={!!errors.datum}
                            errors={errors.datum}
                            onFocus={() => ocistiGresku("datum")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"email"}
                            type={"email"}
                            label={"E-mail adresa učenika"}
                            placeholder={"Unesite e-mail"}
                            defaultValue={ucenik.email}
                            isInvalid={!!errors.email}
                            errors={errors.email}
                            onFocus={() => ocistiGresku("email")}
                        />

                    </Col>
                    <Col xs={12} md={6}>
                        <h4 className="mt-3">Trenutne uplate</h4>
                        {uplateUcenika?.length > 0 ?
                            <Table striped hover responsive>
                                <thead>
                                <tr>
                                    <td>Datum</td>
                                    <td className="text-end">Iznos</td>
                                    <td className="text-center">Akcija</td>
                                </tr>
                                </thead>
                                <tbody>
                                {uplateUcenika?.sort((a, b) => new Date(a.datum) - new Date(b.datum))
                                    .map((u) =>
                                        <tr key={`naplata-${u.datum}`}>
                                            <td>{new Date(u.datum).toLocaleDateString("hr-HR")}</td>
                                            <td className="text-end">{u.iznos} €</td>
                                            <td className="text-center">
                                                <Button className="btn btnCancel btn-sm" onClick={(e) =>
                                                    handleDelete(e, u.sifra)
                                                }><FaTrash color="white"/></Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table> : <p>Nema podataka o uplati</p>
                        }
                    </Col>

                </Row>


                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.UCENICI}
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