export type Paginated<T = unknown> = {
  page: number;
  total_results: number;
  total_pages: number;
  results: T[];
};
