import {CustomCard} from "../../components/CustomCard.jsx";
import {OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {CustomButtons} from "../../components/CustomButtons.jsx";
import {FaEdit, FaSort, FaSortDown, FaSortUp, FaTrash} from "react-icons/fa";
import {useState} from "react";

export function PregledKategorijaTablica(
    {kategorije, postignuca, obrisi}
) {
    const [sortingConfig, setSortingConfig] = useState({key: null, direction: null})

    const handleSort = (key) => {
        let direction = "asc"
        if (sortingConfig.key === key && sortingConfig.direction === "asc") {
            direction = "desc"
        } else if (sortingConfig.key === key && sortingConfig.direction === "desc") {
            direction = null
        }
        setSortingConfig({key, direction})
    }

    const getSortIcon = (columnKey) => {
        if (sortingConfig.key !== columnKey || sortingConfig.direction === null) {
            return <FaSort/>
        }
        return sortingConfig.direction === "asc" ? <FaSortUp/> : <FaSortDown/>
    }

    const sortedKategorije = () => {
        if (!kategorije || sortingConfig.direction === null) {
            return kategorije
        }

        const sorted = [...kategorije].sort((a, b) => {
            let aValue = a[sortingConfig.key];
            let bValue = b[sortingConfig.key];

            if (typeof aValue === "string") {
                const result = aValue.localeCompare(bValue, "hr", {sensitivity: "accent"});
                return sortingConfig.direction === "asc" ? result : -result;
            }

            if (typeof aValue === "number") {
                const result = aValue - bValue;
                return sortingConfig.direction === "asc" ? result : -result;
            }

            if (aValue < bValue) {
                return sortingConfig.direction === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortingConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    }

    return (
        <CustomCard
            key={"sve-kategorije"}
            title={"Kategorije"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th onClick={() => handleSort("naziv")} style={{cursor: "pointer"}}>
                        Naziv {getSortIcon("naziv")}</th>
                    <th onClick={() => handleSort("brojPostignuca")} style={{cursor: "pointer"}}
                        className={"text-end"}>Broj postignuća {getSortIcon("brojPostignuca")}</th>
                    <th className={"text-center"}>Akcija</th>
                </tr>
                </thead>
                <tbody>
                {sortedKategorije()?.map((kategorija) => {
                        const postignucaKategorije = postignuca.filter(p => p.kategorija === kategorija.sifra)
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
                                        editLabel={<FaEdit/>}
                                        deleteFunc={() => obrisi(kategorija.sifra)}
                                        deleteLabel={<FaTrash/>}
                                    />
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
        </CustomCard>
    );
}