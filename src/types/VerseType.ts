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
};

export type Comment = {
  userId: string;
  username: string;
  content: string;
  postedDate: number;
};
