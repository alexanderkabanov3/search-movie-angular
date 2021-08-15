export interface Results {
  results: Array<MediaItem>;
  total_results: number;
  total_pages: number;
}

export interface MediaItem {
  title?: string;
  name?: string;
  id: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  backdrop_path: string;
  videos: any;
}
