import { Link } from "react-router-dom";

function Catalog() {
  return (
    <>
      <h1>Catalog page</h1>
      <ul>
        <li>
          <Link to="/catalog/1">Car 1</Link>
        </li>
        <li>
          <Link to="/catalog/2">Car 2</Link>
        </li>
      </ul>
    </>
  );
}

export default Catalog;
