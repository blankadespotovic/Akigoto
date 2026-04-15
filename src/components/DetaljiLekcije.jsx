import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import PostignucaService from "../services/postignuca/PostignucaService.js";
import {Card} from "./Card.jsx";

export function DetaljiLekcije(props) {
    const podaci = props.podaci;

    const [postignuca, setPostignuca] = useState()

    const ucitajPostignuca = async () => {
        const ucitanaPostignuca = [];
        for (const sifra of podaci.postignuca) {
            const x = await PostignucaService.getBySifra(sifra);
            ucitanaPostignuca.push(x.data)
        }
        setPostignuca(ucitanaPostignuca)
    }

    useEffect(() => {
        if (props.show)
            ucitajPostignuca()
    }, [props])

    return podaci && (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Card
                title={podaci.naziv}
                style={{marginTop: "0"}}
                textAlign={"start"}
            >
                <h4>Sadržaj</h4>
                <p>
                    {podaci.opis}
                </p>
                <hr/>
                <h4>Postignuća</h4>
                {postignuca && postignuca.length > 0 ?
                <ul className={'custom-list'}>
                    {postignuca?.map(postignuce => (
                        <li key={postignuce.sifra} className={postignuce.zavrseno ? 'done' : 'not-done'}>{postignuce.naziv}</li>
                    ))}
                </ul> : <p>Za ovu lekciju nema postignuća.</p>
                }
                <hr style={{width: "100%"}}/>
                <div className={"d-flex gap-2 align-items-center justify-content-end"}>
                    <Button className={"btnInfo"} onClick={props.onHide}>Zatvori</Button>
                </div>
            </Card>
        </Modal>
    )
}