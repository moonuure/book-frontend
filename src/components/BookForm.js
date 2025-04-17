import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const BookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: "",
    outher: "",
    Eddition: "",
    year: "",
    type: "",
    language: "",
    pages: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.year || isNaN(book.year) || book.year < 0) {
      toast.warning("❗ Title and valid year are required!");
      return;
    }

    try {
      await axios.post(`${API_URL}/book`, book);
      toast.success("✅ Book added successfully!");
      setBook({
        title: "",
        outher: "",
        Eddition: "",
        year: "",
        type: "",
        language: "",
        pages: "",
      });
      onBookAdded();
    } catch (error) {
      toast.error("❌ Failed to add book.");
    }
  };

  return (
    <>
      <h4 className="mb-4 text-primary">➕ Add New Book</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        {[
          { name: "title", type: "text" },
          { name: "outher", type: "text" },
          { name: "Eddition", type: "text" },
          { name: "year", type: "number" },
          { name: "type", type: "text" },
          { name: "language", type: "text" },
          { name: "pages", type: "number" },
        ].map(({ name, type }, idx) => (
          <div className="col-md-4" key={idx}>
            <input
              className="form-control"
              type={type}
              name={name}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              value={book[name]}
              onChange={handleChange}
              required={name === "title"}
            />
          </div>
        ))}
        <div className="col-12 text-end">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!book.title || !book.year}
          >
            Add Book
          </button>
        </div>
      </form>
    </>
  );
};

export default BookForm;
