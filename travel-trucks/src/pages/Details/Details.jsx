import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCamperById } from "../../features/campers/campersAPI";
import Rating from "../../components/Rating/Rating";
import Location from "../../components/Location/Location";
import s from "./Details.module.css";
import sprite from "../../assets/icons/sprite.svg";
import DetailsBottom from "./DetailsBottom";
import Loader from "../../components/Loader/Loader";

function Details() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCamperById(id)
      .then((data) => setCamper(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!camper) return <p>Camper not found</p>;

  return (
    <div className={s.details}>
      <h2>{camper.name}</h2>
      <div className={s.ratingAndLocation}>
        <div style={{ cursor: "pointer" }}>
          <Rating rating={camper.rating} reviewsCount={camper.reviews.length} />
        </div>
        <div className={s.location}>
          <svg className={s.iconLocation}>
            <use href={`${sprite}#icon-location`} />
          </svg>
          <Location location={camper.location} />
        </div>
      </div>
      <h2>
        {"\u20AC"}
        {camper.price.toFixed(2)}
      </h2>
      <div className={s.gallery}>
        {camper.gallery?.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`${camper.name} ${index + 1}`}
            className={s.galleryImage}
          />
        ))}
      </div>
      <p className={s.description}>{camper.description}</p>
      <DetailsBottom camper={camper} />
    </div>
  );
}

export default Details;
