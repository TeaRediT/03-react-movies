import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieList {
  results: Movie[];
  total_results: number;
}

export const fetchData = async (query: string): Promise<Movie[]> => {
  const { data } = await axios<MovieList>(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  return data.results;
};
