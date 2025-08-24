//

import s from "./Details.module.css";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import BookingForm from "../../components/Booking/BookingForm";
import VehicleDetails from "../../components/VehicleDetails/VehicleDetails";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import { useEffect, useRef } from "react";

function DetailsBottom({ camper, activeTab, setActiveTab }) {
  const reviewsRef = useRef(null);

  useEffect(() => {
    if (activeTab === "reviews" && reviewsRef.current) {
      const timer = setTimeout(() => {
        reviewsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

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

      <div className={s.line}></div>

      <div className={s.bottom}>
        <div
          className={`${s.bottomLeft} ${
            activeTab === "features" ? s.featuresBg : s.reviewsBg
          }`}
        >
          {activeTab === "features" && (
            <>
              <FeaturesList camper={camper} showAll />
              <div className={s.vehicle}>
                <VehicleDetails camper={camper} />
              </div>
            </>
          )}

          {activeTab === "reviews" && (
            <div ref={reviewsRef}>
              <ReviewsList reviews={camper.reviews} />
            </div>
          )}
        </div>

        <BookingForm />
      </div>
    </div>
  );
}

export default DetailsBottom;
