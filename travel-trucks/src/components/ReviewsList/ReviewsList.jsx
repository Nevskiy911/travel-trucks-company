import s from "./ReviewsList.module.css";
import sprite from "../../assets/icons/sprite.svg";

function ReviewsList({ reviews }) {
  return (
    <div className={s.reviewsWrapper}>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li
            key={`${review.reviewer_name}-${review.comment.slice(0, 10)}`}
            className={s.reviewItem}
          >
            <div className={s.header}>
              <div className={s.avatar}>
                <h2>{review.reviewer_name.charAt(0).toUpperCase()}</h2>
              </div>
              <div className={s.userInfo}>
                <span className={s.name}>{review.reviewer_name}</span>
                <div className={s.rating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`${s.star} ${
                        i < review.reviewer_rating ? s.filled : ""
                      }`}
                      width="16"
                      height="16"
                    >
                      <use href={`${sprite}#icon-rating`} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsList;
