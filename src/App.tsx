import { useEffect, useState } from "react";
import "./App.css";

interface Article {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [count, setCount] = useState<number>(1);
  const [article, setArticle] = useState<Article>({
    id: 1,
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = 20;

  function nextPage() {
    if (count < totalPages) {
      setCount(count + 1);
    } else {
      alert("You are on the last page.");
    }
  }

  function prevPage() {
    if (count > 1) {
      setCount(count - 1);
    } else {
      alert("You are on the first page.");
    }
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/posts/" + count)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the article.");
        }
        return res.json();
      })
      .then((data: Article) => setArticle(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [count]);

  return (
    <>
      <main>
        <header>
          <h1
            style={{
              fontSize: "3rem",
            }}
          >
            The Best Platform to Read Articles
          </h1>
          <p
            style={{
              fontSize: "1rem",
            }}
          >
            Currently on Page {count}
          </p>
        </header>

        <div style={{ marginBottom: "20px" }}>
          <button onClick={prevPage}>Prev Page</button>
          <button onClick={nextPage} style={{ marginLeft: "10px" }}>
            Next Page
          </button>
        </div>

        <article>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              <h3
                style={{
                  fontSize: "1.2rem",
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                }}
              >
                {article.body}
              </p>
            </>
          )}
        </article>
      </main>
    </>
  );
}

export default App;
