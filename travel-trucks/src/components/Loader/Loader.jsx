import s from "./Loader.module.css";

function Loader() {
  return (
    <div className={s.overlay}>
      <div className={s.spinner}></div>
    </div>
  );
}

export default Loader;
