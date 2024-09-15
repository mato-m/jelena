"use client";
import React from "react";
import styles from "./Footer.module.css";
import { SlEnvolope, SlPhone, SlSocialInstagram } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
const Footer = ({ t }) => {
  const locale = useLocale();
  return (
    <div className={styles.footerMain}>
      <div className={"container " + styles.footerTop}>
        <Image
          quality={50}
          src="./navlogo.svg"
          alt="Jelena"
          width={200}
          height={200}
          className={styles.footerLogo}
        />
        <div className={styles.footerLinks}>
          <Link href="/#galerija" className={styles.footerLink}>
            {t("link1")}
          </Link>
          <Link href="/#o-jeleni" className={styles.footerLink}>
            {t("link2")}
          </Link>
          <Link href="/#izlozbe" className={styles.footerLink}>
            {t("link3")}
          </Link>
          <Link href="/#medijski-clanci" className={styles.footerLink}>
            {t("link4")}
          </Link>
          <Link href="/#kontakt" className={styles.footerLink}>
            {t("link5")}
          </Link>
          <Link
            href={`/${locale === "en" ? "sr" : "en"}`}
            className={styles.footerLink}
          >
            {locale === "en" ? "Crnogorski" : "English"}
          </Link>
        </div>
        <div className={styles.footerSocials}>
          <Link
            target="_blank"
            href="https://www.instagram.com/jelena_vusurovic"
            className={styles.footerSocial}
          >
            <SlSocialInstagram /> <span>jelena_vusurovic</span>
          </Link>

          <Link
            href="mailto:info@jelenavusurovic.me"
            className={styles.footerSocial}
          >
            <SlEnvolope /> <span>info@jelenavusurovic.me</span>
          </Link>
          <Link href="tel:+38267653544" className={styles.footerSocial}>
            <SlPhone />
            <span>+382 67 653 544</span>
          </Link>
        </div>
      </div>
      <div className={"container " + styles.footerBottom}>
        <span>
          {t("footerCopy")} © {new Date().getFullYear()}
        </span>
        <span>Made by Mato Martinović</span>
      </div>
    </div>
  );
};

export default Footer;
