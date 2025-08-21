import s from "./Filters.module.css";
import { useState } from "react";

function Filters({ onChange }) {
  const [filters, setFilters] = useState({
    location: "",
    form: "",
    AC: false,
    kitchen: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className={s.filters}>
      <h3>Vehicle equipment</h3>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
        <select name="form" value={filters.form} onChange={handleChange}>
          <option value="">All forms</option>
          <option value="fullyIntegrated">Fully Integrated</option>
          <option value="panelTruck">Panel Truck</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="AC"
            checked={filters.AC}
            onChange={handleChange}
          />
          AC
        </label>
        <label>
          <input
            type="checkbox"
            name="kitchen"
            checked={filters.kitchen}
            onChange={handleChange}
          />
          Kitchen
        </label>
      </div>
    </div>
  );
}

export default Filters;
