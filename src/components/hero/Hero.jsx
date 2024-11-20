import React from "react";
import styles from "./Hero.module.css";
import { useTranslations } from "next-intl";
const Hero = () => {
  const t = useTranslations("Homepage");
  return (
    <div className={styles.heroMain} id="top">
      <div className={styles.heroOverlay}>
        <img src="./navlogo.svg" alt="Jelena" />
        <h1>Jelena Vušurović</h1>
        <h2>{t("mainSubtitle")}</h2>
      </div>
    </div>
  );
};

export default Hero;
