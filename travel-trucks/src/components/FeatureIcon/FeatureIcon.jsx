import s from "./FeatureIcon.module.css";
import sprite from "../../assets/icons/sprite.svg";

const ICONS_MAP = {
  transmission: "icon-transmission",
  engine: "icon-engine",
  ac: "icon-ac",
  kitchen: "icon-kitchen",
  bathroom: "icon-bathroom",
  tv: "icon-tv",
  radio: "icon-radio",
  refrigerator: "icon-refrigerator",
  microwave: "icon-microwave",
  gas: "icon-gas",
  water: "icon-water",
};

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function FeatureIcon({ name, label }) {
  const iconId = ICONS_MAP[name];

  return (
    <div className={s.feature}>
      <svg className={s.icon}>
        <use href={`${sprite}#${iconId}`} />
      </svg>
      <span className={s.label}>{capitalize(label)}</span>
    </div>
  );
}

export default FeatureIcon;
