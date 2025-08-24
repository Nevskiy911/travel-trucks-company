import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import TruckList from "../../components/TruckList/TruckList";
import s from "./Catalog.module.css";

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const pageFromParams = parseInt(params.page) || 1;
    const filtersFromParams = { ...params };
    delete filtersFromParams.page;
    setFilters(filtersFromParams);
    setPage(pageFromParams);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", page);
    setSearchParams(params);
  }, [filters, page]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className={s.catalogContainer}>
      <Filters filters={filters} onSearch={handleSearch} loading={false} />
      <TruckList
        filters={filters}
        page={page}
        limit={limit}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}

export default Catalog;
