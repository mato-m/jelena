"use client";
import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";
const Gallery = ({
  t,
  loggedIn,
  setCategories,
  setArtworks,
  categories,
  artworks,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState("showAll");
  const [numImagesToShow, setNumImagesToShow] = useState(4);
  const imagesIncrement = 4;

  const handleFilterClick = (filter) => {
    setNumImagesToShow(4);
    setActiveFilter(filter);
  };

  const handleLoadMoreClick = () => {
    setNumImagesToShow(
      (prevNumImagesToShow) => prevNumImagesToShow + imagesIncrement
    );
  };

  return (
    <div className={"container " + styles.galleryMain} id="galerija">
      <h2>{t("link1")}</h2>
      <div className={styles.gallerySwitchWrap}>
        <span
          onClick={() => handleFilterClick("showAll")}
          className={
            activeFilter === "showAll"
              ? styles.active + " " + styles.gallerySwitch
              : styles.gallerySwitch
          }
        >
          {" "}
          {t("all")}
        </span>
        {categories?.map((filter) => (
          <span
            key={filter}
            onClick={() => handleFilterClick(filter.id)}
            className={
              filter.id === activeFilter
                ? styles.active + " " + styles.gallerySwitch
                : styles.gallerySwitch
            }
          >
            {t("lang") === "sr" ? filter.name_sr : filter.name_en}
            {loggedIn && filter.id !== "showAll" && (
              <SlTrash
                onClick={async (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (
                    window.confirm(
                      "Da li ste sigurni da želite da obrišete ovu kategoriju?"
                    )
                  ) {
                    const request = await fetch(
                      `https://jelenavusurovic.me/api/categories/${filter.id}`,
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
                      setCategories((prevFilters) =>
                        prevFilters.filter(
                          (prevFilter) => prevFilter.id !== filter.id
                        )
                      );
                      if (activeFilter === filter.id) {
                        setActiveFilter("showAll");
                      }
                      setArtworks((prevArtworks) =>
                        prevArtworks.filter(
                          (prevArtwork) => prevArtwork.category_id !== filter.id
                        )
                      );

                      toast("Kategorija uspješno obrisana");
                    } else {
                      toast("Greška prilikom brisanja kategorije");
                    }
                  }
                }}
                color="#222222"
                style={{
                  verticalAlign: "text-top",
                  marginLeft: 8,
                }}
              />
            )}
          </span>
        ))}
      </div>
      <div className={styles.galleryWrapper}>
        {artworks
          ?.filter(
            (artwork) =>
              artwork.category_id === activeFilter || activeFilter === "showAll"
          )
          .slice(0, numImagesToShow)
          .map((artwork, index) => (
            <div
              style={{ position: "relative", cursor: "pointer" }}
              key={index}
              onClick={() => {
                setLightboxIndex(index);
              }}
            >
              {loggedIn && (
                <SlTrash
                  onClick={async (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (
                      window.confirm(
                        "Da li ste sigurni da želite da obrišete ovu sliku?"
                      )
                    ) {
                      const request = await fetch(
                        `https://jelenavusurovic.me/api/paintings/${artwork.id}`,
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
                        setArtworks((prevArtworks) =>
                          prevArtworks.filter(
                            (prevArtwork) => prevArtwork.id !== artwork.id
                          )
                        );

                        toast("Slika uspješno obrisana");
                      } else {
                        toast("Greška prilikom brisanja slike");
                      }
                    }
                  }}
                  color="#222222"
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    padding: 8,
                  }}
                  size={36}
                />
              )}
              <Image
                quality={50}
                data-aos="fade-up"
                data-aos-duration="800"
                width={300}
                height={300}
                src={
                  "https://jelenavusurovic.me/paintings/" + artwork.image_url
                }
                alt="Jelena Vušurović"
                key={index}
              />
            </div>
          ))}
      </div>
      {numImagesToShow <
        artworks?.filter(
          (artwork) =>
            artwork.category_id === activeFilter || activeFilter === "showAll"
        ).length && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMoreClick}>
          {t("moreBtn")}
        </button>
      )}
      <Lightbox
        zoom={{
          maxZoomPixelRatio: 4,
        }}
        plugins={[Zoom, Thumbnails]}
        index={lightboxIndex}
        slides={artworks
          ?.filter(
            (artwork) =>
              artwork.category_id === activeFilter || activeFilter === "showAll"
          )
          .slice(0, numImagesToShow)
          .map((artwork) => ({
            src: `/_next/image?url=https://jelenavusurovic.me/paintings/${artwork.image_url}&w=640&q=100`,
          }))}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
      />
    </div>
  );
};

export default Gallery;
