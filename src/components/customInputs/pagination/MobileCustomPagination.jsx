import { Col, Pagination, Row } from "react-bootstrap";
import { CustomSelect } from "../CustomSelect";

export function MobileCustomPagination(
    { startItem, endItem, renderPages, numberOfResults, currentPage, totalPages, pageSize, handlePageSizeChange, totalItems, handlePageChange, resultsLabel }
) {
    return (
        <div className="table-pagination-wrapper">
            <Row className="g-3">
                <Col xs={6} className="justify-content-start">
                    <div className="pagination-info text-center">
                        {totalItems &&
                            <span>Prikazuje se <b>{startItem}</b>–<b>{endItem}</b> od <b>{totalItems}</b> {resultsLabel ? ` ${resultsLabel}` : ' rezultata'}</span>
                        }
                    </div>
                </Col>

                <Col xs={6} className="flex-fill">
                    <div className="pagination-size">
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
                </Col>
                <Col xs={12}>
                    <Pagination className="custom-pagination d-flex align-items-center justify-content-center">
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
                </Col>
            </Row>
        </div>
    )
}