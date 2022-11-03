import Link from "next/link";
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  const data = await res.json();
  return {
    props: {
      books: data,
    },
  };
}
const BookList = ({ books }) => {
  async function handleDelete(e) {
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
  }
  return (
    <div>
      <h1>List libro</h1>
      <ul>
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <Link href={`/libros/${book.id}`}>{book.title}</Link>
            {" - "}
            <Link href={`/libros/${book.id}/editar`}>Editar</Link>
            <form onSubmit={handleDelete}>
              <button>Delete</button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/libros/crear">Create Book</Link>
    </div>
  );
};
export default BookList;
