"use client";
import React, { useState } from "react";
import styles from "./Exhibitions.module.css";
import { SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";
const Exhibitions = ({ t, loggedIn, exhibitions, setExhibitions }) => {
  const [numExhibitionsToShow, setNumExhibitionsToShow] = useState(4);

  const handleLoadMoreClick = () => {
    setNumExhibitionsToShow(
      (prevNumExhibitionsToShow) => prevNumExhibitionsToShow + 4
    );
  };
  return (
    <div className="container" id="izlozbe">
      <h2>{t("link3")}</h2>
      <div className={styles.izlozbeWrapper}>
        {exhibitions?.slice(0, numExhibitionsToShow).map((izlozba, index) => (
          <div key={index} className={styles.izlozbaWrapper}>
            <span data-aos="fade-up" data-aos-duration="800">
              {new Date(izlozba.exhibition_date).toLocaleDateString("sr-RS", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              {loggedIn && (
                <SlTrash
                  color="#222222"
                  style={{ marginLeft: 8 }}
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Da li ste sigurni da želite da obrišete ovu izložbu?"
                      )
                    ) {
                      const request = await fetch(
                        `http://localhost:3001/api/exhibitions/${izlozba.id}`,
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
                        setExhibitions((prevIzlozbe) =>
                          prevIzlozbe?.filter(
                            (prevIzlozba) => prevIzlozba.id !== izlozba.id
                          )
                        );
                        toast("Izložba uspješno obrisana");
                      } else {
                        toast("Greška prilikom brisanja izložbe");
                      }
                    }
                  }}
                />
              )}
            </span>
            <div
              className={styles.izlozbaRight}
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <span className={styles.izlozbaNaslov}>
                {t("lang") === "sr" ? izlozba.title_sr : izlozba.title_en}
              </span>
              <span className={styles.izlozbaLokacija}>
                {t("lang") === "sr" ? izlozba.location_sr : izlozba.location_en}
              </span>
            </div>
          </div>
        ))}
        {numExhibitionsToShow < exhibitions?.length && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMoreClick}>
            {t("moreBtn")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Exhibitions;
