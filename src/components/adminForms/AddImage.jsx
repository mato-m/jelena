import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const AddImage = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const fileInput = useRef();

  const fetchCategories = async () => {
    const response = await fetch("https://jelenavusurovic.me/api/categories");
    const data = await response.json();
    setCategories(data.data);
    if (response.ok && data.length > 0) {
      setCategoryID(data[0].id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !categoryID) {
      toast("Potrebno je popuniti sva polja");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("category_id", categoryID);
    const request = await fetch("https://jelenavusurovic.me/api/paintings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jelenaJWT")}`,
      },
      body: formData,
    });
    if (request.ok) {
      toast("Slika uspješno dodata");
      setImage(null);
      fileInput.current.value = "";
    } else {
      toast("Greška prilikom dodavanja slike");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories?.length > 0 ? (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setCategoryID(e.target.value)}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name_sr}
          </option>
        ))}
      </select>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        ref={fileInput}
      />{" "}
      {/* Add ref here */}
      <button type="submit">Dodaj</button>
    </form>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <p>Nema kategorija</p>
    </div>
  );
};

export default AddImage;
