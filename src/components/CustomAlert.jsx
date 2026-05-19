import {Alert} from "react-bootstrap";
import "../styles/customAlert.css";

export function CustomAlert(
    {className, variant, ...props}
) {
    return (
        <Alert
            {...props}
            className={className + ` custom-alert-${variant}`}
        />
    )
}