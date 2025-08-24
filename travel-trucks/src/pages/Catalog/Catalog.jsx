import { useState } from "react";
import Filters from "../../components/Filters/Filters";
import TruckList from "../../components/TruckList/TruckList";
import s from "./Catalog.module.css";

function Catalog() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 4;

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
