import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBookModal from "./EditBookModal";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const fetchBooks = async () => {
    const res = await axios.get(`${API_URL}/book`);
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    if (window.confirm("🗑️ Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/book/${id}`);
        toast.success("✅ Book deleted successfully!");
        fetchBooks();
      } catch (error) {
        toast.error("❌ Failed to delete book.");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.outher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-secondary">📚 Book List</h3>
        <input
          className="form-control w-50"
          placeholder="🔍 Search by title, author, or language..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="row">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div className="col-md-6 col-lg-4" key={book._id}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{book.title}</h5>
                  <p className="mb-1">
                    <strong>Author:</strong> {book.outher}
                  </p>
                  <p className="mb-1">
                    <strong>Year:</strong> {book.year}
                  </p>
                  <p className="mb-1">
                    <strong>Type:</strong> {book.type}
                  </p>
                  <p className="mb-1">
                    <strong>Language:</strong> {book.language}
                  </p>
                  <p className="mb-3">
                    <strong>Pages:</strong> {book.pages}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedBook(book)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No books found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                « Prev
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next »
              </button>
            </li>
          </ul>
        </nav>
      )}

      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          onUpdate={fetchBooks}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default BookList;
