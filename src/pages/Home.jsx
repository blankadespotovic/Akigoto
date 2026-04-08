import { Card } from "../components/Card";
import { IME_APLIKACIJE } from "../constants";
import shiba from '../assets/shiba.png'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
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


    return (
        <Card
            title={`Što je ${IME_APLIKACIJE}?`}
            bodyImg={shiba}
            isHomepage={true}
        >
            {homeCardChildren}
        </Card>

    );
}