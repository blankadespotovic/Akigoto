import "../styles/card.css"

export function Card({title, bodyImg, children, padding, textAlign}) {
    return (
        <div className="window">
            <div className="window-header">
                <span className="window-title">{title}</span>
                <div className="window-controls">
                    <div className="dot pink"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
            </div>
            {bodyImg && <div style={{display: "flex"}}>
                <img src={bodyImg} style={{maxWidth: "20%", margin: "0 auto"}}/>
            </div>}

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