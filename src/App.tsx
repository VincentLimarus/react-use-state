import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);
  const [article, setArticle] = useState({ title: "", body: "" });

  function nextPage() {
    if (count < 10) {
      setCount(count + 1);
    }
  }

  function prevPage() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    fetch("https://dummyjson.com/posts/" + count)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [count]);

  return (
    <>
      <main>
        <header>
          <p>Currently in Page {count}</p>
        </header>
        <button onClick={prevPage}>Prev Page</button>
        <button onClick={nextPage} style={{ marginLeft: "10px" }}>
          Next Page
        </button>

        <article>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
        </article>
      </main>
    </>
  );
}

export default App;
