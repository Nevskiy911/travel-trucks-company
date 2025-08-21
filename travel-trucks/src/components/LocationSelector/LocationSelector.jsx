function LocationSelector({ campers, onSelect }) {
  const locations = [...new Set(campers.map((c) => c.location))];

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select location</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
}
