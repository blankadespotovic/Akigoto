import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import "../styles/card.css"
import useBreakpoint from "../hooks/useBreakpoint.js";

export function Card(
    {
        title, bodyImg, children, padding, textAlign, isHomepage = false, style, isModal = false,
        onClickModal = undefined
    }
) {
    const sirina = useBreakpoint()
    return (
        <div className="window" style={style}>
            <div className="window-header">
                <span
                    className={`window-title${["xs", "sm", "md"].includes(sirina) ? "" : " window-title-margin-right"}`}>{title}</span>
                <div className="window-controls">
                    <div
                        className={`dot pink${isModal ? " cursor-pointer" : ""}`}
                        onClick={isModal ? onClickModal : undefined}
                    ></div>
                    <div
                        className={`dot yellow${isModal ? " cursor-pointer" : ""}`}
                        onClick={isModal ? onClickModal : undefined}
                    ></div>
                    <div
                        className={`dot green${isModal ? " cursor-pointer" : ""}`}
                        onClick={isModal ? onClickModal : undefined}
                    ></div>
                </div>
            </div>
            {!isHomepage ? (
                bodyImg && <div style={{display: "flex"}}>
                    <img src={bodyImg} style={{maxWidth: "20%", margin: "0 auto"}} alt={"Slika"}/>
                </div>
            ) : (
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                    {bodyImg &&
                        <img className="body-img-hp" src={bodyImg} alt={"Slika"}/>
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