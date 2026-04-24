import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Faker, hr } from "@faker-js/faker";
import KategorijeService from "../services/kategorije/KategorijeService";
import PostignucaService from "../services/postignuca/PostignucaService";
import { CustomAlert } from "../components/CustomAlert";
import { Card } from "../components/Card";
import UceniciService from "../services/ucenici/UceniciService.js";
import LekcijeService from "../services/lekcije/LekcijeService.js";
import { CustomInput } from "../components/customInputs/CustomInput.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";


export default function GeneriranjePodataka() {
    const sirina = useBreakpoint()
    const [brojKategorija, setBrojKategorija] = useState(5)
    const [ukupnoKategorija, setUkupnoKategorija] = useState()
    const [brojPostignuca, setBrojPostignuca] = useState(20)
    const [ukupnoPostignuca, setUkupnoPostignuca] = useState()
    const [svaPostignuca, setSvaPostignuca] = useState()
    const [brojUcenika, setBrojUcenika] = useState(15)
    const [ukupnoUcenika, setUkupnoUcenika] = useState()
    const [sviUcenici, setSviUcenici] = useState()
    const [brojLekcija, setBrojLekcija] = useState(5)
    const [ukupnoLekcija, setUkupnoLekcija] = useState()
    const [poruka, setPoruka] = useState(null)
    const [loading, setLoading] = useState(false)
    const [spol, setSpol] = useState(null)
    const moiblnaSirina = ["xs", "sm", "md"].includes(sirina)

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
        const svaPostignuca = await PostignucaService.get()
        setSvaPostignuca(svaPostignuca?.data)
        setUkupnoPostignuca(svaPostignuca?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojPostignuca()
    }, [])

    const dohvatiBrojUcenika = async () => {
        const sviUcenici = await UceniciService.get()
        setSviUcenici(sviUcenici?.data)
        setUkupnoUcenika(sviUcenici?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojUcenika()
    }, [])

    const dohvatiBrojLekcija = async () => {
        const sveLekcije = await LekcijeService.get()
        setUkupnoLekcija(sveLekcije?.data?.length)
    }

    useEffect(() => {
        dohvatiBrojLekcija()
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
                naziv: naziviKategorija[i % naziviKategorija.length] + (i >= naziviKategorija.length ? ` ${Math.floor(i / naziviKategorija.length) + 1}` : ""),
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
            const kat = parseInt(faker.helpers.arrayElement(sveKategorije.data).sifra)
            const postignuce = {
                naziv: naziv,
                opis: opis,
                kategorija: kat,
                procjena: faker.number.int({ min: 1, max: 500 }),
                zavrseno: faker.datatype.boolean(),
            };
            await PostignucaService.dodaj(postignuce);
        }
        await dohvatiBrojPostignuca()
    };

    const popraviRazmakeUPrezimenu = (str) => {
        return str.replaceAll(/([a-zčćžšđ])([A-ZČĆŽŠĐ])/g, "$1 $2");
    };

    const normalizirajZaEMail = (str) => {
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
            const prezimePrikaz = popraviRazmakeUPrezimenu(prezimeRaw);

            const firstNameEmail = normalizirajZaEMail(imeRaw);
            const lastNameEmail = normalizirajZaEMail(prezimeRaw);

            const email = `${firstNameEmail}.${lastNameEmail}@${faker.helpers.arrayElement(domene)}.${faker.helpers.arrayElement(topLevelDomena)}`;
            const brojUplata = faker.number.int({ min: 1, max: 5 })
            const uplate = []
            for (let i = 1; i <= brojUplata; i++){
                uplate.push({
                    sifra: i, 
                    datum: faker.date.between({from: '2024-01-01', to: Date.now()}),
                    iznos: faker.number.int({min: 45, max: 150})
                })
            }
                const ucenik = {
                    ime: imeRaw,
                    prezime: prezimePrikaz,
                    email: email,
                    uplate: uplate
                };
            await UceniciService.dodaj(ucenik);
        }
        dohvatiBrojUcenika()
    };

    const generirajLekcije = async (broj) => {
        const svaPostignucaIds = svaPostignuca?.map(p => parseInt(p.sifra))
        const sviUceniciIds = sviUcenici?.map(u => parseInt(u.sifra))
        for (let i = 0; i < broj; i++) {
            const naziv = faker.helpers.arrayElement([
                "Prvi koraci",
                "Hiragana: temelj pisma",
                "Katakana i strane riječi",
                "Osnove izgovora i naglaska",
                "Jednostavne fraze za svakodnevni život",
                "Uvod u gramatiku i rečenične strukture",
                "Prvi razgovori na japanskom",
            ]);

            const opis = faker.helpers.arrayElement([
                "U ovoj lekciji upoznat ćeš se s osnovama japanskog jezika, načinom pisanja i kulturnim kontekstom koji je važan za razumijevanje jezika.",
                "Naučit ćeš hiraganu - osnovno japansko pismo, kako se čita i piše, te ćeš početi prepoznavati jednostavne riječi. osnovne hiragana znakove",
                "U ovoj lekciji usvojit ćeš katakanu, pismo koje se koristi za strane riječi, imena i posuđenice.",
                "Fokus je na pravilnom izgovoru japanskih glasova i razumijevanju naglaska kako bi tvoj govor zvučao prirodnije.",
                "Naučit ćeš osnovne izraze i fraze koje se koriste u svakodnevnim situacijama poput pozdravljanja, predstavljanja i zahvaljivanja.",
                "Ovdje ćeš upoznati osnovna gramatička pravila i naučiti kako slagati jednostavne rečenice.",
                "Primijenit ćeš sve što si naučio kroz kratke dijaloge i jednostavne razgovorne vježbe.",
            ]);

            const lekcija = {
                naziv: naziv,
                opis: opis,
                trajanje: faker.number.int({ min: 1, max: 500 }),
                postignuca: faker.helpers.arrayElements(svaPostignucaIds),
                ucenici: faker.helpers.arrayElements(sviUceniciIds),
            };
            await LekcijeService.dodaj(lekcija);
        }
        dohvatiBrojLekcija()
    }

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


    const dodajNoveUcenikePostojecimLekcijama = async () => {
        const uceniciRes = await UceniciService.getLastFewIds(brojUcenika)
        const zadnjeDodaniUceniciIds = uceniciRes.data
        const lekcijeRes = await LekcijeService.get()
        const sveLekcije = lekcijeRes.data

        for (const lekcija of sveLekcije) {
            await LekcijeService.promjeni({
                ...lekcija,
                ucenici: faker.helpers.arrayElements(zadnjeDodaniUceniciIds)
            })
        }
    }

    const handleGenerirajUcenike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {

            await generirajUcenike(brojUcenika);
            await dodajNoveUcenikePostojecimLekcijama()

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

    const handleGenerirajLekcije = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {

            await generirajLekcije(brojLekcija);

            setPoruka({
                tip: "success",
                tekst: `Uspješno generirano ${brojLekcija} lekcija!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri generiranju lekcija: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKategorije = async () => {
        if (!window.confirm("Jeste li sigurni da želite obrisati sve kategorije?\nOPREZ! Obrisat ćete sva postignuća iz te kategorije.")) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KategorijeService.get();
            const kategorije = rezultat.data;
            const postignuca = await PostignucaService.get()
            const postignucaPodaci = postignuca.data;
            const lekcije = await LekcijeService.get()
            const lekcijePodaci = lekcije.data;

            for (const kategorija of kategorije) {
                await KategorijeService.obrisi(kategorija.sifra);
            }

            for (const postignuce of postignucaPodaci) {
                await PostignucaService.obrisi(postignuce.sifra)
            }

            for (const lekcija of lekcijePodaci) {
                await LekcijeService.promjeni({
                    ...lekcija,
                    postignuca: []
                })
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
            const rezultat = await PostignucaService.get();
            const postignuca = rezultat.data;
            const rezultatLekcije = await LekcijeService.get();
            const lekcije = rezultatLekcije.data;


            for (const postignuce of postignuca) {
                await PostignucaService.obrisi(postignuce.sifra)
            }

            for (const lekcija of lekcije) {
                await LekcijeService.promjeni({
                    ...lekcija,
                    postignuca: []
                })
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
            const rezultatLekcije = await LekcijeService.get();
            const lekcije = rezultatLekcije.data;

            for (const ucenik of ucenici) {
                await UceniciService.obrisi(ucenik.sifra);
            }

            for (const lekcija of lekcije) {
                await LekcijeService.promjeni({
                    ...lekcija,
                    ucenici: []
                })
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

    const handleObrisiLekcije = async () => {
        if (!window.confirm("Jeste li sigurni da želite obrisati sve lekcije?")) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const sveLekcije = await LekcijeService.get();
            const lekcijePodaci = sveLekcije.data;

            for (const lekcija of lekcijePodaci) {
                await LekcijeService.obrisi(lekcija.sifra);
            }

            setPoruka({
                tip: "success",
                tekst: `Uspješno obrisano ${lekcijePodaci.length} lekcija!`
            });
        } catch (error) {
            setPoruka({
                tip: "danger",
                tekst: "Greška pri brisanju lekcija: " + error.message
            });
        } finally {
            setLoading(false);
            dohvatiBrojLekcija()
        }
    }

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
                            <CustomInput
                                label={"Broj kategorija"}
                                type="number"
                                min={1}
                                max={50}
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
                        disabled={loading || ukupnoKategorija < 1}
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
                            <CustomInput
                                label={"Broj postignuća"}
                                type={"number"}
                                min={1}
                                max={200}
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
                        <CustomAlert variant="warning" className="mt-2" style={{ fontSize: ".9rem" }}>
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
                            <CustomInput
                                label={"Broj učenika"}
                                type={"number"}
                                min={1}
                                max={50}
                                value={brojUcenika}
                                onChange={(e) => setBrojUcenika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj učenika (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="generiraj-ucenike">
                            <Row>
                                <Col xs={12} lg={6} className={moiblnaSirina && "my-2"}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                        className="w-100 btn btnAdd"
                                    >
                                        {loading ? "Generiranje..." : "Generiraj učenike"}
                                    </Button>
                                </Col>
                                <Col xs={12} lg={6} className={`d-flex gap-3 align-items-center justify-content-evenly ${moiblnaSirina && "my-2"}`}>
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
                                </Col>
                            </Row>
                        </Form.Group>
                        <CustomAlert variant="warning" className="mt-2" style={{ fontSize: ".9rem" }}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiUcenike}
                        disabled={loading || ukupnoUcenika < 1}
                        className="w-100 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sve učenike"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-2">
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
            <Col md={6}>
                <Card
                    title={`Lekcije [trenutno: ${ukupnoLekcija}]`}
                    textAlign={"start"}
                >
                    <Form onSubmit={handleGenerirajLekcije}>
                        <Form.Group className="mb-3">
                            <CustomInput
                                label={"Broj lekcija"}
                                type={"number"}
                                min={1}
                                max={50}
                                value={brojLekcija}
                                onChange={(e) => setBrojLekcija(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj lekcija (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100 btn btnAdd"
                        >
                            {loading ? "Generiranje..." : "Generiraj lekcije"}
                        </Button>
                        <CustomAlert variant="warning" className="mt-2" style={{ fontSize: ".9rem" }}>
                            <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                            Ako želite početi ispočetka, prvo obrišite postojeće podatke.
                        </CustomAlert>
                    </Form>
                    <Button
                        variant="danger"
                        onClick={handleObrisiLekcije}
                        disabled={loading || ukupnoLekcija < 1}
                        className="w-100 btn btnCancel"
                    >
                        {loading ? "Brisanje..." : "Obriši sve lekcije"}
                    </Button>
                    <CustomAlert variant="danger" className="mt-2">
                        <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
                    </CustomAlert>
                </Card>
            </Col>
        </Row>
    );
}