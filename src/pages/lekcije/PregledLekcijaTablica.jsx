import {Table} from "react-bootstrap";
import {CustomCard} from "../../components/CustomCard.jsx";
import {formatirajVrijeme} from "../../util/dateTimeFormatter.js";
import {FaEdit, FaFilePdf, FaInfoCircle, FaTrash} from "react-icons/fa";
import {CustomButtons} from "../../components/CustomButtons.jsx";

export function PregledLekcijaTablica(
    {lekcije, setPodaci, setModalShow, obrisi, generirajPDFZaLekciju}
) {
    return (
        <CustomCard
            title={"Lekcije"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Naziv lekcije</th>
                    <th className={"text-end"}>Očekivano trajanje</th>
                    <th className={"text-end"}>Broj postignuća</th>
                    <th className={"text-end"}>Broj učenika</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {lekcije.map((lekcija) => (
                    <tr key={lekcija.sifra}>
                        <td>{lekcija.naziv}</td>
                        <td className={"text-end"}>{formatirajVrijeme(lekcija.trajanje)}</td>
                        <td className={"text-end"}>
                            {lekcija.postignuca ? lekcija.postignuca.length : 0}
                        </td>
                        <td className={"text-end"}>
                            {lekcija.ucenici ? lekcija.ucenici.length : 0}
                        </td>
                        <td>
                            <CustomButtons
                                key={lekcija.sifra}
                                sifra={lekcija.sifra}
                                detailsFunc={() => {
                                    setPodaci(lekcija)
                                    setModalShow(true)
                                }}
                                detailsLabel={<FaInfoCircle/>}
                                isDetails={true}

                                editLink={`${lekcija.sifra}`}
                                editLabel={<FaEdit/>}

                                deleteFunc={() => obrisi(lekcija.sifra)}
                                deleteLabel={<FaTrash/>}

                                pdfFunc={() => generirajPDFZaLekciju(lekcija)}
                                pdfLabel={<FaFilePdf/>}
                                needsPdf={true}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </CustomCard>
    );
}