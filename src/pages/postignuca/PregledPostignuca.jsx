import { useEffect, useState } from "react";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import { Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";

export default function PregledPostignuca() {
    const [postignuca, setPostignuca] = useState([]);

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor) => {
            setPostignuca(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPostignuca();
    }, []);

    return (

        <>
            <Table style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Naziv postignuća</th>
                        <th>Opis</th>
                        <th>Procjena</th>
                        <th>Završeno</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {postignuca && postignuca.map((kategorija) => (
                        kategorija.postignuca.map((postignuce) => (
                            <tr>
                                <td><i>{postignuce.naziv}</i></td>
                                <td>{postignuce.opis}</td>
                                <td>{postignuce.procjena}</td>
                                <td>
                                    <GrValidate
                                        size={25}
                                        color={postignuce.zavrseno ? 'green' : 'red'}
                                    />
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>

            </Table>
        </>

    )
}