function Location({ location }) {
  const [country, city] = location.split(", ");
  return (
    <div>
      <p>{`${city}, ${country}`}</p>
    </div>
  );
}

export default Location;
