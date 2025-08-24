import s from "../FeatureCheckbox/FeatureCheckbox.module.css";
import sprite from "../../assets/icons/sprite.svg";

function FeatureRadio({ name, value, label, iconId, checked, onChange }) {
  return (
    <label className={`${s.option} ${checked ? s.active : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={s.hiddenInput}
      />
      <svg className={s.icon}>
        <use href={`${sprite}#${iconId}`} />
      </svg>
      <span>{label}</span>
    </label>
  );
}

export default FeatureRadio;
