import {Card} from "../../components/Card.jsx";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import { CustomButtons } from "../../components/CustomButtons.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

export function PregledKategorijaTablica(
    {kategorije, postignuca, navigate, obrisi}
) {
    return (
        <Card
            key={"sve-kategorije"}
            title={"Kategorije"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Naziv</th>
                    <th className={"text-end"}>Broj postignuća</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {kategorije.map((kategorija) => {
                    const brojPostignucaUKategoriji = postignuca.filter(pos => pos.kategorija === kategorija.sifra).length;
                    return (
                        <tr key={kategorija.sifra}>
                            <td>{kategorija.naziv}</td>
                            <td className={"text-end"}>{brojPostignucaUKategoriji}</td>
                            <td>
                            
                                <CustomButtons 
                                    key={kategorija.sifra}
                                    sifra={kategorija.sifra}
                                    editLink={`/kategorije/${kategorija.sifra}`}
                                    editLabel={<FaEdit />}
                                    deleteFunc={() => obrisi(kategorija.sifra)}
                                    deleteLabel={<FaTrash />}
                                />
                                    
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Card>
    );
}