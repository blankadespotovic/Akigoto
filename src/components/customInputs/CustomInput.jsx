import {Form, InputGroup} from "react-bootstrap";
import "../../styles/customComponents.css"
import {useState} from "react";

export function CustomInput(
    {
        id, label, type, required = false, placeholder = undefined, defaultValue = undefined,
        prefix = undefined, suffix = undefined, trebaFormatiratuVrijeme = false
    }
) {
    const [vrijednost, setVrijednost] = useState(0)

    const formatirajVrijeme = (ukupnoMinuta) => {
        if (!ukupnoMinuta && ukupnoMinuta !== 0) return ""

        const sati = Math.floor(ukupnoMinuta / 60);
        const minute = ukupnoMinuta % 60;

        if (sati === 0) return `${minute} min`;
        if (minute === 0) return `${sati} h`;

        return `${sati} h ${minute} min`;
    }

    const handleChange = (e) => {
        if (!trebaFormatiratuVrijeme) return;
        setVrijednost(e.target.value);
    };

    return (
        <Form.Group controlId={id}>
            <Form.Label column={"lg"}>{label}</Form.Label>
            <InputGroup>
                {prefix && <InputGroup.Text className={"custom-addon"}>{prefix}</InputGroup.Text>}
                <Form.Control
                    type={type}
                    name={id}
                    required={required}
                    className={"custom-input"}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                {suffix && <InputGroup.Text className={"custom-addon"}>{suffix}</InputGroup.Text>}
            </InputGroup>
            {trebaFormatiratuVrijeme && <div className="input-hint">
                {formatirajVrijeme(Number(vrijednost))}
            </div>}
        </Form.Group>
    )
}