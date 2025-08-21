import s from "./FeatureButton.module.css";

function FeatureButton({ children, onClick }) {
  return (
    <button className={s.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default FeatureButton;
