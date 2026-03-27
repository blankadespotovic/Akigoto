import { IME_APLIKACIJE } from "../constants";
import shiba from "../assets/shiba.png"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
    return (
        <>
            <h1>Dobrodošli u {IME_APLIKACIJE}</h1>
            <div>
                <p>Akigoto je web aplikacija za učenje japanskog jezika koja spaja vizualno učenje i interaktivne vježbe u zabavu!
                    Naziv <b>明語都 (Akigoto)</b> nosi posebno značenje <i>mjesto gdje jezik postaje jasan</i>. Upravo to je i cilj ove aplikacije, kroz intuitivne i zabavne metode učenja razviti razumijevanje japanskog jezika.</p>

                <div style={{ display: "flex" }}>
                    <img src={shiba} style={{ maxWidth: "35%", margin: "auto" }} />
                    <div style={{ maxWidth: "35%", margin: "auto" }}>
                        <DotLottieReact
                            src="/KoiFish.lottie"

                            loop
                            autoplay
                        />
                    </div>
                </div>

            </div>

        </>
    )
}