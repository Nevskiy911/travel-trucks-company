import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import s from "./Home.module.css";

function Home() {
  return (
    <section className={s.wrapper}>
      <div className={s.home}>
        <h1 className={s.title}>Campers of your dreams</h1>
        <h2 className={s.description}>
          You can find everything you want in our catalog
        </h2>
        <div>
          <Link to="/catalog">
            <Button children={`View Now`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Home;
