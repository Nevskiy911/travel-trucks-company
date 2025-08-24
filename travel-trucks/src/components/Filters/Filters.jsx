import { useEffect, useState, useRef, useMemo } from "react";
import { getCampers } from "../../features/campers/campersAPI";
import Location from "../Location/Location";
import FeatureCheckbox from "../FeatureCheckbox/FeatureCheckbox";
import FeatureRadio from "../FeatureRadio/FeatureRadio";
import sprite from "../../assets/icons/sprite.svg";
import s from "./Filters.module.css";
import Button from "../Button/Button";

const defaultFilters = {
  location: "",
  transmission: "",
  form: "",
  AC: false,
  kitchen: false,
  bathroom: false,
  TV: false,
  radio: false,
  refrigerator: false,
  microwave: false,
  gas: false,
  water: false,
};

const booleanFilters = [
  { key: "AC", label: "AC", icon: "icon-ac" },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
  { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
  { key: "TV", label: "TV", icon: "icon-tv" },
  { key: "radio", label: "Radio", icon: "icon-radio" },
  { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
  { key: "gas", label: "Gas", icon: "icon-gas" },
  { key: "water", label: "Water", icon: "icon-water" },
];

const vehicleTypes = [
  { value: "alcove", label: "Alcove", icon: "icon-alcove" },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "icon-integrated",
  },
  { value: "panelTruck", label: "Van", icon: "icon-paneltruck" },
];

function Filters({ filters, onSearch, loading }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    getCampers()
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : data;
        const uniqueLocations = [...new Set(items.map((c) => c.location))];
        setLocations(uniqueLocations);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationSelect = (loc) => {
    setLocalFilters((prev) => ({ ...prev, location: loc }));
    setShowDropdown(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleTransmissionChange = (e) => {
    const { checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      transmission: checked ? "automatic" : "",
    }));
  };

  const handleVehicleTypeChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, form: e.target.value }));
  };

  const isFiltersChanged = useMemo(() => {
    return JSON.stringify(localFilters) !== JSON.stringify(defaultFilters);
  }, [localFilters]);

  const handleSearch = () => {
    onSearch(localFilters);
  };

  return (
    <div className={s.filters}>
      <p className={s.locationTitle}>Location</p>
      <div ref={dropdownRef} className={s.dropdownWrapper}>
        <div
          className={s.locationBadge}
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <svg className={s.iconLocation} aria-hidden="true">
            <use href={`${sprite}#icon-location`} />
          </svg>
          <Location location={localFilters.location || "Select location"} />
        </div>
        {showDropdown && (
          <ul className={s.dropdownList}>
            {locations.map((loc) => (
              <li
                key={loc}
                className={s.dropdownItem}
                onClick={() => handleLocationSelect(loc)}
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className={s.title}>Vehicle equipment</h3>
      <div className={s.line}></div>
      <div className={`${s.grid} ${s.gridTop}`}>
        {booleanFilters.map(({ key, label, icon }) => (
          <FeatureCheckbox
            key={key}
            name={key}
            label={label}
            iconId={icon}
            checked={!!localFilters[key]}
            onChange={handleCheckboxChange}
          />
        ))}
        <FeatureCheckbox
          name="transmission"
          label="Automatic"
          iconId="icon-transmission"
          checked={localFilters.transmission === "automatic"}
          onChange={handleTransmissionChange}
        />
      </div>

      <h3 className={s.boolTitle}>Vehicle type</h3>
      <div className={s.line}></div>
      <div className={`${s.grid} ${s.gridBottom}`}>
        {vehicleTypes.map(({ value, label, icon }) => (
          <FeatureRadio
            key={value}
            name="form"
            value={value}
            label={label}
            iconId={icon}
            checked={localFilters.form === value}
            onChange={handleVehicleTypeChange}
          />
        ))}
      </div>

      <div className={s.searchBtnWrapper}>
        <Button onClick={handleSearch} disabled={!isFiltersChanged || loading}>
          {loading ? <div className={s.spinner}></div> : "Search"}
        </Button>
      </div>
    </div>
  );
}

export default Filters;
