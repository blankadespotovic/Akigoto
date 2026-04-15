import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {Card} from "../../components/Card";
import LekcijeService from "../../services/lekcije/LekcijeService";
import UceniciService from "../../services/ucenici/UceniciService";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import Select from "react-select";
import PostignucaService from "../../services/postignuca/PostignucaService.js";

export default function PromjenaLekcije() {

    const navigate = useNavigate()
    const params = useParams()
    const [lekcija, setLekcija] = useState({})

    const [ucenici, setUcenici] = useState([])
    const [odabraniUcenik, setOdabraniUcenik] = useState()
    const [odabraniUcenici, setOdabraniUcenici] = useState([])

    const [odabranaPostignuca, setOdabranaPostignuca] = useState([])
    const [odabranoPostignuce, setOdabranoPostignuce] = useState()
    const [postignuca, setPostignuca] = useState([])

    async function ucitajLekciju() {
        await LekcijeService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            const p = odgovor.data
            setLekcija(p)
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
        ucitajLekciju()
    }, [])

    useEffect(() => {
        if (lekcija) {
            ucitajUcenike()
            ucitajPostignuca()
        }
    }, [lekcija])

    // TODO: XX

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

    // TODO: XX

    async function promjeni(lekcija) {
        await LekcijeService.promjeni(lekcija).then(() => {
            navigate(RouteNames.LEKCIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // if (!podaci.get('Ime') || podaci.get('Ime').trim().length === 0) {
        //     alert("Ime učenika je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (podaci.get('Ime').trim().length < 3) {
        //     alert("Ime učenika mora imati najmanje 3 znaka!")
        //     return
        // }

        // if (!podaci.get('Prezime') || podaci.get('Prezime').trim() === "") {
        //     alert("Prezime učenika je obvezan i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (!podaci.get('email') || podaci.get('email').trim() === "") {
        //     alert("E-mail adresa učenika je obvezna i ne smije sadržavati samo razmake!")
        //     return
        // }

        // if (podaci.get('procjena') < 0) {
        //     alert("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
        //     return
        // }


        const postignucaIds = odabranaPostignuca.map(p => p.value)
        const uceniciIds = odabraniUcenici.map(uc => uc.value)

        promjeni({
            sifra: lekcija.sifra,
            naziv: podaci.get("naziv"),
            opis: podaci.get("opis"),
            trajanje: podaci.get("trajanje"),
            postignuca: postignucaIds,
            ucenici: uceniciIds,
        })
    }


    return (

        <Card title={"Promjena lekcije"} textAlign={"left"}>
            <Form onSubmit={odradiSubmit}>
                <CustomInput
                    id={"naziv"}
                    type={"text"}
                    label={"Naziv"}
                    placeholder={"Unesite naziv"}
                    required={true}
                    defaultValue={lekcija.naziv}
                />
                <CustomInput
                    id={"opis"}
                    type={"text"}
                    label={"Sadržaj lekcije"}
                    placeholder={"Unesite sadržaj lekcije"}
                    defaultValue={lekcija.opis}
                />
                <CustomInput
                    id={"trajanje"}
                    type={"number"}
                    label={"Trajanje lekcije"}
                    placeholder={5}
                    trebaFormatiratuVrijeme={true}
                    suffix={"min"}
                    defaultValue={lekcija.trajanje}
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
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label column={"lg"}>Odabrani učenici</Form.Label>
                        {odabraniUcenici.length > 0 ? (
                            <ul className="retro-list">
                                {odabraniUcenici.map((p) => (
                                    <li key={p.value} className="retro-item">
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
                                closeMenuOnSelect={false}
                                blurInputOnSelect={false}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label column={"lg"}>Odabrana postignuća</Form.Label>
                        {odabranaPostignuca.length > 0 ? (
                            <ul className="retro-list">
                                {odabranaPostignuca.map((p) => (
                                    <li key={p.value} className="retro-item">
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
                            Unesi izmjene
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>


    )

}