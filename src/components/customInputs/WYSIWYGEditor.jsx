import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    createButton,
    Editor,
    Toolbar
} from "react-simple-wysiwyg";

const BtnAlignLeft = createButton("Align left", "⬅️", "justifyLeft");
const BtnAlignCenter = createButton("Align center", "↔️", "justifyCenter");
const BtnAlignRight = createButton("Align right", "➡️", "justifyRight");
const BtnAlignJustify = createButton("Justify", "☰", "justifyFull");

export function WYSIWYGEditor(
    {value, onChange, name, disabled, defaultValue}
) {
    return (
        <Editor
            value={value}
            onChange={onChange}
            name={name}
            className={"custom-input"}
            defaultValue={defaultValue}
            disabled={disabled}
        >
            <Toolbar>
                <BtnUndo/>
                <BtnRedo/>

                <BtnBold/>
                <BtnItalic/>
                <BtnUnderline/>
                <BtnStrikeThrough/>

                <BtnStyles/>

                <BtnBulletList/>
                <BtnNumberedList/>

                <BtnAlignLeft/>
                <BtnAlignCenter/>
                <BtnAlignRight/>
                <BtnAlignJustify/>

                <BtnLink/>

                <BtnClearFormatting/>
            </Toolbar>
        </Editor>
    )
}