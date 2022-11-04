import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {error} from "next/dist/build/output/log";
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );
  let data=[];
  try {

    data = await res.json();
  }catch (e) {
    console.log(e)
  }
  return {
    props: {
      book: data,
    },
  };
}
const BookEdit = ({ book }) => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState(book.title);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  async function handleSubmit(e) {
    setSubmitting(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,
      {
        method: "POST",
        headers: {
          accept: "appication/json",
          "content-type": "appication/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
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
      <h1>Book Edit</h1>
      <form onSubmit={handleSubmit}>
        <input
            data-cy="input-book-title"
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          value={String(bookTitle)}
          disabled={submitting}
        />
        <button disabled={submitting} data-cy="button-submit-book">
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
export default BookEdit;
