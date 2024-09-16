import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
const Hero = ({ t }) => {
  return (
    <div className={styles.heroMain} id="top">
      <div className={styles.heroOverlay}>
        <img
          data-aos="fade-up"
          data-aos-duration="800"
          src="./navlogo.svg"
          alt="Jelena"
        />
        <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          Jelena Vušurović
        </h1>
        <h2 data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
          {t("mainSubtitle")}
        </h2>
      </div>
    </div>
  );
};

export default Hero;
