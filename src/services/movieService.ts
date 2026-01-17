import axios from "axios";
import type { MovieList } from "../types/movie";

export const fetchData = async (query: string): Promise<MovieList> => {
  const { data } = await axios<MovieList>(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  return data;
};
