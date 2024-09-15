"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { SlClose, SlMenu } from "react-icons/sl";
import { lock, unlock } from "tua-body-scroll-lock";
import { useLocale } from "next-intl";
const Navbar = ({ t, loggedIn }) => {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setScrolled(window.scrollY > 100);
  }, []);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const visible = prevScrollPos > currentScrollPos;

    setPrevScrollPos(currentScrollPos);
    setVisible(visible);
    setScrolled(currentScrollPos > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible, scrolled]);

  useEffect(() => {
    if (menuOpen) {
      lock();
    } else {
      unlock();
    }
  }, [menuOpen]);
  let navbarClasses = [styles.navMain];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  if (!visible && scrolled) {
    navbarClasses.push(styles.hidden);
  }

  return (
    <nav className={navbarClasses.join(" ")}>
      <div className="container">
        <Link
          href="#"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMenuOpen(false);
          }}
        >
          <Image
            className={styles.navLogo}
            src="./navlogo.svg"
            alt="Jelena"
            width={100}
            height={100}
          />
        </Link>
        {menuOpen ? (
          <SlClose
            size={22}
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        ) : (
          <SlMenu
            size={22}
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}
        <div
          onClick={() => setMenuOpen(false)}
          className={styles.navLinks + " " + (menuOpen ? styles.menuOpen : "")}
        >
          <Link href="/#galerija">{t("link1")}</Link>
          <Link href="/#o-jeleni">{t("link2")}</Link>
          <Link href="/#izlozbe">{t("link3")}</Link>
          <Link href="/#medijski-clanci">{t("link4")}</Link>
          <Link href="/#kontakt">{t("link5")}</Link>
          {loggedIn && <Link href="/admin">Admin</Link>}
          <Link href={`/${locale === "en" ? "sr" : "en"}`}>
            {locale === "en" ? "Crnogorski" : "English"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
