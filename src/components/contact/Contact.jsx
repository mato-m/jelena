"use client";
import React, { useState } from "react";
import styles from "./Contact.module.css";
import Link from "next/link";
import { SlSocialInstagram, SlEnvolope, SlPhone } from "react-icons/sl";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
const Contact = () => {
  const t = useTranslations("Homepage");
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    poruka: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.ime) {
        return toast("Niste unijeli ime");
      }
      if (!formData.email) {
        return toast("Niste unijeli email");
      }
      if (!formData.poruka) {
        return toast("Niste unijeli poruku");
      }
      const response = await fetch("https://jelenavusurovic.me/api/auth/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast("Poruka poslata");
      } else {
        toast(data.data);
      }
    } catch (error) {
      toast("Greška pri slanju poruke");
    }
  };
  return (
    <div className="container" id="kontakt">
      <h2>{t("link5")}</h2>
      <div className={styles.contactInfo}>
        <p className={styles.contactText}>{t("contactText")}</p>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <input
            type="text"
            name="ime"
            placeholder={t("contactName")}
            value={formData.ime}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="poruka"
            placeholder={t("contactMsg")}
            value={formData.poruka}
            onChange={handleChange}
          />
          <input type="submit" value={t("contactBtn")} />
        </form>
        <div className={styles.contactSocials}>
          <Link
            target="_blank"
            href="https://www.instagram.com/jelena_vusurovic"
            className={styles.contactSocial}
          >
            <SlSocialInstagram /> <span>jelena_vusurovic</span>
          </Link>

          <Link
            href="mailto:info@jelenavusurovic.me"
            className={styles.contactSocial}
          >
            <SlEnvolope /> <span>info@jelenavusurovic.me</span>
          </Link>
          <Link href="tel:+38267653544" className={styles.contactSocial}>
            <SlPhone />
            <span>+382 67 653 544</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
