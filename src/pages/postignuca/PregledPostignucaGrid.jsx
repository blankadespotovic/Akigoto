import {useState} from "react";
import {CustomSelect} from "../../components/customInputs/CustomSelect.jsx";
import {Card as CCard} from "../../components/Card.jsx";
import {FaMedal, FaRegCheckSquare, FaRegClock, FaRegWindowClose} from "react-icons/fa";
import {Button, Col, Row} from "react-bootstrap";

export function PregledPostignucaGrid(
    {kategorije, postignuca, navigate, obrisi}
) {
    const transformiraneKategorije = kategorije.map(k => ({
        label: k.naziv,
        value: k.sifra
    }))
    const [aktivnaKategorija, setAktivnaKategorija] = useState(transformiraneKategorije[0].value)

    return (
        <>
            <CustomSelect
                id={"kategorije"}
                defaultValue={transformiraneKategorije[0].value}
                label={"Kategorija"}
                podaci={transformiraneKategorije}
                value={aktivnaKategorija}
                onChange={(e) => setAktivnaKategorija(parseInt(e.target.value))}
            >
                {kategorije.map(k => (
                    <option key={k.sifra} value={k.sifra}>
                        {k.naziv}
                    </option>
                ))}
            </CustomSelect>
            {postignuca
                .filter(p => p.kategorija === aktivnaKategorija)
                .map(pos => (
                    <Card
                        key={pos.sifra}
                        title={pos.naziv}
                    >
                        <Row className={"row-gap-2"}>
                            <Col xs={6} className={"text-start align-items-center"}>
                                {pos.zavrseno ? (
                                    <FaRegCheckSquare
                                        size={24}
                                        className={"mb-1"}
                                        color={"green"}
                                    />
                                ) : (
                                    <FaRegWindowClose
                                        size={24}
                                        className={"mb-1"}
                                        color={"red"}
                                    />
                                )}
                            </Col>
                            <Col xs={6} className={"text-end"}>
                                <FaRegClock color={"lightblue"} className={"mb-1"}/>&nbsp;
                                {pos.procjena} min
                            </Col>
                            <Col xs={12} className={"text-start text-muted"}>
                                {pos.opis}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}>
                                <Button
                                    className="btnEdit"
                                    onClick={() => navigate(`/postignuca/${aktivnaKategorija}/${pos.sifra}`)}
                                >
                                    Promijeni
                                </Button>
                                <Button
                                    className="btnCancel"
                                    onClick={() => obrisi(pos.sifra)}
                                >
                                    Obriši
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                ))}
        </>
    )
}