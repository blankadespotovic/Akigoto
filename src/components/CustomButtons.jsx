import {Button, ButtonGroup} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

export function CustomButtons(
    {
        sifra, customClass, editLink, editLabel = "Promijeni", deleteFunc, deleteLabel = "Obriši",
        detailsFunc, detailsLabel = "Detalji", isDetails = false, pdfFunc, pdfLabel = "PFD",
        needsPdf = false
    }
) {
    const navigate = useNavigate()
    const needsCustomPadding = isDetails && needsPdf

    return (
        <ButtonGroup className={`d-flex justify-content-center gap-2 ${customClass}`}>
            {isDetails &&
                <Button
                    key={`btn-${sifra}-detalji`}
                    className={`btnInfo${needsCustomPadding ? " p-1" : ""}`}
                    onClick={detailsFunc}
                >
                    {detailsLabel}
                </Button>
            }
            <Button
                key={`btn-${sifra}-promijeni`}
                className={`btnEdit${needsCustomPadding ? " p-1" : ""}`}
                onClick={() => navigate(editLink)}
            >
                {editLabel}
            </Button>
            <Button
                key={`btn-${sifra}-obrisi`}
                className={`btnCancel${needsCustomPadding ? " p-1" : ""}`}
                onClick={deleteFunc}
            >
                {deleteLabel}
            </Button>
            {needsPdf &&
                <Button
                    key={`btn-${sifra}-pdf`}
                    className={`btnSuccess${needsCustomPadding ? " p-1" : ""}`}
                    onClick={pdfFunc}
                >
                    {pdfLabel}
                </Button>
            }
        </ButtonGroup>
    )
}