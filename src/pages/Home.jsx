import { Card } from "../components/Card";
import { IME_APLIKACIJE } from "../constants";
import shiba from '../assets/shiba.png'
import { useEffect, useState } from "react";
import KategorijeService from "../services/kategorije/KategorijeService";

export default function Home() {

    const [brojPostignuca, setBrojPostignuca] = useState(0)
    const [brojKategorija, setBrojKategorija] = useState(0)
    const [animatedPostignuca, setAnimatedPostignuca] = useState(0)
    const [animatedKategorija, setAnimatedKategorija] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kategorijeRezultat = await KategorijeService.get()

                let ukupnoPostignuca = 0

                for(let i = 0; i < kategorijeRezultat.data.length; i++){
                    ukupnoPostignuca += kategorijeRezultat.data[i].postignuca.length
                }

                setBrojPostignuca(ukupnoPostignuca)
                setBrojKategorija(kategorijeRezultat.data.length)
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (animatedPostignuca < brojPostignuca) {
            const timer = setTimeout(() => {
                setAnimatedPostignuca(prev => Math.min(prev + 1, brojPostignuca))
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [animatedPostignuca, brojPostignuca])

    useEffect(() => {
        if (animatedKategorija < brojKategorija) {
            const timer = setTimeout(() => {
                setAnimatedKategorija(prev => Math.min(prev + 1, brojKategorija))
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [animatedKategorija, brojKategorija])





    const homeCardChildren = (
        <>
            <p>
                Akigoto je web aplikacija za učenje japanskog jezika koja spaja vizualno učenje i interaktivne vježbe u
                zabavu! Naziv <b>明語都 (Akigoto)</b> nosi posebno značenje <i>mjesto gdje jezik postaje jasan</i>.
                Upravo
                to je i cilj ove aplikacije, kroz intuitivne i zabavne metode učenja razviti razumijevanje japanskog
                jezika.
            </p>
            <button className="button">Započni učenje</button>
        </>
    );

    const statsCardChildren = (
        <>
            <div className="statistikaContainer">
                <div className="statKartica">
                    <span className="statLabel">Postignuća</span>
                    <span className="statValue">{animatedPostignuca}</span>
                </div>

                <div className="statKartica">
                    <span className="statLabel">Kategorije</span>
                    <span className="statValue">{animatedKategorija}</span>
                </div>
            </div>
        </>
    )


    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <Card
                style={{
                    flex: 1,
                }}
                title={`Što je ${IME_APLIKACIJE}?`}
                bodyImg={shiba}
                isHomepage={true}
            >
                {homeCardChildren}
            </Card>
            <Card
                title={"Statistika"}
            >
                {statsCardChildren}
            </Card>
        </div>
    );

}