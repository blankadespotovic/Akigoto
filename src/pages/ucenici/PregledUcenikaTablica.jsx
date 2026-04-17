import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Card } from "../../components/Card.jsx";
import { CustomButtons } from "../../components/CustomButtons.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

export function PregledUcenikaTablica(
    { ucenici, navigate, obrisi }
) {



    return (

        <Card
            title={'Učenici'}
            padding={0}
            textAlign={'left'}
        >
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>E-mail adresa</th>
                        <th className={"text-center"}>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {ucenici.map((ucenik) => (
                        <tr key={ucenik.sifra}>
                            <td>{ucenik.ime}</td>
                            <td>{ucenik.prezime}</td>
                            <td>{ucenik.email}</td>
                            <td>
                             

                                <CustomButtons
                                    editLink={`${ucenik.sifra}`}
                                    editLabel={<FaEdit />}
                                    deleteFunc={() => obrisi(ucenik.sifra)}
                                    deleteLabel={<FaTrash />}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}