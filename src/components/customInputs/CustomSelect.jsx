import {Form, InputGroup} from "react-bootstrap";
import "../../styles/customComponents.css"

export function CustomSelect(
    {
        id, label, podaci, defaultValue, onChange = undefined, value = undefined,
        className = undefined, additionalClasses = undefined, prefix, isInvalid, onFocus, errors
    },
) {
    const baseClass = className || "custom-select";
    const finalClassName = `${baseClass} ${additionalClasses}`.trim();
    return podaci && (
        <Form.Group controlId={id}>
            {label && <Form.Label column={"lg"}>{label}</Form.Label>}
            <InputGroup>
                {prefix && <InputGroup.Text className={"custom-addon"}>{prefix}</InputGroup.Text>}
                <Form.Select
                    name={id}
                    className={finalClassName}
                    onChange={onChange}
                    value={value === undefined ? undefined : value}
                    defaultValue={value === undefined ? (defaultValue ?? podaci[0].value) : undefined}
                    isInvalid={isInvalid}
                    onFocus={onFocus}
                >
                    {podaci.map((podatak) => (
                        <option key={podatak.value} value={podatak.value}>{podatak.label}</option>
                    ))}
                </Form.Select>
                {errors && (
                    <Form.Control.Feedback type="invalid">
                        {errors}
                    </Form.Control.Feedback>
                )}
            </InputGroup>
        </Form.Group>
    )
}