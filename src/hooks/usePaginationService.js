import {useEffect, useState} from "react";
import {DEFAULT_PAGE_SIZE} from "../constants.js";

const STORAGE_PREFIX = "pagination";

export const usePaginationSettings = (
    key, defaultPageSize = DEFAULT_PAGE_SIZE
) => {
    const storageKey = `${STORAGE_PREFIX}-${key}`;

    const [pageSize, setPageSize] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : defaultPageSize;
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(pageSize));
    }, [pageSize, storageKey]);

    return {
        pageSize,
        setPageSize
    };
}