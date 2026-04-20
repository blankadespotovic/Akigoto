import { Pagination } from "react-bootstrap";
import { CustomSelect } from "../CustomSelect";

export function CustomPaginationScreen(
     {startItem, endItem, renderPages, numberOfResults, currentPage, totalPages, pageSize, handlePageSizeChange, totalItems, handlePageChange, resultsLabel}
){
    return(
         <div className="table-pagination-wrapper">
            <div className="pagination-info">
                {totalItems &&
                    <span>Prikazuje se <b>{startItem}</b>–<b>{endItem}</b> od <b>{totalItems}</b> {resultsLabel ? ` ${resultsLabel}` : ' rezultata'}</span>
                }
            </div>
            <Pagination className="custom-pagination custom-pagination-border">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {renderPages()}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
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