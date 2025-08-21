import s from "./VehicleDetails.module.css";

function VehicleDetails({ camper }) {
  const specs = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className={s.vehicleDetails}>
      <h3 className={s.title}>Vehicle Details</h3>
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
