import React, { useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="container my-5">
      <h1 className="text-primary fw-bold mb-4">📘 Book Manager</h1>
      <BookForm onBookAdded={handleRefresh} />
      <hr />
      <BookList key={refresh} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
