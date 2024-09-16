import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
const Hero = ({ t }) => {
  return (
    <div className={styles.heroMain} id="top">
      <div className={styles.heroOverlay}>
        <Image
          quality={50}
          src="./navlogo.svg"
          alt="Jelena"
          width={300}
          height={300}
        />
        <h1>Jelena Vušurović</h1>
        <h2>{t("mainSubtitle")}</h2>
      </div>
    </div>
  );
};

export default Hero;
