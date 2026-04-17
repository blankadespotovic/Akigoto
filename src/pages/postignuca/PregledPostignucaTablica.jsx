import { Card } from "../../components/Card.jsx";
import { Accordion, Button, ButtonGroup, Table } from "react-bootstrap";
import { FaEdit, FaRegCheckSquare, FaRegWindowClose, FaTrash } from "react-icons/fa";
import { CustomButtons } from "../../components/CustomButtons.jsx";
import { formatirajVrijeme } from "../../util/dateTimeFormatter.js";

export function PregledPostignucaTablica(
    { kategorije, postignuca, navigate, obrisi }
) {
    return (
        <Card
            title={"Postignuća"}
            padding={0}
            textAlign={"left"}
        >
            <Accordion className={"custom-accordion"} defaultActiveKey={0}>
                {kategorije?.map((kategorija, idx) => {
                    const imaPostignuca = postignuca.some(pos => pos.kategorija === kategorija.sifra);
                    return imaPostignuca && (
                        <Accordion.Item
                            className={"custom-accordion-item"}
                            key={kategorija.sifra}
                            eventKey={idx}
                        >
                            <Accordion.Header
                                className={"custom-accordion-header"}>{kategorija.naziv}</Accordion.Header>
                            <Accordion.Body className={"custom-accordion-body"}>
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Naziv postignuća</th>
                                            <th>Opis</th>
                                            <th className={"text-end"}>Procjena</th>
                                            <th className={"text-center"}>Postignuto</th>
                                            <th className={"text-center"}>Akcija</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postignuca.map((postignuce) => (
                                            postignuce.kategorija === kategorija.sifra &&
                                            <tr key={postignuce.sifra}>
                                                <td>{postignuce.naziv}</td>
                                                <td style={{ minWidth: "250px" }}>{postignuce.opis}</td>
                                                <td className={"text-end"}>{formatirajVrijeme(postignuce.procjena)}</td>
                                                <td className={"text-center"}>
                                                    {postignuce.zavrseno ?
                                                        <FaRegCheckSquare size={24} color={"green"} /> :
                                                        <FaRegWindowClose size={24} color={"red"} />}
                                                </td>
                                                <td>

                                                    <CustomButtons 
                                                        editLink={`/postignuca/${kategorija.sifra}/${postignuce.sifra}`}
                                                        editLabel={<FaEdit />}
                                                        deleteFunc={() => obrisi(postignuce.sifra)}
                                                        deleteLabel={<FaTrash />}
                                                    />

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </Card>
    )
}