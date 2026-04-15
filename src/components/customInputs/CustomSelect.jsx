import {Form} from "react-bootstrap";
import '../../styles/customComponents.css'

export function CustomSelect(
    {id, label, podaci, defaultValue}
) {
    return podaci && (
        <Form.Group controlId={id}>
            <Form.Label column={"lg"}>{label}</Form.Label>
            <Form.Select name={id} defaultValue={defaultValue ?? podaci[0].value} className={"custom-select"}>
                {podaci.map((podatak) => (
                    <option key={podatak.value} value={podatak.value}>{podatak.label}</option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}