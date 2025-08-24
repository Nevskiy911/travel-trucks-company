import s from "./FeatureCheckbox.module.css";
import sprite from "../../assets/icons/sprite.svg";

function FeatureCheckbox({ name, label, iconId, checked, onChange }) {
  return (
    <label className={`${s.option} ${checked ? s.active : ""}`}>
      <input
        type="checkbox"
        name={name}
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

export default FeatureCheckbox;
