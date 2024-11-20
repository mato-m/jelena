import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";
const About = () => {
  const t = useTranslations("Homepage");
  return (
    <div className="container" id="o-jeleni">
      <h2>{t("link2")}</h2>
      <div className={styles.aboutRow}>
        <div className={styles.aboutImgWrapper}>
          <Image
            quality={100}
            className={styles.aboutImg}
            src="/about/about1.jpeg"
            alt="Jelena"
            width={300}
            height={300}
          />
          <h3>{t("aboutTitle1")}</h3>
        </div>
        <p className={styles.aboutText}>{t("aboutText1")}</p>
      </div>

      <div className={styles.aboutRow}>
        <div className={styles.aboutImgWrapper}>
          <Image
            quality={100}
            className={styles.aboutImg}
            src="/about/about2.jpeg"
            alt="Jelena"
            width={300}
            height={300}
          />
          <h3>{t("aboutTitle2")}</h3>
        </div>
        <p className={styles.aboutText}>{t("aboutText2")}</p>
      </div>

      <div className={styles.aboutRow}>
        <div className={styles.aboutImgWrapper}>
          <Image
            quality={100}
            className={styles.aboutImg}
            src="/about/about3.jpeg"
            alt="Jelena"
            width={300}
            height={300}
          />
          <h3>{t("aboutTitle3")}</h3>
        </div>
        <p className={styles.aboutText}>{t("aboutText3")}</p>
      </div>
      <div className={styles.aboutRow}>
        <div className={styles.aboutImgWrapper}>
          <Image
            quality={100}
            className={styles.aboutImg}
            src="/about/about4.jpeg"
            alt="Jelena"
            width={300}
            height={300}
          />
          <h3>{t("aboutTitle4")}</h3>
        </div>
        <p className={styles.aboutText}>{t("aboutText4")}</p>
      </div>
      <div className={styles.aboutRow}>
        <div className={styles.aboutImgWrapper}>
          <Image
            quality={100}
            className={styles.aboutImg}
            src="/about/about5.jpeg"
            alt="Jelena"
            width={300}
            height={300}
          />
          <h3>{t("aboutTitle5")}</h3>
        </div>
        <p className={styles.aboutText}>{t("aboutText5")}</p>
      </div>
    </div>
  );
};

export default About;
