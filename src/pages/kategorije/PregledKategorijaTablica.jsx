import { Card } from "../../components/Card.jsx";
import { Button, ButtonGroup, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { CustomButtons } from "../../components/CustomButtons.jsx";
import { FaEdit, FaSort, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";
import { useState } from "react";

export function PregledKategorijaTablica(
    { kategorije, postignuca, navigate, obrisi }
) {

    const [sortConfig, setSortingConfig] = useState({ key: null, direction: null })

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null
        }
        setSortingConfig({key, direction})
    }

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey || sortConfig.direction === null){
            return <FaSort />
        }
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
    }

    const sortedKategorije = () => {
        if (!kategorije || sortConfig.direction === null) {
            return kategorije
        }


        const sorted = [...kategorije].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (typeof aValue === 'string') {
                const result = aValue.localeCompare(bValue, 'hr', {sensitivity: 'accent'});
                return sortConfig.direction === 'asc' ? result : -result;
            }

            if (typeof aValue === 'number') {
                const result = aValue - bValue;
                return sortConfig.direction === 'asc' ? result : -result;
            }


            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;

        });
        return sorted;
    }



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
                        <th onClick={() => handleSort('naziv')} style={{ cursor: 'pointer' }}>
                            Naziv {getSortIcon('naziv')}</th>
                        <th onClick={() => handleSort('brojPostignuca')} style={{ cursor: 'pointer' }} className={"text-end"}>Broj postignuća {getSortIcon('brojPostignuca')}</th>
                        <th className={"text-center"}>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedKategorije() && sortedKategorije().map((kategorija) => {
                    const postignucaKategorije = postignuca.filter(p => p.kategorija === Number(kategorija.sifra))
                    return (
                            <tr key={kategorija.sifra}>
                                <td>{kategorija.naziv}</td>
                                <td className={"text-end"}>
                                <OverlayTrigger
                                    key={kategorija.sifra}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip id={`tooltip-${kategorija.sifra}`}>
                                            <div className={"text-start"}>
                                                <p>Postignuća u kategoriji:</p>
                                                {postignucaKategorije.map((p, idx) =>
                                                    <div key={p.sifra}>
                                                        <span>{idx + 1}. {p.naziv}</span><br/>
                                                    </div>
                                                )}
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                    <span className={"cursor-pointer"}>{postignucaKategorije.length}</span>
                                </OverlayTrigger>
                            </td>
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