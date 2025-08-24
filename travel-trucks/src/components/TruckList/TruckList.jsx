import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../features/campers/campersSlice";
import Truck from "../Truck/Truck";
import s from "./TruckList.module.css";
import Loader from "../Loader/Loader";

function TruckList({ filters, page, limit, onLoadMore }) {
  const dispatch = useDispatch();
  const {
    items = [],
    status,
    total,
    error,
  } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page, limit }));
  }, [dispatch, filters, page, limit]);

  if (status === "loading" && page === 1) return <Loader />;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <section className={s.campersList}>
      {items.length === 0 ? (
        <div>No campers found for selected filters.</div>
      ) : (
        <>
          {items.map((camper) => (
            <Truck key={camper.id} camper={camper} />
          ))}
          {items.length < total && (
            <button type="button" onClick={onLoadMore} className={s.loadMore}>
              {status === "loading" && page > 1 ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default TruckList;
