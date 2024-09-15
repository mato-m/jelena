import React, { useState } from "react";
import { toast } from "react-toastify";

const AddExhibition = () => {
  const [exhibitionNameEn, setExhibitionNameEn] = useState("");
  const [exhibitionNameSr, setExhibitionNameSr] = useState("");
  const [exhibitionDate, setExhibitionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [exhibitionLocationEn, setExhibitionLocationEn] = useState("");
  const [exhibitionLocationSr, setExhibitionLocationSr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !exhibitionNameEn ||
      !exhibitionNameSr ||
      !exhibitionLocationEn ||
      !exhibitionLocationSr ||
      !exhibitionDate
    ) {
      toast("Potrebno je popuniti sva polja");
      return;
    }
    const request = await fetch("https://jelenavusurovic.me/api/exhibitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jelenaJWT")}`,
      },
      body: JSON.stringify({
        title_sr: exhibitionNameSr,
        title_en: exhibitionNameEn,
        location_sr: exhibitionLocationSr,
        location_en: exhibitionLocationEn,
        exhibition_date: exhibitionDate,
      }),
    });
    if (request.ok) {
      toast("Izložba uspješno dodata");
      setExhibitionNameEn("");
      setExhibitionNameSr("");
      setExhibitionDate(new Date().toISOString().split("T")[0]);
      setExhibitionLocationEn("");
      setExhibitionLocationSr("");
    } else {
      toast("Greška prilikom dodavanja izložbe");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Naziv izložbe (Crnogorski)"
        value={exhibitionNameSr}
        onChange={(e) => setExhibitionNameSr(e.target.value)}
      />
      <input
        type="text"
        placeholder="Naziv izložbe (Engleski)"
        value={exhibitionNameEn}
        onChange={(e) => setExhibitionNameEn(e.target.value)}
      />
      <input
        type="date"
        value={exhibitionDate}
        onChange={(e) => setExhibitionDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lokacija izložbe (Crnogorski)"
        value={exhibitionLocationSr}
        onChange={(e) => setExhibitionLocationSr(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lokacija izložbe (Engleski)"
        value={exhibitionLocationEn}
        onChange={(e) => setExhibitionLocationEn(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AddExhibition;
