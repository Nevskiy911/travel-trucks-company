import s from "./VehicleDetails.module.css";

function formatLabel(value) {
  return value
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(" ");
}

function addSpaceBetweenNumberAndUnit(value) {
  return value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
}

function VehicleDetails({ camper }) {
  const specs = [
    { label: "Form", value: formatLabel(camper.form) },
    { label: "Length", value: addSpaceBetweenNumberAndUnit(camper.length) },
    { label: "Width", value: addSpaceBetweenNumberAndUnit(camper.width) },
    { label: "Height", value: addSpaceBetweenNumberAndUnit(camper.height) },
    { label: "Tank", value: addSpaceBetweenNumberAndUnit(camper.tank) },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className={s.vehicleDetails}>
      <h3 className={s.title}>Vehicle Details</h3>
      <div className={s.line}></div>
      <ul className={s.specList}>
        {specs.map(({ label, value }) => (
          <li key={label} className={s.specItem}>
            <span className={s.label}>{label}:</span>
            <span className={s.value}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleDetails;
