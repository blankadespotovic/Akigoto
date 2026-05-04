import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import PostignucaService from "../services/postignuca/PostignucaService";
import KategorijeService from "../services/kategorije/KategorijeService";
import UceniciService from "../services/ucenici/UceniciService";
import LekcijeService from "../services/lekcije/LekcijeService";
import OperaterService from "../services/operateri/OperaterService";

export default function NadzornaPloca() {
    

    return (
        <>
        Logirani ste, ovo je nadzorna ploča
        </>
    )
}
