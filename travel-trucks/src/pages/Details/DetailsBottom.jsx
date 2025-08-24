import s from "./Details.module.css";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import BookingForm from "../../components/Booking/BookingForm";
import VehicleDetails from "../../components/VehicleDetails/VehicleDetails";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function DetailsBottom({ camper }) {
  const reviewsRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "features";

  const setActiveTab = (tab) => setSearchParams({ tab });

  useEffect(() => {
    if (activeTab === "reviews" && reviewsRef.current) {
      const timer = setTimeout(() => {
        reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, camper?.reviews?.length]);

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
              <ReviewsList reviews={camper?.reviews || []} />
            </div>
          )}
        </div>

        <BookingForm />
      </div>
    </div>
  );
}

export default DetailsBottom;
