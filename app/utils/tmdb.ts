import axios from 'axios';
import { z } from 'zod';

//Define variables from .env
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

//Define schemas
const searchResultSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  release_date: z.string().nullable().optional(),
  first_air_date: z.string().nullable().optional(),
  media_type: z.enum(['movie', 'tv']),
  poster_path: z.string().nullable(),
});

export type SearchResult = z.infer<typeof searchResultSchema>;

const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  poster_path: z.string().nullable(),
  videos: z.object({
    results: z.array(
      z.object({ key: z.string(), site: z.string(), type: z.string() })
    ),
  }),
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
  }),
});

export type MovieDetails = z.infer<typeof movieDetailsSchema>;

const showDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  first_air_date: z.string(),
  last_air_date: z.string(),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  poster_path: z.string().nullable(),
  videos: z.object({
    results: z.array(
      z.object({ key: z.string(), site: z.string(), type: z.string() })
    ),
  }),
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
  }),
});

export type ShowDetails = z.infer<typeof showDetailsSchema>;

type ImageConfiguration = {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
};

let imageConfig: ImageConfiguration | null = null;

export async function searchTMDb(q: string): Promise<SearchResult[]> {
  try {
    const resp = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: q,
        language: 'en-US',
        page: 1,
        include_adult: false,
      },
    });

    const res = resp.data.results
      .filter(
        (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
      )
      .map((item: any) => {
        try {
          return searchResultSchema.parse({
            ...item,
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
          });
        } catch (error) {
          console.error('Failed to parse item:', item, error);
          return null;
        }
      })
      .filter(
        (item: SearchResult | null): item is SearchResult => item !== null
      );

    return res;
  } catch (error) {
    console.error('Error fetching search results from TMDb:', error);
    return [];
  }
}

export async function getRecommendations(
  id: number,
  mediaType: 'movie' | 'tv'
): Promise<SearchResult[]> {
  try {
    const resp = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/${id}/recommendations`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
        },
      }
    );

    const documentaryGenreId = 99;

    const res = resp.data.results
      .filter((item: any) => !item.genre_ids.includes(documentaryGenreId))
      .map((item: any) => {
        try {
          return searchResultSchema.parse({
            ...item,
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
            media_type: mediaType,
          });
        } catch (error) {
          console.error('Failed to parse recommendation item:', item, error);
          return null;
        }
      })
      .filter(
        (item: SearchResult | null): item is SearchResult => item !== null
      );

    return res;
  } catch (error) {
    console.error('Error fetching recommendations from TMDb:', error);
    return [];
  }
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  try {
    const resp = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'videos,credits',
      },
    });

    return movieDetailsSchema.parse(resp.data);
  } catch (error) {
    console.error('Error fetching movie details from TMDb:', error);
    throw new Error('Failed to fetch movie details');
  }
}

export async function getShowDetails(id: number): Promise<ShowDetails> {
  try {
    const resp = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'videos,credits',
      },
    });

    return showDetailsSchema.parse(resp.data);
  } catch (error) {
    console.error('Error fetching show details from TMDb:', error);
    throw new Error('Failed to fetch show details');
  }
}

async function getImageConfiguration(): Promise<ImageConfiguration | null> {
  if (imageConfig) return imageConfig;

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/configuration`, {
      params: { api_key: TMDB_API_KEY },
    });
    imageConfig = response.data.images;
    return imageConfig;
  } catch (error) {
    console.error('Error fetching image configuration:', error);
    throw new Error('Failed to fetch image configuration');
  }
}

export async function getActorImageUrl(
  profilePath: string | null
): Promise<string> {
  if (!profilePath) return '../../public/imgs/profile.svg';

  try {
    const config = await getImageConfiguration();
    return `${config!.secure_base_url}w185${profilePath}`;
  } catch (error) {
    console.error('Error getting actor image URL:', error);
    return '../../public/imgs/profile.svg';
  }
}
