import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
const BookCreate = () => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  async function handleSubmit(e) {
    setSubmitting(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "appication/json",
          "content-type": "appication/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );
    if (res.ok) {
      setErrors([]);
      setBookTitle("");
      return router.push("/libros");
    }
    const data = await res.json();
    setErrors(data.errors);
    setSubmitting(false);
  }
  return (
    <>
      <h1>Book create</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          value={bookTitle}
          disabled={submitting}
        />
        <button disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>
      <Link href="/libros">Book List</Link>
    </>
  );
};
export default BookCreate;
