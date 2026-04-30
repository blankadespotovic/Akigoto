import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import PostignucaService from "../../services/postignuca/PostignucaService";
import KategorijeService from "../../services/kategorije/KategorijeService";
import { CustomSelect } from "../../components/customInputs/CustomSelect.jsx";
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import { CustomCheckbox } from "../../components/customInputs/CustomCheckbox.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { ShemaPostignuca } from "../../schemes/ShemaPostignuca.js";

export default function PromjenaPostignuca() {

    const navigate = useNavigate()
    const params = useParams()
    const [postignuce, setPostignuce] = useState({})
    const [zavrseno, setZavrseno] = useState(false)
    const [kategorije, setKategorije] = useState();
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)
    const [errors, setErrors] = useState({});

    async function dohvatiKategorije() {
        const dohvaceneKategorije = await KategorijeService.get()
            .then(res => res.data.map(kat => ({ value: kat.sifra, label: kat.naziv, })));
        setKategorije(dohvaceneKategorije)
    }

    useEffect(() => {
        if (postignuce) {
            dohvatiKategorije()
        }
    }, [postignuce])

    async function ucitajPostignuce() {
        await PostignucaService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setPostignuce(p)
            setZavrseno(p.zavrseno)
        })
    }

    useEffect(() => {
        ucitajPostignuce()
    }, [])


    async function promjeni(postignuce) {
        await PostignucaService.promjeni(postignuce).then(() => {
            navigate(RouteNames.POSTIGNUCA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaPostignuca.safeParse(objektPodataka);

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
            sifra: postignuce.sifra,
            naziv: podaci.get("naziv"),
            opis: podaci.get("opis"),
            procjena: podaci.get("procjena"),
            zavrseno: zavrseno,
            kategorija: parseInt(podaci.get("kategorija")),
        })
    }

     const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };



    return (

        <Card title={"Promjena postignuća"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <CustomSelect
                    id={"kategorija"}
                    label={"Kategorija"}
                    podaci={kategorije}
                    defaultValue={kategorije?.find(e => e.value === postignuce?.kategorija).value}
                />

                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    defaultValue={postignuce.naziv}
                    isInvalid={!!errors.naziv}
                    errors={errors.naziv}
                    onFocus={() => ocistiGresku('naziv')}
                />

                <CustomInput
                    id={"opis"}
                    type={"text"}
                    label={"Opis postignuća"}
                    defaultValue={postignuce.opis}
                    isInvalid={!!errors.opis}
                    errors={errors.opis}
                    onFocus={() => ocistiGresku('opis')}
                />

                <CustomInput
                    id={"procjena"}
                    type={"number"}
                    label={"Vremenska procjena dolaska do postignuća"}
                    placeholder={'5'}
                    suffix={"min"}
                    defaultValue={postignuce.procjena}
                    trebaFormatiratuVrijeme={true}
                    isInvalid={!!errors.procjena}
                    errors={errors.procjena}
                    onFocus={() => ocistiGresku('procjena')}
                />

                <CustomCheckbox
                    id={"zavrseno"}
                    label={"Postignuto"}
                    checked={zavrseno}
                    setOnChange={setZavrseno}
                />

                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.POSTIGNUCA}
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
        </Card>
    )

}