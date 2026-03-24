import { useEffect, useState } from "react";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import { Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants.js";

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
        <Link to={RouteNames.POSTIGNUCA_NOVA}
        className="btn btn-success w-100 my-3">
        Dodavanje novog postignuća
        </Link>

            <Table>
                <thead>
                    <tr>
                        <th>Naziv postignuća</th>
                        <th>Opis</th>
                        <th>Procjena</th>
                        <th>Postignuto</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {postignuca && postignuca.map((kategorija) => (
                        kategorija.postignuca.map((postignuce) => (
                            <tr key={postignuce.sifra}>
                                <td>{postignuce.naziv}</td>
                                <td>{postignuce.opis}</td>
                                <td>{postignuce.procjena}</td>
                                <td>
                                    <GrValidate
                                        size={25}
                                        color={postignuce.zavrseno ? 'green' : 'red'}
                                    />
                                </td>
                                <td></td>
                            </tr>
                        ))
                    ))}
                </tbody>

            </Table>
        </>

    )
}