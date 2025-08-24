import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { enGB } from "date-fns/locale";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import s from "./BookingForm.module.css";
import Button from "../Button/Button";

const today = new Date();
today.setHours(0, 0, 0, 0);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .test("is-valid-email", "Email is invalid", (value) =>
      value ? emailRegex.test(value) : false
    ),
  bookingDate: Yup.date()
    .transform((value) => {
      if (!value) return value;
      const d = new Date(value);
      d.setHours(0, 0, 0, 0);
      return d;
    })
    .min(today, "Date cannot be in the past")
    .required("Booking date is required"),
});

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Your booking request has been sent!");
    resetForm();
    setSelectedDate(null);
  };

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Book your campervan now</h3>
      <p className={s.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.field}>
              <Field type="text" name="name" placeholder="Name*" />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

            <div className={s.field}>
              <Field type="email" name="email" placeholder="Email*" />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.field}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFieldValue("bookingDate", date);
                }}
                locale={enGB}
                placeholderText="Booking date*"
                minDate={new Date()}
                dateFormat="dd.MM.yyyy"
                formatWeekDay={(nameOfDay) =>
                  nameOfDay.substring(0, 3).toUpperCase()
                }
                className={s.datepicker}
                popperPlacement="bottom-center"
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={s.error}
              />
            </div>

            <div className={s.comment}>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                rows="4"
                placeholder="Comment"
              />
            </div>

            <Button type="submit" className={s.submit} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default BookingForm;
