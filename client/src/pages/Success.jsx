import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  // const location = useLocation()
  let navigate = useNavigate();
 const goHome = () => {
   navigate("/")
 }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={goHome} style={{ padding: 10, marginTop: 20 }}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
