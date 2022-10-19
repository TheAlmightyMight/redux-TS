import React from "react";
//@ts-ignore
import styles from "././Error.module.css";
const ErrorPage: React.FC = (props: any) => {
  return (
    <div className={styles.container}>
      <p>Что-то пошло не так. Данной страницы не существует</p>
    </div>
  );
};

export default ErrorPage;
