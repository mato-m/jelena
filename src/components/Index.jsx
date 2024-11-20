import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Exhibitions from "@/components/exhibitions/Exhibitions";
import Footer from "@/components/footer/Footer";
import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Press from "@/components/press/Press";
import React from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop1 from "@/components/scrollToTop/ScrollToTop1";

const Index = ({ exhibitions, press, artworks, categories }) => {
  const loggedIn = true;
  return (
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
      <Navbar />
      <Hero />
      <Gallery artworks={artworks} categories={categories} />
      <About />
      <Exhibitions exhibitions={exhibitions} />
      <Press press={press} />
      <Contact />
      <Footer />
      <ScrollToTop1 />
    </>
  );
};

export default Index;
