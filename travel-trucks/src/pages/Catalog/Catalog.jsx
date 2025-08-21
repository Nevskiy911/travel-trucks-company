import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../features/campers/campersSlice";
import Filters from "../../components/Filters/Filters";
import Truck from "../../components/Truck/Truck";
import s from "./Catalog.module.css";
import Button from "../../components/Button/Button";

function Catalog() {
  const dispatch = useDispatch();
  const { items, status, error, total } = useSelector((state) => state.campers);

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 4;

  const handleChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page, limit }));
  }, [dispatch, filters, page]);

  if (status === "loading" && page === 1) return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!items || items.length === 0) return <div>No campers available.</div>;

  return (
    <div className={s.catalogContainer}>
      <Filters onChange={handleChange} />
      <section className={s.campersList}>
        {items.map((camper) => (
          <Truck key={camper.id} camper={camper} />
        ))}
        {items.length < total && (
          <div className={s.btnWrapper}>
            <button
              type="button"
              onClick={handleLoadMore}
              className={s.loadMore}
            >
              {status === "loading" && page > 1 ? "Loading..." : "Load More"}{" "}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Catalog;
