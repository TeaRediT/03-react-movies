import { fetchData } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined,
  );

  const onSearchBarSubmit = async (query: string): Promise<void> => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoader(true);
      const res: Movie[] = await fetchData(query);
      if (res.length < 1) {
        toast("No movies found for your request.");
      }
      setMovies(res);
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
    setSelectedMovie(undefined);
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
