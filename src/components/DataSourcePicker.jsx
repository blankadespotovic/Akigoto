import Dropdown from "react-bootstrap/Dropdown";
import OperaterServiceLocalStorage from "../services/operateri/OperaterServiceLocalStorage.js";
import OperaterServiceFireBase from "../services/operateri/OperaterServiceFireBase.js";
import useAuth from "../hooks/useAuth.js";

import {FaCheck} from "react-icons/fa6";
import {DATA_SOURCE, DATA_SOURCES} from "../constants.js";

const DataSourcePicker = () => {
    const {logout} = useAuth();

    const getDatasourceName = (switchCondition) => {
        if (!switchCondition) switchCondition = DATA_SOURCE;
        switch (switchCondition) {
            case DATA_SOURCES.M:
                return "Memorija";
            case DATA_SOURCES.L:
                return "Local Storage";
            case DATA_SOURCES.F:
                return "Firebase";
        }
    }

    const promijeniIzvor = async (noviIzvor) => {
        let izvor = DATA_SOURCES.M;

        if (noviIzvor === DATA_SOURCES.L) {
            const servis = await OperaterServiceLocalStorage.get();
            if (servis.data.length > 0) {
                izvor = noviIzvor;
            } else {
                alert(`Nije moguće promijeniti izvor podataka na ${DATA_SOURCES.L} jer nema podataka.`);
                return;
            }

        }
        if (noviIzvor === DATA_SOURCES.F) {
            const servis = await OperaterServiceFireBase.get();
            if (servis.data.length > 0) {
                izvor = noviIzvor;
            } else {
                alert(`Nije moguće promijeniti izvor podataka na ${DATA_SOURCES.F} jer nema podataka.`);
                return;
            }
        }

        localStorage.setItem("dataSource", izvor);
        logout()
        window.location.reload();
    };

    const pickerItems = Object.values(DATA_SOURCES).map((item) => {
        const isSelected = DATA_SOURCE === item;
        let label = getDatasourceName(item);
        if (isSelected) label = (
            <span>
                <FaCheck/>&nbsp;{getDatasourceName(item)}
            </span>
        );
        return (
            <Dropdown.Item
                onClick={() => promijeniIzvor(item)}
                key={item}
            >
                {label}
            </Dropdown.Item>
        )
    })

    return (
        <div className={'data-source-picker-wrapper'}>
            <Dropdown align="end" drop="up" className={"data-source-picker-dropdown"}>
                <Dropdown.Toggle className={"btn btnWarning"}>
                    {getDatasourceName()}
                </Dropdown.Toggle>
                <Dropdown.Menu className={"data-source-picker-dropdown-menu"}>
                    {pickerItems}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default DataSourcePicker;