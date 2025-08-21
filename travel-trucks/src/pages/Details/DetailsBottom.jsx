import { useState } from "react";
// import BookingForm from "../BookingForm/BookingForm";
// import FeaturesList from "../../components/FeaturesList/FeaturesList";
// import Reviews from "../Reviews/Reviews";
import s from "./Details.module.css";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import BookingForm from "../../components/Booking/BookingForm";
import VehicleDetails from "../../components/VehicleDetails/VehicleDetails";

function DetailsBottom({ camper }) {
  const [activeTab, setActiveTab] = useState("features");

  return (
    <div>
      <div className={s.buttons}>
        <button
          className={activeTab === "features" ? s.active : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? s.active : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomLeft}>
          <FeaturesList camper={camper} showAll />
          <div className={s.vehicle}>
            <VehicleDetails camper={camper} />
          </div>
        </div>

        <BookingForm />
      </div>
    </div>
  );
}

export default DetailsBottom;
