import {useState} from "react";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {en, Faker, hr} from "@faker-js/faker";
import KategorijeService from "../services/kategorije/KategorijeService";
import PostignucaService from "../services/postignuca/PostignucaService";


export default function GeneriranjePodataka() {
    const [brojKategorija, setBrojKategorija] = useState(5)
    const [brojPostignuca, setBrojPostignuca] = useState(20)
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    const faker = new Faker({
        locale: [hr, en]
    });

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
    };

    const generirajPostignuca = async (broj) => {

        const sveKategorije = await KategorijeService.get();
        for (let i = 0; i < broj; i++) {
            const opis = faker.helpers.arrayElement([
                `Successfully ${faker.word.verb()} ${faker.word.noun()}.`,
                `You have ${faker.word.verb()} ${faker.word.noun()}.`,
                `A reward for ${faker.word.verb()}ing ${faker.word.noun()}.`,
                `Complete the ${faker.word.adjective()} ${faker.word.noun()}.`,
            ]);
            const postignuce = {
                kategorija: faker.helpers.arrayElement(sveKategorije.data).sifra,
                naziv: `${faker.word.adjective()[0].toUpperCase()}${faker.word.adjective().slice(1)} ${faker.word.noun()[0].toUpperCase()}${faker.word.noun().slice(1)}`,
                opis: opis,
                procjena: faker.number.int({min: 1, max: 500}),
                zavrseno: faker.datatype.boolean(),
            };
            await PostignucaService.dodaj(postignuce);
        }
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
                await PostignucaService.obrisi(postignuce.kategorija, postignuce.sifra);
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
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={6}>
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
                            className="w-100"
                        >
                            {loading ? "Generiranje..." : "Generiraj kategorije"}
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
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
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? "Generiranje..." : "Generiraj postignuća"}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4"/>

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={6}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiKategorije}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? "Brisanje..." : "Obriši sve kategorije"}
                    </Button>
                </Col>
                <Col md={6}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiPostignuca}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? "Brisanje..." : "Obriši sva postignuća"}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}