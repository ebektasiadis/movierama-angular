export type Review = {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
};

export type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number;
};
