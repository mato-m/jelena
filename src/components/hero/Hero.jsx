import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
const Hero = ({ t }) => {
  return (
    <div className={styles.heroMain} id="top">
      <div className={styles.heroOverlay}>
        <img src="./navlogo.svg" alt="Jelena" width={250} height={250} />
        <h1>Jelena Vušurović</h1>
        <h2>{t("mainSubtitle")}</h2>
      </div>
    </div>
  );
};

export default Hero;
