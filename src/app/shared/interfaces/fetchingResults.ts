export interface Results {
  results: Array<MediaItem>;
  total_results: number;
  total_pages: number;
}

export interface MediaItem {
  title: string | null;
  name: string | null;
  id: number;
  poster_path: string;
  release_date: string | null;
  first_air_date: string | null;
  vote_average: number;
  backdrop_path: string;
  videos: any;
}

export interface Cast {
  cast: Array<MediaItem>;
}

export interface PersonItem {
  name: string;
  id: number;
  profile_path: string;
  known_for: Array<{title: string; original_title: string}>;
}
