import {Pagination} from "react-bootstrap";
import {CustomSelect} from "../CustomSelect";

export function CustomPaginationScreen(
    {
        startItem,
        endItem,
        renderPages,
        numberOfResults,
        currentPage,
        totalPages,
        pageSize,
        handlePageSizeChange,
        totalItems,
        handlePageChange,
        resultsLabel
    }
) {
    return (
        <div className="table-pagination-wrapper">
            <div className="pagination-info">
                <span>Prikazuje se <b>{totalItems ? startItem : 0}</b>–<b>{endItem}</b> od <b>{totalItems}</b> {resultsLabel ? ` ${resultsLabel}` : " rezultata"}</span>
            </div>
            <Pagination className="custom-pagination custom-pagination-border" aria-label="Navigacija kroz stranice">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || totalItems < 1}
                    aria-label="Prva stranica"
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || totalItems < 1}
                    aria-label="Prethodna stranica"
                />
                {renderPages()}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalItems < 1}
                    aria-label="Sljedeća stranica"
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || totalItems < 1}
                    aria-label="Zadnja stranica"
                />
            </Pagination>
            <div className="pagination-size pagination-size-padding">
                {pageSize && (
                    <CustomSelect
                        id={"pagination-size-select"}
                        podaci={numberOfResults}
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className={"pagination-select"}
                    />
                )}
            </div>
        </div>
    )
}