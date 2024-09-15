import React, { useState } from "react";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [categoryNameEn, setCategoryNameEn] = useState("");
  const [categoryNameSr, setCategoryNameSr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryNameEn || !categoryNameSr) {
      toast("Potrebno je popuniti sva polja");
      return;
    }
    const request = await fetch("http://localhost:3001/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jelenaJWT")}`,
      },
      body: JSON.stringify({
        name_en: categoryNameEn,
        name_sr: categoryNameSr,
      }),
    });
    if (request.ok) {
      toast("Kategorija uspješno dodata");
      setCategoryNameEn("");
      setCategoryNameSr("");
    } else {
      toast("Greška prilikom dodavanja kategorije");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryNameSr}
        placeholder="Naziv kategorije (Crnogorski)"
        onChange={(e) => setCategoryNameSr(e.target.value)}
      />
      <input
        type="text"
        value={categoryNameEn}
        placeholder="Naziv kategorije (Engleski)"
        onChange={(e) => setCategoryNameEn(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AddCategory;
