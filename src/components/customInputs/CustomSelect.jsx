import {Form} from "react-bootstrap";
import "../../styles/customComponents.css"
import {useEffect, useState} from "react";

export function CustomSelect(
    {
        id, label, podaci, defaultValue, onChange = undefined, value = undefined,
        className = undefined, additionalClasses = undefined
    },
) {
    const baseClass = className || "custom-select";
    const finalClassName = `${baseClass} ${additionalClasses}`.trim();
    const [defVal, setDefVal] = useState()

    useEffect(() => {
        if (defaultValue) setDefVal(defaultValue);
    }, [defaultValue]);
    return podaci && (
        <Form.Group controlId={id}>
            {label && <Form.Label column={"lg"}>{label}</Form.Label>}
            <Form.Select
                name={id}
                className={finalClassName}
                onChange={onChange}
                value={value === undefined ? undefined : value}
                defaultValue={value === undefined ? (defVal ?? podaci[0].value) : undefined}
            >
                {podaci.map((podatak) => (
                    <option key={podatak.value} value={podatak.value}>{podatak.label}</option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}