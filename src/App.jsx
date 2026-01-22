import { useEffect, useState } from "react";
import Card from "./components/Card";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieDisplayed, setMovieDisplayed] = useState([]);

  async function loadMovies() {
    try {
      const response = await fetch("http://localhost:3000/movies");

      if (!response.ok) {
        setErrorText("Failed to fetch data from server");
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.json();

      setTimeout(() => {
        setMovieData(data);
        setMovieDisplayed(data);
      }, (Math.random() * 2500) + 1000);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function filterResult(event) {
    const searchText = event.currentTarget.value;
    setMovieDisplayed(
      searchText === "" ?
      movieData :
      Array.from(movieData).filter(data => data.title.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  return (
    <main>
      <section id="hero">
        <img src="/public/assets/15.jpg" />
        <h1>
          Find <span className="gradient-text">Movies</span> You'll Enjoy
          Without the Hassle
        </h1>
      </section>

      <input id="search-bar"
        placeholder="🔍Search thousands of movies"
        onChange={filterResult}
      />

      <section id="all-movies">
        <h2>All Movies</h2>

        <div id="cards-container">
          { movieData.length === 0 ? <LoadingSpinner/> :
            movieDisplayed.length === 0 ? <p>No movie Found</p> :
            movieDisplayed.map((data, index) => {
              return (
                <Card
                  key={index}
                  title={data.title}
                  imageUrl={data.coverImage}
                  rating={data.rating}
                  lang={data.lang}
                  year={data.year}
                />
              );
            })
          }
        </div>
      </section>
    </main>
  );
}
