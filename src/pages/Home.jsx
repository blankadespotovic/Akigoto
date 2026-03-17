import { IME_APLIKACIJE } from "../constants";

export default function Home() {
    return (
        <>
            <h1>Dobrodošli u {IME_APLIKACIJE}</h1>
            <div>
                Akigoto je web aplikacija za učenje japanskog jezika koja spaja vizualno učenje i interaktivne vježbe u zabavu!
                Naziv <b>明語都 (Akigoto)</b> nosi posebno značenje <i>mjesto gdje jezik postaje jasan</i>. Upravo to je i cilj ove aplikacije, kroz intuitivne i zabavne metode učenja razviti razumijevanje japanskog jezika.
            </div>
        </>
    )
}