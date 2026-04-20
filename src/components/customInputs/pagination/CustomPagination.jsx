import { Pagination } from "react-bootstrap";
import "../../../styles/customComponents.css"
import { CustomSelect } from "../CustomSelect.jsx";
import { useMemo } from "react";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from "../../../constants.js";
import useBreakpoint from "../../../hooks/useBreakpoint.js";
import { CustomPaginationScreen } from "./CustomPaginationScreen.jsx";
import { MobileCustomPagination } from "./MobileCustomPagination.jsx";

export function CustomPagination(
    { currentPage, totalPages, pageSize, handlePageSizeChange, totalItems, handlePageChange, resultsLabel }
) {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    const sirina = useBreakpoint();

    const numberOfResults = useMemo(() => PAGE_SIZES.map(size => ({
        value: size,
        label: `${size} / stranici`,
    })), []);

    const renderPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            const isFirst = i === 1;
            const isLast = i === totalPages;
            const isNearCurrent = Math.abs(i - currentPage) <= 2;

            if (isFirst || isLast || isNearCurrent) {
                pages.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            } else {
                const prev = pages.at(-1);
                if (!prev || prev.type !== Pagination.Ellipsis) {
                    pages.push(<Pagination.Ellipsis key={`e-${i}`} disabled />);
                }
            }
        }
        return pages;
    };

   const renderMobilePages = () => {
    const pages = [];

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i >= 1 && i <= totalPages) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
    }

    return pages;
};

    return totalItems > DEFAULT_PAGE_SIZE && (["xs", "sm", "md"].includes(sirina) ? (

        <MobileCustomPagination
            startItem={startItem}
            endItem={endItem}
            renderPages={renderMobilePages}
            numberOfResults={numberOfResults}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
            resultsLabel={resultsLabel}
        />

    ) : (
        <CustomPaginationScreen
            startItem={startItem}
            endItem={endItem}
            renderPages={renderPages}
            numberOfResults={numberOfResults}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
            resultsLabel={resultsLabel}
        />
    )
    );
}