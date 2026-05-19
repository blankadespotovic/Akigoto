import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {DATA_SOURCE, DATA_SOURCES, RouteNames} from "../../constants.js";
import UceniciService from "../../services/ucenici/UceniciService.js";
import {PregledUcenikaTablica} from "./PregledUcenikaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import {PregledUcenikaGrid} from "./PregledUcenikaGrid.jsx";
import {CustomPagination} from "../../components/customInputs/pagination/CustomPagination.jsx";
import {usePaginationSettings} from "../../hooks/usePaginationService.js";
import LekcijeService from "../../services/lekcije/LekcijeService.js";
import PostignucaService from "../../services/postignuca/PostignucaService.js";
import {Form, InputGroup} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {FaMagnifyingGlass} from "react-icons/fa6";
import useLoading from "../../hooks/useLoading.js";

export default function PregledUcenika() {
    const navigate = useNavigate()
    const sirina = useBreakpoint();
    const {pageSize, setPageSize} = usePaginationSettings("ucenici")
    const {showLoading, hideLoading, loading} = useLoading()

    const [ucenici, setUcenici] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [svaPostignucaSvihUcenika, setSvaPostignucaSvihUcenika] = useState([]);
    const [vrijednostPretrage, setVrijednostPretrage] = useState("")

    async function ucitajUcenike(selectedPage, selectedPageSize, vrijednostPretrage) {
        if(DATA_SOURCE !== DATA_SOURCES.F)
            showLoading();
        await UceniciService.getPage(selectedPage, selectedPageSize, vrijednostPretrage).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setUcenici(odgovor.data)
            setTotalPages(odgovor.totalPages)
            setTotalItems(odgovor.totalItems)
            if(DATA_SOURCE !== DATA_SOURCES.F)
                hideLoading()
        })
    }

    useEffect(() => {
        const dohvatiSveLekcije = async () => {
            const sveLekcije = await LekcijeService.get()
                .then(lekcijeOdgovor => {
                    if (!lekcijeOdgovor.success) {
                        alert("Nije implementiran servis")
                        return
                    }
                    return lekcijeOdgovor.data;
                });
            const svaPostignuca = await PostignucaService.get()
                .then(postignucaOdgovor => {
                    if (!postignucaOdgovor.success) {
                        alert("Nije implementiran servis")
                        return
                    }
                    return postignucaOdgovor.data;
                });

            const sve = [];
            for (const ucenik of ucenici) {
                const postignucaUcenikaIds = sveLekcije
                    .filter(l => l.ucenici.includes(ucenik.sifra))
                    .flatMap(l => l.postignuca);
                const sortiraniIds = [...new Set(postignucaUcenikaIds)].sort()
                const postignucaUcenika = svaPostignuca.filter(p => sortiraniIds.includes(p.sifra));
                sve.push({
                    sifra: ucenik.sifra,
                    postignuca: postignucaUcenika
                });
            }
            setSvaPostignucaSvihUcenika(sve)
        }

        dohvatiSveLekcije();
    }, [ucenici]);

    function handlePageChange(page) {
        setCurrentPage(page)
    }

    useEffect(() => {
        ucitajUcenike(currentPage, pageSize, vrijednostPretrage);
    }, [currentPage, pageSize, vrijednostPretrage]);


    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) {
            return
        }
        await UceniciService.obrisi(sifra)

        const newTotalItems = totalItems - 1;
        const newTotalPages = Math.ceil(newTotalItems / pageSize);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else {
            await ucitajUcenike(currentPage, pageSize);
        }
        hideLoading()
    }

    const handlePageSizeChange = (newSize) => {
        const newTotalPages = Math.ceil(totalItems / newSize);
        setPageSize(newSize);
        setCurrentPage(prev => Math.min(prev, newTotalPages || 1));
    }

    function handleSearchChange(e) {
        setVrijednostPretrage(e.target.value)
        setCurrentPage(1)
    }

    function handleClear() {
        setVrijednostPretrage("")
        setCurrentPage(1)
    }

    return !loading && (
        <>
            <Link to={RouteNames.UCENICI_NOVI} id="btnAdd"
                  className="btn btnAdd w-100 my-3">
                Dodavanje novog učenika
            </Link>
            <InputGroup>
                <Form.Control
                    type={"text"}
                    value={vrijednostPretrage}
                    className={"custom-input"}
                    placeholder={"Pretraži učenike..."}
                    onChange={handleSearchChange}
                />
                <InputGroup.Text className={"custom-addon"}>
                    {vrijednostPretrage === "" ? (
                        <FaMagnifyingGlass/>
                    ) : (
                        <FaTimes onClick={handleClear}/>
                    )}
                </InputGroup.Text>
            </InputGroup>
            {ucenici.length > 0 && ["xs", "sm", "md"].includes(sirina) ? (
                <PregledUcenikaGrid
                    ucenici={ucenici}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            ) : (
                <PregledUcenikaTablica
                    ucenici={ucenici}
                    svaPostignucaSvihUcenika={svaPostignucaSvihUcenika}
                    obrisi={obrisi}
                />
            )}
            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                handlePageSizeChange={handlePageSizeChange}
                totalItems={totalItems}
                resultsLabel={"učenika"}
            />
        </>
    )
}