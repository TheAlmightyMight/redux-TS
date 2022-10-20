import React from "react";

function Unauthorized() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Похоже у вас не достаточно прав, чтобы здесь находится.</h1>
    </div>
  );
}

export default Unauthorized;
