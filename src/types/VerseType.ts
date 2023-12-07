export type Verse = {
  content: string;
  attachments: string;
  likes: number;
  dislikes: number;
  trendy: boolean;
  keywords: string[];
  reads: number;
  username: string;
  userId: string;
  postedDate: number;
  comments: Comment[];
  id?: string;
  usersLiked: string[];
  usersDisliked: string[];
  verseType?: string;
};

export type Comment = {
  username: string;
  content: string;
  postedDate: number;
};
