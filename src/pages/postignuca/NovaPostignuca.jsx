import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Card } from "../../components/Card";
import PostignucaService from "../../services/postignuca/PostignucaService";
import KategorijeService from "../../services/kategorije/KategorijeService";
import { CustomSelect } from "../../components/customInputs/CustomSelect.jsx";
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import { CustomCheckbox } from "../../components/customInputs/CustomCheckbox.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { ShemaPostignuca } from "../../schemes/ShemaPostignuca.js";
import { useRive, useStateMachineInput } from "rive-react";

export default function NovaPostignuca() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const mobilnaSirina = ["xs", "sm", "md"].includes(sirina)
    const [kategorije, setKategorije] = useState();
    const [errors, setErrors] = useState({})

    const [spustiRuke, setSpustiRuke] = useState(true);

    const { rive, RiveComponent } = useRive({
        src: '/animacija.riv',
        stateMachines: 'State Machine 1', // Važno: mora odgovarati nazivu u Rive editoru
        autoplay: true,
    });

    // Povezivanje s inputima iz Rive-a
    const isHandsUp = useStateMachineInput(rive, 'State Machine 1', 'hands_up');
    const fail = useStateMachineInput(rive, 'State Machine 1', 'fail');



    useEffect(() => {
        if (!rive || !isHandsUp) return;

        if (!spustiRuke) {
            // 1. Podigni ruke
            isHandsUp.value = true;
            // 2. Ako je tek pokrenut submit (puna lista grešaka), "stisni" fail trigger
            if (fail) fail.fire();
        } else {
            isHandsUp.value = false;
        }
    }, [errors, isHandsUp, fail, rive]);


    async function dohvatiKategorije() {
        const dohvaceneKategorije = await KategorijeService.get()
            .then(res => res.data.map(kat => ({ value: kat.sifra, label: kat.naziv, })));
        setKategorije(dohvaceneKategorije);
    }

    useEffect(() => {
        dohvatiKategorije()
    }, [])



    async function dodaj(postignuce) {
        //console.table(postignuce)
        await PostignucaService.dodaj(postignuce).then(() => {
            navigate(RouteNames.POSTIGNUCA)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        setSpustiRuke(true)
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
            setSpustiRuke(false)
            return;
        }

        dodaj({
            kategorija: parseInt(podaci.get("kategorija")),
            naziv: podaci.get("naziv"),
            opis: podaci.get("opis"),
            procjena: podaci.get("procjena"),
            zavrseno: podaci.get("zavrseno") === "on"
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    // Dodajemo interaktivnost na fokus polja
    const handleFocus = (nazivPolja) => {
        ocistiGresku(nazivPolja);
        if (isChecking) isChecking.value = true;
    };

    const handleBlur = () => {
        if (isChecking) isChecking.value = false;
    };

    const handleChangeInput = (e) => {
        if (e.target.value) {
            if(spustiRuke === false)
            setSpustiRuke(true);

            if (isHandsUp) {
                isHandsUp.value = false; // odmah spusti ruke
            }
        }
    };


    return (

        <Card title={"Unos novog postignuća"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <Row>
                    <Col xs={9}>
                        <CustomSelect
                            id={"kategorija"}
                            label={"Kategorija"}
                            podaci={kategorije}
                        />

                        <CustomInput
                            id={"naziv"}
                            type={"text"}
                            label={"Naziv"}
                            placeholder={'Unesite naziv'}
                            isInvalid={!!errors.naziv}
                            errors={errors.naziv}
                            onFocus={() => ocistiGresku('naziv')}
                            onChange={handleChangeInput}
                        />


                        <CustomInput
                            id={"opis"}
                            type={"text"}
                            label={"Opis postignuća"}
                            placeholder={'Unesite opis'}
                            isInvalid={!!errors.opis}
                            errors={errors.opis}
                            onFocus={() => ocistiGresku('opis')}
                        />


                        <CustomInput
                            id={"procjena"}
                            type={"number"}
                            label={"Vremenska procjena dolaska do postignuća"}
                            placeholder={'5'}
                            isInvalid={!!errors.procjena}
                            suffix={"min"}
                            trebaFormatiratuVrijeme={true}
                            isInvalid={!!errors.procjena}
                            errors={errors.procjena}
                            onFocus={() => ocistiGresku('procjena')}
                        />


                        <CustomCheckbox
                            id={"zavrseno"}
                            label={"Postignuto"}
                        />
                    </Col>
                    <Col xs={3} className="d-flex align-items-center justify-content-center">
                        <RiveComponent style={{ height: "200px", width: "200px" }} />
                    </Col>
                </Row>

                <Row className="mt-4 justi">
                    <Col xs={12} md={6} className={"order-2 order-md-1"}>
                        <Link to={RouteNames.POSTIGNUCA}
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
        </Card>


    )
}