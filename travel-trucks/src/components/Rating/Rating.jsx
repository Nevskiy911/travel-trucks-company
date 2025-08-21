import s from "./Rating.module.css";
import sprite from "../../assets/icons/sprite.svg";

function Rating({ rating, reviewsCount }) {
  return (
    <div className={s.rating}>
      <svg className={s.icon}>
        <use href={`${sprite}#icon-rating`} />
      </svg>
      <p className={s.underline}>
        {rating} ({reviewsCount} Reviews)
      </p>
    </div>
  );
}

export default Rating;
