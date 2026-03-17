import { useEffect, useState } from "react";
import PostignucaService from "../../services/postignuca/PostignucaService.js";

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
        <ol>
            {postignuca && postignuca.map((postignuceKategorija) => (
                <li>
                    {postignuceKategorija.kategorija}
                    <ul>
                        {postignuceKategorija.postignuca.map((postignuce) => (
                            <li
                                style={postignuce.zavrseno ? { color: "green" } : { color: "red" }}
                            >
                                {postignuce.naziv} - {postignuce.opis} [{postignuce.procjena}]
                            </li>
                        )
                        )}
                    </ul>
                </li>
            )
            )}
        </ol>
    );
}