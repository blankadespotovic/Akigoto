import {Form, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {formatirajVrijeme} from "../../util/dateTimeFormatter";
import "../../styles/customComponents.css"

export function CustomInput(
    {
        id, label, type, isInvalid, errors, autoComplete, placeholder = undefined,
        defaultValue = undefined, prefix = undefined, suffix = undefined,
        trebaFormatiratuVrijeme = false, min = undefined, max = undefined,
        value = undefined, onChange = undefined, disabled = false,
        onFocus = undefined,
    }
) {
    const [vrijednost, setVrijednost] = useState(0)

    const handleChange = (e) => {
        if (onChange) onChange(e);
        if (!trebaFormatiratuVrijeme) return;
        setVrijednost(e.target.value);
    };

    useEffect(() => {
        const provjeriZadanuVrijednost = () => {
            if (trebaFormatiratuVrijeme && defaultValue) {
                setVrijednost(defaultValue)
            }
        }

        provjeriZadanuVrijednost();
    }, [defaultValue, trebaFormatiratuVrijeme]);

    return (
        <Form.Group controlId={id}>
            <Form.Label column={"lg"}>{label}</Form.Label>
            <InputGroup>
                {prefix && <InputGroup.Text className={"custom-addon"}>{prefix}</InputGroup.Text>}
                <Form.Control
                    type={type}
                    name={id}
                    className={"custom-input"}
                    defaultValue={defaultValue}
                    isInvalid={isInvalid}
                    placeholder={placeholder}
                    onChange={handleChange}
                    min={type === "number" && min ? min : undefined}
                    max={type === "number" && max ? max : undefined}
                    value={value}
                    disabled={disabled}
                    onFocus={onFocus}
                    autoComplete={autoComplete}
                />
                {suffix && <InputGroup.Text className={"custom-addon"}>{suffix}</InputGroup.Text>}
                {errors && (
                    <Form.Control.Feedback type="invalid">
                        {errors}
                    </Form.Control.Feedback>
                )}
            </InputGroup>
            {trebaFormatiratuVrijeme && <div className="input-hint">
                {formatirajVrijeme(Number(vrijednost))}
            </div>}
        </Form.Group>
    )
}