import {Badge, Table} from "react-bootstrap";
import {FaEdit, FaKey, FaTrash} from "react-icons/fa";
import {CustomCard} from "../../components/CustomCard.jsx";
import {CustomButtons} from "../../components/CustomButtons.jsx";

const OperaterTablica = (
    {operateri, navigate, obrisi}
) => {
    const getOperaterUloga = (operater) => {
        return operater.uloga.charAt(0).toUpperCase() + operater.uloga.slice(1);
    }

    return (
        <CustomCard
            title={"Operateri"}
            padding={0}
            textAlign={"left"}
        >
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>E-Mail</th>
                    <th>Uloga</th>
                    <th className="text-center" style={{width: "200px"}}>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {operateri?.map((operater) => (
                    <tr key={operater.sifra}>
                        <td>{operater.email}</td>
                        <td>
                            <Badge bg={"none"} className={`${operater.uloga === "admin" ? "badge-admin" : "badge-user"}`}>
                                {getOperaterUloga(operater)}
                            </Badge>
                            
                        </td>
                        <td className="text-center">
                            <CustomButtons
                                key={operater.sifra}
                                sifra={operater.sifra}

                                editLink={`${operater.sifra}`}
                                editLabel={<FaEdit/>}

                                isChangePwd={true}
                                changePwdFunc={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                                changePwdLabel={<FaKey/>}

                                deleteFunc={() => obrisi(operater.sifra)}
                                deleteLabel={<FaTrash/>}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </CustomCard>
    );
}

export default OperaterTablica;