import React from "react";
import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <div
      style={{
        height: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ClipLoader color="#222222" loading={loading} size={72} />
    </div>
  );
};

export default loading;
