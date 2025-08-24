function Location({ location }) {
  const parts = location.split(",").map((s) => s.trim());
  if (parts.length === 2) {
    const [country, city] = parts;
    return <span>{`${city}, ${country}`}</span>;
  }
  return <span>{location}</span>;
}

export default Location;
