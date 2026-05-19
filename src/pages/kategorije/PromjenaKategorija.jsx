import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {CustomCard} from "../../components/CustomCard.jsx";
import KategorijeService from "../../services/kategorije/KategorijeService.js";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {ShemaKategorije} from "../../schemes/ShemaKategorije.js";

export default function PromjenaKategorije() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina);
    const params = useParams()

    const [kategorija, setKategorija] = useState()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function ucitajKategoriju() {
            await KategorijeService.getBySifra(params.sifra).then((odgovor) => {
                if (!odgovor.success) {
                    alert("Nije implementiran servis")
                    return
                }
                const p = odgovor.data
                setKategorija(p)
            })
        }

        ucitajKategoriju()
    }, [params.sifra])

    async function promjeni(kategorija) {
        await KategorijeService.promjeni(kategorija).then(() => {
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
        promjeni({
            sifra: kategorija?.sifra,
            naziv: podaci.get("naziv")
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = {...errors};
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    return (
        <CustomCard title={"Promjena kategorije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    defaultValue={kategorija?.naziv}
                    isInvalid={!!errors.naziv}
                    errors={errors.naziv}
                    onFocus={() => ocistiGresku("naziv")}
                />
                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.KATEGORIJE}
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