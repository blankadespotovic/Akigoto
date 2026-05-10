import { Card } from "../components/Card";
import { IME_APLIKACIJE } from "../constants";
import shiba from '../assets/shiba.png'
import { useEffect, useState } from "react";
import KategorijeService from "../services/kategorije/KategorijeService";
import UceniciService from "../services/ucenici/UceniciService";
import LekcijeService from "../services/lekcije/LekcijeService";
import PostignucaService from "../services/postignuca/PostignucaService.js";
import OperaterService from "../services/operateri/OperaterService.js";

export default function Home() {

    const [brojPostignuca, setBrojPostignuca] = useState(0)
    const [brojKategorija, setBrojKategorija] = useState(0)
    const [brojUcenika, setBrojUcenika] = useState(0)
    const [brojLekcija, setBrojLekcija] = useState(0)
    const [brojOperatera, setBrojOperatera] = useState(0);
    const [brojAdmina, setBrojAdmina] = useState(0);
    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [animatedPostignuca, setAnimatedPostignuca] = useState(0)
    const [animatedKategorija, setAnimatedKategorija] = useState(0)
    const [animatedUcenici, setAnimatedUcenici] = useState(0)
    const [animatedLekcije, setAnimatedLekcije] = useState(0)
    const [animatedOperateri, setAnimatedOperateri] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kategorijeRezultat = await KategorijeService.get()
                const postignucaRezultat = await PostignucaService.get()
                const uceniciRezultat = await UceniciService.get()
                const lekcijeRezultat = await LekcijeService.get()
                const operateri = await OperaterService.get();

                setBrojLekcija(lekcijeRezultat.data.length)
                setBrojUcenika(uceniciRezultat.data.length)
                setBrojKategorija(kategorijeRezultat.data.length)
                setBrojPostignuca(postignucaRezultat.data.length)
                setBrojOperatera(operateri.data.length);

                // Izračunaj broj admina i korisnika
                const admini = operateri.data.filter(op => op.uloga === 'admin').length;
                const korisnici = operateri.data.filter(op => op.uloga === 'korisnik').length;
                setBrojAdmina(admini);
                setBrojKorisnika(korisnici);
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

    useEffect(() => {
        if (animatedUcenici < brojUcenika) {
            const timer = setTimeout(() => {
                setAnimatedUcenici(prev => Math.min(prev + 1, brojUcenika))
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [animatedUcenici, brojUcenika])

    useEffect(() => {
        if (animatedLekcije < brojLekcija) {
            const timer = setTimeout(() => {
                setAnimatedLekcije(prev => Math.min(prev + 1, brojLekcija))
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [animatedLekcije, brojLekcija])

    useEffect(() => {
        if (animatedOperateri < brojOperatera) {
            const timer = setTimeout(() => {
                setAnimatedOperateri(prev => Math.min(prev + 1, brojOperatera));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [animatedOperateri, brojOperatera]);



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
        <div className="d-flex flex-row gap-3 align-items-center justify-content-center flex-wrap">
            <div className="statKartica">
                <span className="statLabel">Postignuća</span>
                <span className="statValue">{animatedPostignuca}</span>
            </div>

            <div className="statKartica">
                <span className="statLabel">Kategorije</span>
                <span className="statValue">{animatedKategorija}</span>
            </div>

            <div className="statKartica">
                <span className="statLabel">Učenici</span>
                <span className="statValue">{animatedUcenici}</span>
            </div>

            <div className="statKartica">
                <span className="statLabel">Lekcije</span>
                <span className="statValue">{animatedLekcije}</span>
            </div>

            <div className="statKartica">
                <span className="statLabel">Operateri</span>
                <span className="statValue">{animatedOperateri}</span>
                 <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                <span className="badge badge-admin me-5">Admin: {brojAdmina}</span>
                <span className="badge badge-user">Korisnik: {brojKorisnika}</span>
            </div>
            </div>
           
        </div>
    )


    return (
        <div className="d-flex flex-column flex-lg-row gap-3">
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
                style={{
                    flex: "0 0 25%",
                }}
                title={"Statistika"}
            >
                {statsCardChildren}
            </Card>
        </div>
    );

}