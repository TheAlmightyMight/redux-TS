import React from "react";
//@ts-ignore
import styles from "./About.module.css";

const About: React.FC = (props: any) => {
  return (
    <div className={styles.app}>
      <section style={{ width: "600px" }}>
        <p>This is my shop's about page, welcome!</p>
      </section>
    </div>
  );
};

export default About;
