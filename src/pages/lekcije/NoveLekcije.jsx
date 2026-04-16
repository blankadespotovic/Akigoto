import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Card} from "../../components/Card";
import LekcijeService from "../../services/lekcije/LekcijeService";
import {useEffect, useState} from "react";
import UceniciService from "../../services/ucenici/UceniciService";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import Select from "react-select";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {WYSIWYGEditor} from "../../components/customInputs/WYSIWYGEditor.jsx";

export default function NoveLekcije() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()

    const [ucenici, setUcenici] = useState([])
    const [odabraniUcenik, setOdabraniUcenik] = useState()
    const [odabraniUcenici, setOdabraniUcenici] = useState([])

    const [odabranaPostignuca, setOdabranaPostignuca] = useState([])
    const [odabranoPostignuce, setOdabranoPostignuce] = useState()
    const [postignuca, setPostignuca] = useState([])

    async function dodaj(lekcija) {
        await LekcijeService.dodaj(lekcija).then(() => {
            navigate(RouteNames.LEKCIJE)
        })
    }

    async function ucitajUcenike() {
        await UceniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis za učenika")
                return
            }
            const filtriraniUcenici = odgovor.data.map(
                uc => ({value: parseInt(uc.sifra), label: `${uc.ime} ${uc.prezime}`})
            )
            setUcenici(filtriraniUcenici)
        })
    }

    useEffect(() => {
        ucitajUcenike()
    }, [])

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis za učenika")
                return
            }
            const filtriranaPostignuca = odgovor.data.map(
                p => ({value: parseInt(p.sifra), label: p.naziv})
            )
            setPostignuca(filtriranaPostignuca)
        })
    }

    useEffect(() => {
        ucitajPostignuca()
    }, [])

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

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        //     if(!podaci.get('naziv') || podaci.get('naziv').trim().length === 0){
        //         alert ("Naziv je obvezan i ne smije sadržavati samo razmake!")
        //         return
        //     }

        //     if(podaci.get('naziv').trim().length < 3){
        //         alert ("Naziv postignuca mora imati najmanje 3 znaka!")
        //         return
        //     }

        //     if(!podaci.get('opis') || podaci.get('opis').trim() === ""){
        //         alert ("Opis postignuća je obvezan i ne smije sadržavati samo razmake!")
        //         return
        //     }

        //      if(podaci.get('opis').trim().length < 5){
        //         alert ("Opis postignuća mora imati najmanje 5 znakova!")
        //         return
        //     }

        //     if(!podaci.get('procjena') || podaci.get('procjena').trim() === ""){
        //         alert ("Vremenska procjena dolaska do postignuća je obvezna i ne smije sadržavati samo razmake!")
        //         return
        //     }

        //     if(podaci.get('procjena') < 0){
        //         alert ("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
        //         return
        //     }

        //       if(podaci.get('procjena') <1 || podaci.get('procjena') > 500){
        //         alert ("Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!")
        //         return
        //     }

        const postignucaIds = odabranaPostignuca.map(p => p.value)
        const uceniciIds = odabraniUcenici.map(uc => uc.value)

        dodaj({
            naziv: podaci.get("naziv"),
            opis: opisVrijednost,
            trajanje: podaci.get("trajanje"),
            postignuca: postignucaIds,
            ucenici: uceniciIds,
        })
    }


    const [opisVrijednost, setOpisVrijednost] = useState("")

    return (

        <Card title={"Unos nove lekcije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    required={true}
                />

                <Form.Group controlId={"opis"}>
                    <Form.Label column={"lg"}>Sadržaj lekcije</Form.Label>
                    <WYSIWYGEditor
                        value={opisVrijednost}
                        onChange={(e) => setOpisVrijednost(e.target.value)}
                        name={"opis"}
                    />
                </Form.Group>

                <CustomInput
                    id={"trajanje"}
                    type={"number"}
                    label={"Trajanje lekcije"}
                    placeholder={5}
                    trebaFormatiratuVrijeme={true}
                    suffix={"min"}
                />

                <hr/>
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
                        ) : <><br/><small>Odaberite učenike za prikaz.</small></>}
                    </Col>
                </Row>
                <hr/>
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
                                            size="sm"
                                            className="retro-remove"
                                            onClick={() => ukloniPostignuca(p.value)}
                                        >
                                            ×
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : <><br/><small>Odaberite postignuća za prikaz.</small></>}
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
                            Spremi
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )
}