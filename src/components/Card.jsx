import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import "../styles/card.css"

export function Card({title, bodyImg, children, padding, textAlign, isHomepage = false, style}) {
    return (
        <div className="window" style={style}>
            <div className="window-header">
                <span className="window-title">{title}</span>
                <div className="window-controls">
                    <div className="dot pink"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
            </div>
            {!isHomepage ? (
                bodyImg && <div style={{display: "flex"}}>
                    <img src={bodyImg} style={{maxWidth: "20%", margin: "0 auto"}}/>
                </div>
            ) : (
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                    {bodyImg &&
                        <img className="body-img-hp" src={bodyImg}/>
                    }
                    <DotLottieReact
                        className="lottie-hp"
                        src="/KoiFish.lottie"

                        loop
                        autoplay
                    />
                </div>
            )}

            <div className="window-body"
                 style={{
                     padding: padding ?? "20px",
                     textAlign: textAlign ?? "center",
                 }}
            >
                {children}
            </div>
        </div>
    );
}