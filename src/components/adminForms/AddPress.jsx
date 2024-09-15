import React, { useState } from "react";
import { toast } from "react-toastify";

const AddPress = () => {
  const [articleNameEn, setArticleNameEn] = useState("");
  const [articleNameSr, setArticleNameSr] = useState("");
  const [articleDate, setArticleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [articleLink, setArticleLink] = useState("");
  const [articlePublisher, setArticlePublisher] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleNameEn || !articleNameSr || !articleLink || !articlePublisher) {
      toast("Potrebno je popuniti sva polja");
      return;
    }
    if (
      !articleLink.startsWith("http://") &&
      !articleLink.startsWith("https://")
    ) {
      toast("Link nije u validnom formatu");
      return;
    }
    const request = await fetch("https://jelenavusurovic.me/api/press", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jelenaJWT")}`,
      },
      body: JSON.stringify({
        title_sr: articleNameSr,
        title_en: articleNameEn,
        published_date: articleDate,
        link: articleLink,
        source: articlePublisher,
      }),
    });
    if (request.ok) {
      toast("Članak uspješno dodat");
      setArticleNameEn("");
      setArticleNameSr("");
      setArticleDate(new Date().toISOString().split("T")[0]);
      setArticleLink("");
      setArticlePublisher("");
    } else {
      toast("Greška prilikom dodavanja članka");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Naziv članka (Crnogorski)"
        value={articleNameSr}
        onChange={(e) => setArticleNameSr(e.target.value)}
      />
      <input
        type="text"
        placeholder="Naziv članka (Engleski)"
        value={articleNameEn}
        onChange={(e) => setArticleNameEn(e.target.value)}
      />
      <input
        type="date"
        value={articleDate}
        onChange={(e) => setArticleDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Link"
        value={articleLink}
        onChange={(e) => setArticleLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Izvor"
        value={articlePublisher}
        onChange={(e) => setArticlePublisher(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AddPress;
