import { Container, Form, InputGroup, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { CustomCard } from "../../components/CustomCard.jsx";
import { CustomButtons } from "../../components/CustomButtons.jsx";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import UceniciService from "../../services/ucenici/UceniciService.js";
import { FaMagnifyingGlass } from "react-icons/fa6";

export function PregledUcenikaTablica(
    { ucenici, svaPostignucaSvihUcenika, obrisi }
) {

    const [ukupnoNaplaceno, setUkupnoNaplaceno] = useState(0)

    useEffect(() => {
        izracunaUkupnoNaplaceno()
    }, [])

    async function izracunaUkupnoNaplaceno() {
        await UceniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            let ukupnoSvi = 0
            odgovor.data.map(ucenik => {
                let ukupnoNaplacenoPoUceniku = 0
                ucenik.uplate.map(u => ukupnoNaplacenoPoUceniku += u.iznos)
                ukupnoSvi += ukupnoNaplacenoPoUceniku
            })
            setUkupnoNaplaceno(ukupnoSvi)
        })
    }

    return (

        <Container className={"pt-0 py-3 px-0"}>
            <CustomCard
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
                            const svaPostignucaUcenika = svaPostignucaSvihUcenika?.find(item => Number(item.sifra) === Number(ucenik.sifra))?.postignuca;
                            const brojPostignuca = svaPostignucaUcenika?.length
                            let ukupnoNaplacenoPoUceniku = 0
                            ucenik.uplate.map(u => ukupnoNaplacenoPoUceniku += u.iznos)
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
                                                                <span style={{ color: p.zavrseno ? 'green' : 'red' }}>{idx + 1}. {p.naziv}</span><br />
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
                                                        .sort((a, b) => new Date(a.datum) - new Date(b.datum))
                                                        .map((u, idx) =>
                                                            <div key={`naplata-${u.datum}`}>
                                                                <span>{idx + 1}. {new Date(u.datum).toLocaleDateString('hr-HR')} - ${u.iznos}€</span><br />
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
                                            editLabel={<FaEdit />}
                                            deleteFunc={() => obrisi(ucenik.sifra)}
                                            deleteLabel={<FaTrash />}
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
            </CustomCard>
        </Container>
    )
}