import { Button, CardImg, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { CustomCard } from "../../components/CustomCard.jsx";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaAt, FaMagnifyingGlass } from "react-icons/fa6";
import nophoto from "../../../public/nophoto.png"

export function PregledUcenikaGrid({ ucenici, navigate, obrisi }) {


    return (
        <Container className={"pt-0 py-3 px-0"}>

            {ucenici.map((ucenik) => (
                <CustomCard
                    key={ucenik.sifra}
                    title={`${ucenik.ime} ${ucenik.prezime}`}
                >
                     <div
                        style={{
                            height: "200px",
                            width: "70%",
                            margin: "0 auto",
                            overflow: "hidden",                          
                            backgroundColor: "#f5f5f5"
                        }}
                    >
                        <img
                            src={ucenik.slika || nophoto}
                            alt={`${ucenik.ime} ${ucenik.prezime}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />


                    </div>
                    <Row className={"text-start text-break"}>
                        <Col xs={12}>
                            <FaAt color={"lightblue"} className={"mb-1"} />&nbsp;<b>E-mail</b>
                        </Col>
                        <Col xs={12}>
                            {ucenik.email}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={12}
                            className={"mt-4 mb-2 d-flex align-items-center justify-content-between"}
                        >
                            <Button
                                className={"btnEdit"}
                                onClick={() => navigate(`${ucenik.sifra}`)}
                            >
                                Promijeni
                            </Button>
                            <Button
                                className={"btnCancel"}
                                onClick={() => obrisi(ucenik.sifra)}
                            >
                                Obriši
                            </Button>
                        </Col>
                    </Row>
                </CustomCard>
            ))}
        </Container>
    )
}

