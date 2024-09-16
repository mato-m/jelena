"use client";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Exhibitions from "@/components/exhibitions/Exhibitions";
import Footer from "@/components/footer/Footer";
import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Press from "@/components/press/Press";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import { ToastContainer } from "react-toastify";

import "aos/dist/aos.css";
import { useTranslations } from "next-intl";
import ScrollToTop1 from "@/components/scrollToTop/ScrollToTop1";
import { ClipLoader } from "react-spinners";

const Index = ({
  exhibitions: initialExhibitions,
  press: initialPress,
  artworks: initialArtworks,
  categories: initialCategories,
}) => {
  const t = useTranslations("Homepage");

  const [exhibitions, setExhibitions] = useState(initialExhibitions);
  const [press, setPress] = useState(initialPress);
  const [artworks, setArtworks] = useState(initialArtworks);
  const [categories, setCategories] = useState(initialCategories);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
    if (localStorage.getItem("jelenaJWT")) {
      setLoggedIn(true);
    }
  }, []);

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ClipLoader color="#222222" loading={loading} size={72} />
    </div>
  ) : (
    <>
      <ToastContainer
        theme="colored"
        draggable={true}
        closeOnClick={true}
        toastStyle={{
          backgroundColor: "#e9e9e9",
          color: "#222222",
          boxShadow: "0 0 10px #222222",
          fontFamily: "Prata",
          cursor: "none",
        }}
        stacked={true}
        closeButton={false}
        progressStyle={{ backgroundColor: "#222222" }}
      />
      <Navbar loggedIn={loggedIn} t={t} />
      <Hero t={t} />
      <Gallery
        t={t}
        loggedIn={loggedIn}
        artworks={artworks}
        setArtworks={setArtworks}
        categories={categories}
        setCategories={setCategories}
      />
      <About t={t} />
      <Exhibitions
        loggedIn={loggedIn}
        t={t}
        exhibitions={exhibitions}
        setExhibitions={setExhibitions}
      />
      <Press loggedIn={loggedIn} t={t} press={press} setPress={setPress} />
      <Contact t={t} />
      <Footer t={t} />
      <ScrollToTop1 />
    </>
  );
};

export default Index;
