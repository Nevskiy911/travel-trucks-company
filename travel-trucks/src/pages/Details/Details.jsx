import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return <h1>Details page for car {id}</h1>;
}

export default Details;
