import {Link, useNavigate} from "react-router-dom";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {RouteNames} from "../../constants.js";
import {CustomCard} from "../../components/CustomCard.jsx";
import {Button, Col, Form, Row} from "react-bootstrap";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {useState} from "react";
import {ShemaKategorije} from "../../schemes/ShemaKategorije.js";

export default function NovaKategorija() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);

    const [errors, setErrors] = useState({})

    async function dodaj(kategorija) {
        await KategorijeService.dodaj(kategorija).then(() => {
            navigate(RouteNames.KATEGORIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        const rezultat = ShemaKategorije.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};
            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        dodaj({naziv: podaci.get("naziv")})
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = {...errors};
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    return (
        <CustomCard title={"Unos nove kategorije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    isInvalid={!!errors.naziv}
                    errors={errors.naziv}
                    onFocus={() => ocistiGresku("naziv")}
                />

                <Row className="mt-4">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.KATEGORIJE}
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