import { Button, Col, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import PostignucaService from "../services/postignuca/PostignucaService.js";
import { CustomCard } from "./CustomCard.jsx";
import UceniciService from "../services/ucenici/UceniciService.js";
import DOMPurify from "dompurify";

export function DetaljiLekcije(props) {
    const podaci = props.podaci;

    const [postignuca, setPostignuca] = useState()
    const [ucenici, setUcenici] = useState()
    const safeOpis = DOMPurify.sanitize(podaci?.opis);

    const ucitajPostignuca = async () => {
        const ucitanaPostignuca = [];
        for (const sifra of podaci.postignuca) {
            const postignuce = await PostignucaService.getBySifra(sifra);
            ucitanaPostignuca.push(postignuce.data)
        }
        setPostignuca(ucitanaPostignuca)
    }

    const ucitajUcenike = async () => {
        const ucitaniUcenici = [];
        for (const sifra of podaci.ucenici) {
            const ucenik = await UceniciService.getBySifra(sifra);
            ucitaniUcenici.push(ucenik.data)
        }
        setUcenici(ucitaniUcenici)
    }


    useEffect(() => {
        if (props.show) {
            ucitajPostignuca()
            ucitajUcenike()
        }
    }, [props])

    return podaci && (
        <Modal
            {...props}
            size={"lg"}
            aria-labelledby={"contained-modal-title-vcenter"}
            centered
        >
            <CustomCard
                title={podaci.naziv}
                style={{ marginTop: "0" }}
                textAlign={"start"}
                isModal={true}
                onClickModal={props.onHide}
            >
                <h4>Sadržaj</h4>
               <div className={"sadrzaj-container"} dangerouslySetInnerHTML={{__html: safeOpis}}/>
                <hr />
                <Row>
                    <Col xs={12} md={6} className={"px-4"} style={{ maxHeight: "250px !important" }}>
                        <h4>Postignuća</h4>
                        {postignuca && postignuca.length > 0 ?
                            <ul className={"custom-list"}>
                                {postignuca?.map(postignuce => (
                                    <li key={postignuce.sifra}
                                        className={postignuce.zavrseno ? "done" : "not-done"}
                                    >
                                        <OverlayTrigger
                                            key={postignuce.sifra}
                                            placement={"top"}
                                            overlay={
                                                <Tooltip id={`tooltip-${postignuce.sifra}`}>
                                                    {postignuce.opis}
                                                </Tooltip>
                                            }
                                        >
                                            <span>{postignuce.naziv}</span>
                                        </OverlayTrigger>
                                    </li>
                                ))}
                            </ul> : <p>Za ovu lekciju nema postignuća.</p>
                        }
                    </Col>
                    <Col xs={12} md={6} className={"px-4"} style={{ maxHeight: "250px !important" }}>
                        <h4>Korisnici</h4>
                        {ucenici && ucenici.length > 0 ?
                            <ul className={"custom-list"}>
                                {ucenici?.map(ucenik => (
                                    <li
                                        key={ucenik.sifra}
                                        className={"ucenik"}
                                    >
                                        <OverlayTrigger
                                            key={ucenik.sifra}
                                            placement={"top"}
                                            overlay={
                                                <Tooltip id={`tooltip-${ucenik.sifra}`}>
                                                    {ucenik.email}
                                                </Tooltip>
                                            }
                                        >
                                            <span>{ucenik.ime} {ucenik.prezime}</span>
                                        </OverlayTrigger>
                                    </li>
                                ))}
                            </ul> : <p>U ovoj lekciji nema učenika.</p>
                        }
                    </Col>
                </Row>
                <hr style={{ width: "100%" }} />
                <div className={"d-flex gap-2 align-items-center justify-content-end"}>
                    <Button className={"btnInfo"} onClick={props.onHide}>Zatvori</Button>
                </div>
            </CustomCard>
        </Modal>
    )
}