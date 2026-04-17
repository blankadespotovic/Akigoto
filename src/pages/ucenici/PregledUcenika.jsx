import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants.js";
import UceniciService from "../../services/ucenici/UceniciService.js";
import { PregledUcenikaTablica } from "./PregledUcenikaTablica.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { PregledUcenikaGrid } from "./PregledUcenikaGrid.jsx";
import { Pagination } from "react-bootstrap";

export default function PregledUcenika() {

   const navigate = useNavigate()
    const sirina = useBreakpoint();

    const [ucenici, setUcenici] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const pageSize = 5

    async function ucitajUcenike(page) {
        await UceniciService.getPage(page, pageSize).then((odgovor) => {
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
        ucitajUcenike(currentPage);
    }, [currentPage]);


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
            ucitajUcenike(currentPage);
        }
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

             {/* Pagination komponenta */}
            {totalPages > 1 && (

                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Prikaži samo stranice blizu trenutne stranice
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                            ) {
                                return (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPage}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                );
                            } else if (
                                pageNumber === currentPage - 3 ||
                                pageNumber === currentPage + 3
                            ) {
                                return <Pagination.Ellipsis key={pageNumber} disabled />;
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>

            )}
        </>

    )
}
