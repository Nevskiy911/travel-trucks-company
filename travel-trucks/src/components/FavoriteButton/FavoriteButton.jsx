import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/campers/favoritesSlice";
import sprite from "../../assets/icons/sprite.svg";
import s from "./FavoriteButton.module.css";

function FavoriteButton({ camperId }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(camperId);

  const handleClick = () => {
    dispatch(toggleFavorite(camperId));
  };

  return (
    <button
      type="button"
      className={`${s.button} ${isFavorite ? s.active : ""}`}
      onClick={handleClick}
      aria-label="Add to favorites"
    >
      <svg className={s.icon}>
        <use href={`${sprite}#icon-heart`} />
      </svg>
    </button>
  );
}

export default FavoriteButton;
