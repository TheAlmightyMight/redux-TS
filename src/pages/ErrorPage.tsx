import React from "react";

const ErrorPage: React.FC = (props: any) => {
  return (
    <div
      className="some"
      style={{ textAlign: "center", width: "100%", height: "100px" }}
    >
      <p>Что-то пошло не так. Данной страницы не существует</p>
    </div>
  );
};

export default ErrorPage;
