"use client";
import React, { useState } from "react";
import styles from "./Press.module.css";
import Link from "next/link";
import { SlLink, SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";
const Press = ({ t, loggedIn, press, setPress }) => {
  const [numArticlesToShow, setNumArticlesToShow] = useState(4);
  const handleLoadMoreClick = () => {
    setNumArticlesToShow((prevNumArticlesToShow) => prevNumArticlesToShow + 4);
  };

  return (
    <div className="container" id="medijski-clanci">
      <h2>{t("link4")}</h2>
      <div className={styles.pressWrapper}>
        {press?.slice(0, numArticlesToShow).map((artikal, index) => (
          <Link
            href={artikal.link}
            key={index}
            className={styles.pressLink}
            target="_blank"
          >
            <span data-aos="fade-up" data-aos-duration="800">
              <SlLink color="#222222" style={{ marginRight: 8 }} />
              {new Date(artikal.published_date).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}

              {loggedIn && (
                <SlTrash
                  color="#222222"
                  style={{ marginLeft: 8 }}
                  onClick={async (event) => {
                    event.preventDefault();
                    if (
                      window.confirm(
                        "Da li ste sigurni da želite da obrišete ovaj medijski članak?"
                      )
                    ) {
                      const request = await fetch(
                        `http://localhost:3001/api/press/${artikal.id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jelenaJWT"
                            )}`,
                          },
                        }
                      );
                      if (request.ok) {
                        setPress((prevArtikli) =>
                          prevArtikli.filter(
                            (prevArtikal) => prevArtikal.id !== artikal.id
                          )
                        );

                        toast("Članak uspješno obrisan");
                      } else {
                        toast("Greška prilikom brisanja članka");
                      }
                    }
                  }}
                />
              )}
            </span>
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              className={styles.pressCardRight}
            >
              <span className={styles.pressNaslov}>
                {t("lang") === "sr" ? artikal.title_sr : artikal.title_en}
              </span>
              <span className={styles.pressIzvor}>
                {artikal.article_source}
              </span>
            </div>
          </Link>
        ))}
        {numArticlesToShow < press?.length && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMoreClick}>
            {t("moreBtn")}
          </button>
        )}
      </div>
    </div>
  );
};
export default Press;
