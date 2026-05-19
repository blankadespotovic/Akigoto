import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CustomCard } from "../../components/CustomCard.jsx";
import LekcijeService from "../../services/lekcije/LekcijeService";
import UceniciService from "../../services/ucenici/UceniciService";
import { CustomInput } from "../../components/customInputs/CustomInput.jsx";
import Select from "react-select";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { WYSIWYGEditor } from "../../components/customInputs/WYSIWYGEditor.jsx";
import { ShemaLekcije } from "../../schemes/ShemaLekcije.js";

export default function PromjenaLekcije() {

    const navigate = useNavigate()
    const params = useParams()
    const sirina = useBreakpoint()
    const [lekcija, setLekcija] = useState({})
    const [opisVrijednost, setOpisVrijednost] = useState()

    const [ucenici, setUcenici] = useState([])
    const [odabraniUcenik, setOdabraniUcenik] = useState()
    const [odabraniUcenici, setOdabraniUcenici] = useState([])

    const [odabranaPostignuca, setOdabranaPostignuca] = useState([])
    const [odabranoPostignuce, setOdabranoPostignuce] = useState()
    const [postignuca, setPostignuca] = useState([])

    const [errors, setErrors] = useState({})

    async function ucitajLekciju() {
        await LekcijeService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setLekcija(p)
            setOpisVrijednost(p.opis)
        })
    }

    async function ucitajUcenike() {
        await UceniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis za učenika")
                return
            }
            const filtriraniUcenici = odgovor.data.map(
                uc => ({ value: uc.sifra, label: `${uc.ime} ${uc.prezime}` })
            )
            setUcenici(filtriraniUcenici)
        })
    }

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis za učenika")
                return
            }
            const filtriranaPostignuca = odgovor.data.map(
                p => ({ value: parseInt(p.sifra), label: p.naziv })
            )
            setPostignuca(filtriranaPostignuca)
        })
    }

    useEffect(() => {
        ucitajLekciju()
    }, [])

    useEffect(() => {
        if (lekcija) {
            ucitajUcenike()
            ucitajPostignuca()
        }
    }, [lekcija])


    useEffect(() => {
        const pronadjiOdabraneUcenike = async () => {
            if (lekcija?.ucenici?.length > 0) {
                const dohvaceniUcenici = [];
                for (const sifra of lekcija.ucenici) {
                    const ucenikOdgovor = await UceniciService.getBySifra(sifra)
                    dohvaceniUcenici.push({
                        value: ucenikOdgovor.data.sifra,
                        label: `${ucenikOdgovor.data.ime} ${ucenikOdgovor.data.prezime}`
                    })
                }
                setOdabraniUcenici(dohvaceniUcenici);
                setUcenici(prev => prev.filter(obj => !lekcija.ucenici.includes(obj.value)))
            }
        }

        if (ucenici) pronadjiOdabraneUcenike()
    }, [lekcija.ucenici])


    useEffect(() => {
        const pronadjiOdabranaPostignuca = async () => {
            if (lekcija?.postignuca?.length > 0) {
                const dohvacenaPostignuca = [];
                for (const sifra of lekcija.postignuca) {
                    const postignuceOdgovor = await PostignucaService.getBySifra(sifra)
                    dohvacenaPostignuca.push({
                        value: postignuceOdgovor.data.sifra,
                        label: postignuceOdgovor.data.naziv
                    })
                }
                setOdabranaPostignuca(dohvacenaPostignuca);
                setPostignuca(prev => prev.filter(obj => !lekcija.postignuca.includes(obj.value)))
            }
        }

        if (ucenici) pronadjiOdabranaPostignuca()
    }, [lekcija.postignuca])

    function dodajUcenike(ucenik) {
        setOdabraniUcenik(null);
        setUcenici(prev => prev.filter(o => o.value !== ucenik.value));
        setOdabraniUcenici([...odabraniUcenici, ucenik])
    }

    function ukloniUcenike(sifra) {
        setUcenici(prev => {
            const pronadjeniUcenik = odabraniUcenici.find(a => a.value === sifra);
            if (!pronadjeniUcenik) return prev;
            return [...prev, pronadjeniUcenik].sort((a, b) => a.value - b.value);
        });
        setOdabraniUcenici(prev => prev.filter(p => p.value !== sifra));
    }

    function dodajPostignuca(postignuce) {
        setOdabranoPostignuce(null);
        setPostignuca(prev => prev.filter(o => o.value !== postignuce.value));
        setOdabranaPostignuca(prev => [...prev, postignuce]);
    }

    function ukloniPostignuca(sifra) {
        setPostignuca(prev => {
            const pronadjenoPostignuce = odabranaPostignuca.find(a => a.value === sifra);
            if (!pronadjenoPostignuce) return prev;
            return [...prev, pronadjenoPostignuce].sort((a, b) => a.value - b.value);
        });
        setOdabranaPostignuca(prev => prev.filter(p => p.value !== sifra));
    }


    async function promjeni(lekcija) {
        await LekcijeService.promjeni(lekcija).then(() => {
            navigate(RouteNames.LEKCIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        podaci.append("opis", opisVrijednost)
        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaLekcije.safeParse(objektPodataka);

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


        const postignucaIds = odabranaPostignuca.map(p => p.value)
        const uceniciIds = odabraniUcenici.map(uc => uc.value)

        promjeni({
            sifra: lekcija.sifra,
            naziv: podaci.get("naziv"),
            opis: opisVrijednost,
            trajanje: podaci.get("trajanje"),
            postignuca: postignucaIds,
            ucenici: uceniciIds,
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

        <CustomCard title={"Promjena lekcije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"naziv"}
                            type={"text"}
                            label={"Naziv"}
                            placeholder={"Unesite naziv"}
                            defaultValue={lekcija.naziv}
                            isInvalid={!!errors.naziv}
                            errors={errors.naziv}
                            onFocus={() => ocistiGresku('naziv')}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <CustomInput
                            id={"trajanje"}
                            type={"number"}
                            label={"Trajanje lekcije"}
                            placeholder={5}
                            trebaFormatiratuVrijeme={true}
                            suffix={"min"}
                            defaultValue={lekcija.trajanje}
                            isInvalid={!!errors.trajanje}
                            errors={errors.trajanje}
                            onFocus={() => ocistiGresku('trajanje')}
                        />
                    </Col>
                </Row>

                <Form.Group controlId={"opis"}>
                    <Form.Label column={"lg"}>Sadržaj lekcije</Form.Label>
                    <WYSIWYGEditor
                        value={opisVrijednost}
                        onChange={(e) => setOpisVrijednost(e.target.value)}
                        name={"opis"}
                        isInvalid={!!errors.opis}
                        errors={errors.opis}
                        onFocus={() => ocistiGresku('opis')}
                    />
                </Form.Group>

                <hr />
                <Row gutter={16}>
                    <Col xs={12} md={6}>
                        <Form.Group controlId={"ucenici"}>
                            <Form.Label column={"lg"}>Odaberite učenike</Form.Label>
                            <Select
                                options={ucenici}
                                isSearchable
                                placeholder="Traži učenike..."
                                onChange={(e) => dodajUcenike(e)}
                                value={odabraniUcenik}
                                className="custom-react-select"
                                classNamePrefix="rs"
                                menuPortalTarget={document.body}
                                closeMenuOnSelect={["xs", "sm", "md"].includes(sirina)}
                                blurInputOnSelect={["xs", "sm", "md"].includes(sirina)}
                                noOptionsMessage={() => 'Nema učenika'}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label column={"lg"}>Odabrani učenici</Form.Label>
                        {odabraniUcenici.length > 0 ? (
                            <ul className="retro-list">
                                {odabraniUcenici.map((p) => (
                                    <li
                                        key={p.value}
                                        className="retro-item"
                                        onClick={() => ukloniUcenike(p.value)}
                                    >
                                        <span className="retro-label">{p.label}</span>

                                        <Button
                                            variant="light"
                                            size="sm"
                                            className="retro-remove"
                                            onClick={() => ukloniUcenike(p.value)}
                                        >
                                            ×
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : <><br /><small>Odaberite učenike za prikaz.</small></>}
                    </Col>
                </Row>
                <hr />
                <Row gutter={16}>
                    <Col xs={12} md={6}>
                        <Form.Group controlId={"postignuca"}>
                            <Form.Label column={"lg"}>Odaberite postignuća</Form.Label>
                            <Select
                                options={postignuca}
                                isSearchable
                                placeholder="Traži postignuća..."
                                onChange={(e) => dodajPostignuca(e)}
                                value={odabranoPostignuce}
                                className="custom-react-select"
                                classNamePrefix="rs"
                                menuPortalTarget={document.body}
                                closeMenuOnSelect={["xs", "sm", "md"].includes(sirina)}
                                blurInputOnSelect={["xs", "sm", "md"].includes(sirina)}
                                noOptionsMessage={() => 'Nema postignuća'}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label column={"lg"}>Odabrana postignuća</Form.Label>
                        {odabranaPostignuca.length > 0 ? (
                            <ul className="retro-list">
                                {odabranaPostignuca.map((p) => (
                                    <li
                                        key={p.value}
                                        className="retro-item"
                                        onClick={() => ukloniPostignuca(p.value)}
                                    >
                                        <span className="retro-label">{p.label}</span>
                                        <Button
                                            variant="light"
                                            size="lg"
                                            className="retro-remove"
                                            onClick={() => ukloniPostignuca(p.value)}
                                        >
                                            ×
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : <><br /><small>Odaberite postignuća za prikaz.</small></>}
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.LEKCIJE} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>
        </CustomCard>


    )

}