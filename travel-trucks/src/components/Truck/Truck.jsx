import s from "./Truck.module.css";
import FeaturesList from "../FeaturesList/FeaturesList";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import Location from "../Location/Location";
import sprite from "../../assets/icons/sprite.svg";
import Rating from "../Rating/Rating";

function Truck({ camper }) {
  const location = useLocation();

  return (
    <div className={s.card}>
      <div>
        <img
          src={camper.gallery?.[0]?.thumb}
          alt={camper.name}
          className={s.image}
        />
      </div>
      <div className={s.content}>
        <div className={s.mainText}>
          <h2 className={s.name}>{camper.name}</h2>
          <h2 className={s.price}>
            {"\u20AC"}
            {camper.price.toFixed(2)}
          </h2>
        </div>

        <div className={s.ratingAndLocation}>
          <Link
            to={`/catalog/${camper.id}?tab=reviews&${location.search.replace(
              "?",
              ""
            )}`}
            className={s.ratingLink}
          >
            <Rating
              rating={camper.rating}
              reviewsCount={camper.reviews.length}
            />
          </Link>

          <div className={s.location}>
            <svg className={s.iconLocation}>
              <use href={`${sprite}#icon-location`} />
            </svg>
            <Location location={camper.location} />
          </div>
        </div>

        <div className={s.description}>{camper.description}</div>
        <div className={s.features}>
          <FeaturesList camper={camper} limit={2} />
        </div>
        <div>
          <Link
            to={`/catalog/${camper.id}?${location.search.replace("?", "")}`}
            rel="noopener noreferrer"
          >
            <Button>Show more</Button>
          </Link>
        </div>
      </div>
      <div>
        <FavoriteButton camperId={camper.id} />
      </div>
    </div>
  );
}

export default Truck;
