"use client";
import React, { useState, useEffect } from "react";
import { PiArrowUp } from "react-icons/pi";
import styles from "./ScrollToTop1.module.css";

const ScrollToTop1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 150;

  const toggleVisibility = () => {
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`${styles.scrollToTopBtn} ${
        isVisible ? styles.visible : styles.invisible
      }`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <PiArrowUp />
    </button>
  );
};

export default ScrollToTop1;
