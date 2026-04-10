import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Faker, hr } from "@faker-js/faker";
import KategorijeService from "../services/kategorije/KategorijeService";
import PostignucaService from "../services/postignuca/PostignucaService";
import { CustomAlert } from "../components/CustomAlert";
import { Card } from "../components/Card";


export default function GeneriranjePodataka() {
    const [brojKategorija, setBrojKategorija] = useState(5)
    const [ukupnoKategorija, setUkupnoKategorija] = useState()
    const [brojPostignuca, setBrojPostignuca] = useState(20)
    const [ukupnoPostignuca, setUkupnoPostignuca] = useState()
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    const faker = new Faker({
        locale: [hr]
    });

    const dohvatiBrojKategorija = useCallback(async () => {
        const sveKategorije = await KategorijeService.get()
        setUkupnoKategorija(sveKategorije?.data?.length)
    }, [])

    const dohvatiBrojPostignuca = useCallback(async () => {
        const svaPostignuca = await PostignucaService.getAll()
        setUkupnoPostignuca(svaPostignuca?.data?.length)
    }, [])

    useEffect(() => {
        dohvatiBrojKategorija()
    }, [dohvatiBrojKategorija])

    useEffect(() => {
        dohvatiBrojPostignuca()
    }, [dohvatiBrojPostignuca])

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
        dohvatiBrojKategorija()
    };

    const generirajPostignuca = async (broj) => {

        const sveKategorije = await KategorijeService.get();
        for (let i = 0; i < broj; i++) {
            const naziv = faker.helpers.arrayElement([
                'Prvi korak',
                'Osnove hiragane',
                'Hiragana majstor',
                'Osnove katakane',
                'Katakana majstor',
                'Kanji istraživač',
                'Rječnik u porastu',
                'Temeljno znanje gramatike'
            ]);
            const opis = faker.helpers.arrayElement([
                'Završio si svoju prvu lekciju japanskog jezika',
                'Naučio si osnovne hiragana znakove',
                'Savladao si svih 46 znakova hiragane',
                'Naučio si osnovne katakana znakove',
                'Savladao si svih 46 znakova katakane',
                'Naučio si 20 kanji znakova',
                'Naučio si 50 novih japanskih riječi.',
                'Savladao si osnovne gramatičke strukture'

            ]);
            const postignuce = {
                kategorija: faker.helpers.arrayElement(sveKategorije.data).sifra,
                naziv: naziv,
                opis: opis,
                procjena: faker.number.int({ min: 1, max: 500 }),
                zavrseno: faker.datatype.boolean(),
            };
            await PostignucaService.dodaj(postignuce);
        }
        dohvatiBrojPostignuca()
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
                    <CustomAlert variant={poruka.tip} className={'mt-2 mb-0'} dismissible onClose={() => setPoruka(null)}>
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
                        <CustomAlert variant="warning" className="mt-2" style={{ fontSize: ".9rem" }}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiKategorije}
                        disabled={loading || brojKategorija <= 0}
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
                            disabled={loading}
                            className="w-100 btn btnAdd"
                        >
                            {loading ? "Generiranje..." : "Generiraj postignuća"}
                        </Button>
                        <CustomAlert variant="warning" className="mt-2" style={{ fontSize: ".9rem" }}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiPostignuca}
                        disabled={loading || ukupnoPostignuca < 1}
                        className="w-100 mb-2 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sva postignuća"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-1" style={{ fontSize: ".9rem" }}>
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
        </Row>
    );
}