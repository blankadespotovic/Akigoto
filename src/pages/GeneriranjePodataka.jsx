import {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Faker, hr} from "@faker-js/faker";
import KategorijeService from "../services/kategorije/KategorijeService";
import PostignucaService from "../services/postignuca/PostignucaService";
import {CustomAlert} from "../components/CustomAlert";
import {Card} from "../components/Card";
import UceniciService from "../services/ucenici/UceniciService.js";


export default function GeneriranjePodataka() {
    const [brojKategorija, setBrojKategorija] = useState(5)
    const [ukupnoKategorija, setUkupnoKategorija] = useState()
    const [brojPostignuca, setBrojPostignuca] = useState(20)
    const [ukupnoPostignuca, setUkupnoPostignuca] = useState()
    const [brojUcenika, setBrojUcenika] = useState(15)
    const [ukupnoUcenika, setUkupnoUcenika] = useState()
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);
    const [spol, setSpol] = useState(null);

    const faker = new Faker({
        locale: [hr]
    });

    const dohvatiBrojKategorija = async () => {
        const sveKategorije = await KategorijeService.get()
        setUkupnoKategorija(sveKategorije?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojKategorija()
    }, [])

    const dohvatiBrojPostignuca = async () => {
        const svaPostignuca = await PostignucaService.getAll()
        setUkupnoPostignuca(svaPostignuca?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojPostignuca()
    }, [])

    const dohvatiBrojUcenika = async () => {
        const sviUcenici = await UceniciService.get()
        setUkupnoUcenika(sviUcenici?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojUcenika()
    }, [])


    const generirajKategorije = async (broj) => {
        const naziviKategorija = [
            "Osnove jezika",
            "Hiragana",
            "Katakana",
            "Kanji",
            "Rječnik",
            "Gramatika",
            "Slušanje",
            "Čitanje",
            "Pisanje",
            "Razgovor",
            "Kultura i običaji"
        ];

        for (let i = 0; i < broj; i++) {
            await KategorijeService.dodaj({
                kategorija: naziviKategorija[i % naziviKategorija.length] + (i >= naziviKategorija.length ? ` ${Math.floor(i / naziviKategorija.length) + 1}` : ""),
            });
        }
        await dohvatiBrojKategorija()
    };

    const generirajPostignuca = async (broj) => {

        const sveKategorije = await KategorijeService.get();
        for (let i = 0; i < broj; i++) {
            const naziv = faker.helpers.arrayElement([
                "Prvi korak",
                "Osnove hiragane",
                "Hiragana majstor",
                "Osnove katakane",
                "Katakana majstor",
                "Kanji istraživač",
                "Rječnik u porastu",
                "Temeljno znanje gramatike"
            ]);
            const opis = faker.helpers.arrayElement([
                "Završio si svoju prvu lekciju japanskog jezika",
                "Naučio si osnovne hiragana znakove",
                "Savladao si svih 46 znakova hiragane",
                "Naučio si osnovne katakana znakove",
                "Savladao si svih 46 znakova katakane",
                "Naučio si 20 kanji znakova",
                "Naučio si 50 novih japanskih riječi.",
                "Savladao si osnovne gramatičke strukture"

            ]);
            const postignuce = {
                kategorija: faker.helpers.arrayElement(sveKategorije.data).sifra,
                naziv: naziv,
                opis: opis,
                procjena: faker.number.int({min: 1, max: 500}),
                zavrseno: faker.datatype.boolean(),
            };
            await PostignucaService.dodaj(postignuce);
        }
        await dohvatiBrojPostignuca()
    };

    const fixLastNameSpacing = (str) => {
        return str.replaceAll(/([a-zčćžšđ])([A-ZČĆŽŠĐ])/g, "$1 $2");
    };

    const normalizeForEmail = (str) => {
        return str
            .replaceAll("đ", "d")
            .replaceAll("Đ", "D")
            .replaceAll(/([a-zčćžšđ])([A-ZČĆŽŠĐ])/g, "$1 $2")
            .normalize("NFD")
            .replaceAll(/[\u0300-\u036f]/g, "")
            .replaceAll(/\s+/g, ".")
            .toLowerCase()
            .replaceAll(/[^a-z0-9.]/g, "");
    };

    const generirajUcenike = async (broj) => {
        const domene = [
            "gmail",
            "yahoo",
            "outlook",
            "hotmail",
            "proton",
            "icloud",
            "example",
            "mail",
            "test",
            "company"
        ];

        const topLevelDomena = ["com", "net", "org", "io", "dev"];

        for (let i = 0; i < broj; i++) {
            const spolParsed = spol || undefined;
            const imeRaw = faker.person.firstName(spolParsed);
            const prezimeRaw = faker.person.lastName(spolParsed);
            const prezimePrikaz = fixLastNameSpacing(prezimeRaw);

            const firstNameEmail = normalizeForEmail(imeRaw);
            const lastNameEmail = normalizeForEmail(prezimeRaw);

            const email = `${firstNameEmail}.${lastNameEmail}@${faker.helpers.arrayElement(domene)}.${faker.helpers.arrayElement(topLevelDomena)}`;
            const ucenik = {
                ime: imeRaw,
                prezime: prezimePrikaz,
                email: email,
            };
            await UceniciService.dodaj(ucenik);
        }
        dohvatiBrojUcenika()
    };

    const handleGenerirajKategorije = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajKategorije(brojKategorija);

            setPoruka({
                tip: "success",
                tekst: `Uspješno generirano ${brojKategorija} kategorija!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri generiranju kategorija: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajPostignuca = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {

            await generirajPostignuca(brojPostignuca);

            setPoruka({
                tip: "success",
                tekst: `Uspješno generirano ${brojPostignuca} postignuća!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri generiranju postignuća: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajUcenike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {

            await generirajUcenike(brojUcenika);

            setPoruka({
                tip: "success",
                tekst: `Uspješno generirano ${brojUcenika} učenika!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri generiranju učenika: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKategorije = async () => {
        if (!window.confirm("Jeste li sigurni da želite obrisati sve kategorije?")) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KategorijeService.get();
            const kategorije = rezultat.data;

            for (const kategorija of kategorije) {
                await KategorijeService.obrisi(kategorija.sifra);
            }

            setPoruka({
                tip: "success",
                tekst: `Uspješno obrisano ${kategorije.length} kategorija!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri brisanju kategorija: " + error.message
            });
        } finally {
            setLoading(false);
            dohvatiBrojKategorija()
            dohvatiBrojPostignuca()
        }
    };

    const handleObrisiPostignuca = async () => {
        if (!window.confirm("Jeste li sigurni da želite obrisati sva postignuća?")) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await PostignucaService.getAll();
            const postignuca = rezultat.data;

            for (const postignuce of postignuca) {
                await PostignucaService.obrisi(postignuce.kategorija, postignuce.sifra)
            }

            setPoruka({
                tip: "success",
                tekst: `Uspješno obrisano ${postignuca.length} postignuća!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri brisanju postignuća: " + error.message
            });
        } finally {
            setLoading(false)
            dohvatiBrojPostignuca()
        }
    };

    const handleObrisiUcenike = async () => {
        if (!window.confirm("Jeste li sigurni da želite obrisati sve učenike?")) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await UceniciService.get();
            const ucenici = rezultat.data;

            for (const ucenik of ucenici) {
                await UceniciService.obrisi(ucenik.sifra);
            }

            setPoruka({
                tip: "success",
                tekst: `Uspješno obrisano ${ucenici.length} učenika!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri brisanju učenika: " + error.message
            });
        } finally {
            setLoading(false);
            dohvatiBrojUcenika()
        }
    };

    return (
        <Row className="mt-2">
            <Col md={12}>
                <CustomAlert variant={"info"} className={"mb-0"}>
                    Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima ili brisanje svih
                    podataka
                    iz baze.
                </CustomAlert>
                {poruka && (
                    <CustomAlert variant={poruka.tip} className={"mt-2 mb-0"} dismissible
                                 onClose={() => setPoruka(null)}>
                        {poruka.tekst}
                    </CustomAlert>
                )}
            </Col>
            <Col md={6}>
                <Card
                    title={`Kategorije [trenutno: ${ukupnoKategorija}]`}
                    textAlign={"start"}
                >
                    <Form onSubmit={handleGenerirajKategorije}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj kategorija</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojKategorija}
                                onChange={(e) => setBrojKategorija(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj kategorija (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100 btn btnAdd"
                        >
                            {loading ? "Generiranje..." : "Generiraj kategorije"}
                        </Button>
                        <CustomAlert variant="warning" className="mt-2" style={{fontSize: ".9rem"}}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiKategorije}
                        disabled={loading || brojKategorija < 1}
                        className="w-100 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sve kategorije"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-2">
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
            <Col md={6}>
                <Card
                    title={`Postignuća [trenutno: ${ukupnoPostignuca}]`}
                    textAlign={"start"}
                >
                    <Form onSubmit={handleGenerirajPostignuca}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj postignuća</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojPostignuca}
                                onChange={(e) => setBrojPostignuca(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj postignuća (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading || ukupnoKategorija < 1}
                            className="w-100 btn btnAdd"
                        >
                            {loading ? "Generiranje..." : "Generiraj postignuća"}
                        </Button>
                        <CustomAlert variant="warning" className="mt-2" style={{fontSize: ".9rem"}}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiPostignuca}
                        disabled={loading || ukupnoPostignuca < 1}
                        className="w-100 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sva postignuća"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-2">
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
            <Col md={6}>
                <Card
                    title={`Učenici [trenutno: ${ukupnoUcenika}]`}
                    textAlign={"start"}
                >
                    <Form onSubmit={handleGenerirajUcenike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj učenika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojUcenika}
                                onChange={(e) => setBrojUcenika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj učenika (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center gap-3 justify-content-center generiraj-ucenike">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                className="w-100 btn btnAdd"
                            >
                                {loading ? "Generiranje..." : "Generiraj učenike"}
                            </Button>

                            <Form.Check
                                type="radio"
                                label="M"
                                name="spol"
                                checked={spol === "male"}
                                onChange={() => setSpol("male")}
                                disabled={loading}
                            />

                            <Form.Check
                                type="radio"
                                label="Ž"
                                name="spol"
                                checked={spol === "female"}
                                onChange={() => setSpol("female")}
                                disabled={loading}
                            />
                            <Form.Check
                                type="radio"
                                label="Oba"
                                name="spol"
                                checked={spol === null}
                                onChange={() => setSpol(null)}
                                disabled={loading}
                            />
                        </Form.Group>
                        <CustomAlert variant="warning" className="mt-2" style={{fontSize: ".9rem"}}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiUcenike}
                        disabled={loading || brojUcenika < 1}
                        className="w-100 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sve učenike"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-2">
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
        </Row>
    );
}