import {Form} from "react-bootstrap";
import "../../styles/customComponents.css"

export function CustomCheckbox(
    {id, label, checked, setOnChange}
) {
    return (
        <Form.Group controlId={id}>
            <Form.Check
                label={label}
                name={id}
                className={"custom-check"}
                checked={checked}
                onChange={(e) => setOnChange(e.target.checked)}
            />
        </Form.Group>
    )
}