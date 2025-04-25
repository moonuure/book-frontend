import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Use your .env API variable
const API_URL = process.env.REACT_APP_API_URL;

const EditBookModal = ({ book, onUpdate, onClose }) => {
  const [updatedBook, setUpdatedBook] = useState(book || {});

  useEffect(() => {
    setUpdatedBook(book || {});
  }, [book]);

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/book/${updatedBook._id}`, updatedBook);
      toast.success("✅ Book updated successfully!");
      onUpdate();
      onClose();
    } catch (err) {
      toast.error("❌ Update failed!");
    }
  };

  if (!book) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "#00000066" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">✏️ Edit Book</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body row g-3">
              {[
                "title",
                "outher",
                "Eddition",
                "year",
                "type",
                "language",
                "pages",
              ].map((field, index) => (
                <div className="col-md-6" key={index}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    className="form-control"
                    type={
                      field === "year" || field === "pages" ? "number" : "text"
                    }
                    name={field}
                    value={updatedBook[field] || ""}
                    onChange={handleChange}
                    required={field === "title"}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                💾 Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
