import FeatureButton from "../FeatureButton/FeatureButton";
import FeatureIcon from "../FeatureIcon/FeatureIcon";
import { featuresMap } from "../../data/featuresMap";
import s from "./FeaturesList.module.css";

function FeaturesList({ camper, limit = 2, showAll = false }) {
  const alwaysVisible = ["transmission", "engine"].map((key) => {
    const value = camper[key];
    const { icon, label } = featuresMap[key];
    const text =
      typeof value === "string"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : label;
    return { key, icon, text, value };
  });

  const otherFeatures = Object.entries(featuresMap)
    .filter(
      ([key]) =>
        !["transmission", "engine"].includes(key) && camper[key] === true
    )
    .map(([key, { icon, label }]) => ({ key, icon, text: label }));

  const visibleFeatures = showAll
    ? [...alwaysVisible, ...otherFeatures]
    : [...alwaysVisible, ...otherFeatures.slice(0, limit)];

  return (
    <div className={s.list}>
      {visibleFeatures.map(({ key, icon, text }) => (
        <FeatureButton key={key}>
          <FeatureIcon name={icon} label={text} />
        </FeatureButton>
      ))}
    </div>
  );
}

export default FeaturesList;
