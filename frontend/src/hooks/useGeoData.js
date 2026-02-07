import { useEffect, useMemo, useState } from "react";
import { fetchGeoData } from "../api/geoApi";
import { normalizeGeoData } from "../utils/filterUtils";

const PAGE_SIZE = 25;

const useGeoData = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [sortModel, setSortModel] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchGeoData()
            .then((data) => setRawData(normalizeGeoData(data)))
            .finally(() => setLoading(false));
    }, []);
    const filteredData = useMemo(() => {
        let data = [...rawData];

        if (filters.status) {
            data = data.filter((item) => item.status === filters.status);
        }

        return data;
    }, [rawData, filters]);
    const sortedData = useMemo(() => {
        if (!sortModel.length) return filteredData;

        const { field, sort } = sortModel[0];

        return [...filteredData].sort((a, b) => {
            if (a[field] < b[field]) return sort === "asc" ? -1 : 1;
            if (a[field] > b[field]) return sort === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortModel]);
    const paginatedData = useMemo(() => {
        const start = page * PAGE_SIZE;
        return sortedData.slice(start, start + PAGE_SIZE);
    }, [sortedData, page]);
    return {
        rows: paginatedData,
        totalCount: sortedData.length,
        loading,

        page,
        setPage,

        sortModel,
        setSortModel,

        filters,
        setFilters,
    };
};

export default useGeoData;

