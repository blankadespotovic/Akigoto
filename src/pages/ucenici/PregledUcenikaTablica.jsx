import {OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {Card} from "../../components/Card.jsx";
import {CustomButtons} from "../../components/CustomButtons.jsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import { useState } from "react";

export function PregledUcenikaTablica(
    {ucenici, svaPostignucaSvihUcenika, obrisi}
) {

    let ukupnoNaplaceno = 0

    return (

        <Card
            title={"Učenici"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>E-mail adresa</th>
                    <th>Broj postignuća</th>
                    <th>Plaćeno</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {ucenici.map((ucenik) => {
                    const svaPostignucaUcenika = svaPostignucaSvihUcenika?.find(item => item.sifra === ucenik.sifra)?.postignuca;
                    const brojPostignuca = svaPostignucaUcenika?.length
                    let ukupnoNaplacenoPoUceniku = 0
                    ucenik.uplate.map(u => ukupnoNaplacenoPoUceniku += u.iznos )
                    ukupnoNaplaceno += ukupnoNaplacenoPoUceniku
                    return (
                        <tr key={ucenik.sifra}>
                            <td>{ucenik.ime}</td>
                            <td>{ucenik.prezime}</td>
                            <td>{ucenik.email}</td>
                            <td>
                                <OverlayTrigger
                                    key={ucenik.sifra}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip id={`tooltip-${ucenik.sifra}`}>
                                            <div className={"text-start"}>
                                                <p>Postignuća učenika:</p>
                                                {svaPostignucaUcenika?.map((p, idx) =>
                                                    <div key={p.sifra}>
                                                        <span style={{color: p.zavrseno? 'green' : 'red'}}>{idx + 1}. {p.naziv}</span><br/>
                                                    </div>
                                                )}
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                    <span>{brojPostignuca}</span>
                                </OverlayTrigger>
                            </td>
                            <td><OverlayTrigger
                                    key={ucenik.sifra}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip id={`tooltip-naplate-${ucenik.sifra}`}>
                                            <div className={"text-start"}>
                                                <p>Uplate učenika:</p>
                                                {ucenik.uplate
                                                .sort((a, b)=> new Date(a.datum) - new Date(b.datum))
                                                .map((u, idx) =>
                                                    <div key={`naplata-${u.datum}`}>
                                                        <span>{idx + 1}. {new Date(u.datum).toLocaleDateString('hr-HR')} - ${u.iznos}€</span><br/>
                                                    </div>
                                                )}
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                    <span>{ukupnoNaplacenoPoUceniku} €</span>
                                </OverlayTrigger></td>
                            <td>
                                <CustomButtons
                                    editLink={`${ucenik.sifra}`}
                                    editLabel={<FaEdit/>}
                                    deleteFunc={() => obrisi(ucenik.sifra)}
                                    deleteLabel={<FaTrash/>}
                                />
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                            Ukupno naplaćeno
                        </td>
                        <td>
                        {ukupnoNaplaceno} €
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Card>
    )
}