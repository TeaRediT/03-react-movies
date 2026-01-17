import { fetchData } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { MovieList, Movie } from "../../types/movie";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onSearchBarSubmit = async (query: string): Promise<void> => {
    if (query === "") {
      toast("Please enter your search query.");
      return;
    }
    try {
      setMovies([]);
      setIsError(false);
      setIsLoader(true);
      const res: MovieList = await fetchData(query);
      if (res.total_results < 1) {
        toast("No movies found for your request.");
      }
      setMovies(res.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  const onMovieGridClick = (movie: Movie) => {
    setIsModal(true);
    setSelectedMovie(movie);
  };

  const onCloseMovieModal = () => {
    setIsModal(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={onSearchBarSubmit}></SearchBar>
      <Toaster />
      {isLoader && <Loader></Loader>}
      {isError && <ErrorMessage></ErrorMessage>}
      {movies.length > 0 && (
        <MovieGrid onSelect={onMovieGridClick} movies={movies}></MovieGrid>
      )}
      {isModal && (
        <MovieModal
          onClose={onCloseMovieModal}
          movie={selectedMovie}
        ></MovieModal>
      )}
    </>
  );
}
