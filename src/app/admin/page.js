"use client";
import AddCategory from "@/components/adminForms/AddCategory";
import AddExhibition from "@/components/adminForms/AddExhibition";
import AddImage from "@/components/adminForms/AddImage";
import AddPress from "@/components/adminForms/AddPress";
import Login from "@/components/login/Login";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("slika");

  useEffect(() => {
    const token = localStorage.getItem("jelenaJWT");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      if (payload.exp < currentTime) {
        localStorage.removeItem("jelenaJWT");
      } else {
        setLoggedIn(true);
      }
    }
  }, []);

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
      {loggedIn ? (
        <div className="container adminMain">
          <div className="adminTabWrapper">
            <span
              className={activeTab == "slika" && "active"}
              onClick={() => setActiveTab("slika")}
            >
              Dodaj sliku
            </span>
            <span
              className={activeTab == "izlozba" && "active"}
              onClick={() => setActiveTab("izlozba")}
            >
              Dodaj izložbu
            </span>
            <span
              className={activeTab == "clanak" && "active"}
              onClick={() => setActiveTab("clanak")}
            >
              Dodaj medijski članak
            </span>
            <span
              className={activeTab == "kategorija" && "active"}
              onClick={() => setActiveTab("kategorija")}
            >
              Dodaj kategoriju
            </span>
            <Link href="/">Početna stranica</Link>{" "}
            <span
              className="logout"
              onClick={() => {
                localStorage.removeItem("jelenaJWT");
                setLoggedIn(false);
              }}
            >
              Logout
            </span>
          </div>
          {activeTab === "slika" && <AddImage />}
          {activeTab === "izlozba" && <AddExhibition />}
          {activeTab === "clanak" && <AddPress />}
          {activeTab === "kategorija" && <AddCategory />}
        </div>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </>
  );
};

export default Admin;
