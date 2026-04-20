import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import UceniciService from "../../services/ucenici/UceniciService.js";
import { PregledUcenikaTablica } from "./PregledUcenikaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { PregledUcenikaGrid } from "./PregledUcenikaGrid.jsx";
import { Pagination } from "react-bootstrap";
import { CustomPagination } from "../../components/customInputs/pagination/CustomPagination.jsx";
import { usePaginationSettings } from "../../hooks/usePaginationService.js";

export default function PregledUcenika() {

   const navigate = useNavigate()
    const sirina = useBreakpoint();

    const [ucenici, setUcenici] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const {pageSize, setPageSize} = usePaginationSettings("ucenici")

    async function ucitajUcenike(selectedPage, selectedPageSize) {
        await UceniciService.getPage(selectedPage, selectedPageSize).then((odgovor) => {
            if (!odgovor.success) {
                alert("Nije implementiran servis")
                return
            }
            setUcenici(odgovor.data)
            setTotalPages(odgovor.totalPages)
            setTotalItems(odgovor.totalItems)
        })
    }

    function handlePageChange(page) {
        setCurrentPage(page)
    }

    useEffect(() => {
        ucitajUcenike(currentPage, pageSize);
    }, [currentPage, pageSize]);


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
    }

    const handlePageSizeChange = (newSize) => {
        const newTotalPages = Math.ceil(totalItems / newSize);
        setPageSize(newSize);
        setCurrentPage(prev => Math.min(prev, newTotalPages || 1));
    }

    return (

        <>

            <Link to={RouteNames.UCENICI_NOVI} id="btnAdd"
                className="btn btnAdd w-100 my-3">
                Dodavanje novog učenika
            </Link>


            {ucenici.length > 0 &&
                (["xs", "sm", "md"].includes(sirina) ? (
                    <PregledUcenikaGrid
                        ucenici={ucenici}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <PregledUcenikaTablica
                        ucenici={ucenici}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                )

                )

            }

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
