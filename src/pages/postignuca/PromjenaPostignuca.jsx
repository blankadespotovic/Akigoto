import {Link, useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../constants";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Card} from "../../components/Card";
import PostignucaService from "../../services/postignuca/PostignucaService";
import KategorijeService from "../../services/kategorije/KategorijeService";
import {CustomSelect} from "../../components/customInputs/CustomSelect.jsx";
import {CustomInput} from "../../components/customInputs/CustomInput.jsx";
import {CustomCheckbox} from "../../components/customInputs/CustomCheckbox.jsx";

export default function PromjenaPostignuca() {

    const navigate = useNavigate()
    const params = useParams()
    const [postignuce, setPostignuce] = useState({})
    const [zavrseno, setZavrseno] = useState(false)
    const [kategorije, setKategorije] = useState();

    async function dohvatiKategorije() {
        const dohvaceneKategorije = await KategorijeService.get()
            .then(res => res.data.map(kat => ({value: kat.sifra, label: kat.naziv,})));
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

        if (!podaci.get("naziv") || podaci.get("naziv").trim().length === 0) {
            alert("Naziv je obvezan i ne smije sadržavati samo razmake!")
            return
        }

        if (podaci.get("naziv").trim().length < 3) {
            alert("Naziv postignuća mora imati najmanje 3 znaka!")
            return
        }

        if (!podaci.get("opis") || podaci.get("opis").trim() === "") {
            alert("Opis postignuća je obvezan i ne smije sadržavati samo razmake!")
            return
        }

        if (podaci.get("opis").trim().length < 5) {
            alert("Opis postignuća mora imati najmanje 5 znakova!")
            return
        }

        if (!podaci.get("procjena") || podaci.get("procjena").trim() === "") {
            alert("Vremenska procjena dolaska do postignuća je obvezna i ne smije sadržavati samo razmake!")
            return
        }

        if (podaci.get("procjena") < 0) {
            alert("Vremenska procjena dolaska do postignuća ne može biti negativan broj!")
            return
        }

        if (podaci.get("procjena") < 1 || podaci.get("procjena") > 500) {
            alert("Vremenska procjena dolaska do postignuća mora biti između 1 i 500 sati!")
            return
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
                    required={true}
                    defaultValue={postignuce.naziv}
                />

                <CustomInput
                    id={"opis"}
                    type={"text"}
                    label={"Opis postignuća"}
                    required={true}
                    defaultValue={postignuce.opis}
                />

                <CustomInput
                    id={"procjena"}
                    type={"number"}
                    label={"Vremenska procjena dolaska do postignuća"}
                    defaultValue={postignuce.procjena}
                />

                <CustomCheckbox
                    id={"zavrseno"}
                    label={"Postignuto"}
                    checked={zavrseno}
                    setOnChange={setZavrseno}
                />

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.POSTIGNUCA} className="btn btnCancel">
                            Odustani
                        </Link>
                    </Col>
                    <Col className={"text-end"}>
                        <Button type="submit" className="btn btnAdd">
                            Promijeni postignuće
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}