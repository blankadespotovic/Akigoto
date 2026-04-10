import {Alert} from "react-bootstrap";
import "../styles/customAlert.css";

export function CustomAlert(
    {className, style, variant, ...props}
) {
    return (
        <Alert {...props} className={className + ` custom-alert-${variant}`} style={{borderRadius: "0", fontSize: ".9rem", ...style}}/>
    )
}