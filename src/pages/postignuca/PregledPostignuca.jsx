import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import { Card } from "../../components/Card.jsx";
import PostignucaService from "../../services/postignuca/PostignucaService.js";

export default function PregledPostignuca() {

    const navigate = useNavigate()
    const [postignuca, setPostignuca] = useState([]);

    async function ucitajPostignuca() {
        await PostignucaService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
        setPostignuca(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajPostignuca();
    }, []);


    async function obrisi(kategorija, postignuce) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await PostignucaService.obrisi(kategorija, postignuce)
        ucitajPostignuca()
    }

    return (

        <>
            <Link to={RouteNames.POSTIGNUCA_NOVA} id="btnAdd"
                className="btn btnAdd w-100 my-3">
                Dodavanje novog postignuća
            </Link>
            {postignuca && postignuca.map((kategorija) => (
                kategorija.postignuca && kategorija.postignuca.length > 0 &&
                <Card
                key={kategorija.kategorija}
                    title={kategorija.kategorija}
                    padding={0}
                    textAlign={"left"}
                >
                    <Table striped hover responsive>
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
                            {kategorija.postignuca.map((postignuce) => (
                                <tr key={postignuce.sifra}>
                                    <td>{postignuce.naziv}</td>
                                    <td style={{ minWidth: "250px" }}>{postignuce.opis}</td>
                                    <td>{postignuce.procjena} min</td>
                                    <td>
                                        <GrValidate
                                            size={25}
                                            color={postignuce.zavrseno ? 'green' : 'red'}
                                        />
                                    </td>
                                    <td><Button onClick={() => { navigate(`/postignuca/${kategorija.sifra}/${postignuce.sifra}`) }}>
                                        Promijeni postignuće
                                    </Button>
                                        &nbsp;&nbsp;
                                        <Button className="btnCancel" onClick={() => { obrisi(kategorija.sifra, postignuce.sifra) }}>
                                            Obriši
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

            ))}
        </>

    )
}