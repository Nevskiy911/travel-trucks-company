import s from "./Button.module.css";

function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      className={s.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
