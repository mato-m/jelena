"use client";
import React, { useEffect, useState } from "react";
import styles from "./Exhibitions.module.css";
import { SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const Exhibitions = ({ exhibitions }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jelenaJWT")) {
      setLoggedIn(true);
    }
  }, []);

  const t = useTranslations("Homepage");
  const [numExhibitionsToShow, setNumExhibitionsToShow] = useState(4);
  const router = useRouter();

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
            <span>
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
                        `https://jelenavusurovic.me/api/exhibitions/${izlozba.id}`,
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
                        exhibitions.splice(index, 1);
                        router.refresh();
                        toast("Izložba uspješno obrisana");
                      } else {
                        toast("Greška prilikom brisanja izložbe");
                      }
                    }
                  }}
                />
              )}
            </span>
            <div className={styles.izlozbaRight}>
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
