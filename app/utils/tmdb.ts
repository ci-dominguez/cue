import axios from "axios";
import { z } from "zod";

//Define variables from .env
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

//Define schema for search results
const searchResultSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string().nullable(),
  media_type: z.enum(["movie", "tv"]),
  poster_path: z.string().nullable(),
});

export type SearchResult = z.infer<typeof searchResultSchema>;

export async function searchTMDb(q: string): Promise<SearchResult[]> {
  try {
    const resp = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: q,
        language: "en-US",
        page: 1,
        include_adult: false,
      },
    });

    const res = resp.data.results
      .map((item: any) => {
        try {
          return searchResultSchema.parse({
            ...item,
            title: item.title || item.name,
          });
        } catch (error) {
          console.error("Failed to parse item:", item, error);
          return null;
        }
      })
      .filter(
        (item: SearchResult | null): item is SearchResult => item !== null
      );

    return res;
  } catch (error) {
    console.error("Error fetching search results from TMDb:", error);
    throw new Error("Failed to fetch search results from TMDb");
  }
}

export async function getRecommendations(
  id: number,
  mediaType: "movie" | "tv"
): Promise<SearchResult[]> {
  try {
    const resp = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/${id}/recommendations`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          page: 1,
        },
      }
    );

    const res = resp.data.results
      .map((item: any) => {
        try {
          return searchResultSchema.parse({
            ...item,
            title: item.title || item.name,
            media_type: mediaType,
          });
        } catch (error) {
          console.error("Failed to parse recommendation item:", item, error);
          return null;
        }
      })
      .filter(
        (item: SearchResult | null): item is SearchResult => item !== null
      );

    return res;
  } catch (error) {
    console.error("Error fetching recommendations from TMDb:", error);
    throw new Error("Failed to fetch recommendations from TMDb");
  }
}
