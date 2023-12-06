export type User = {
  docId: string;
  username: string;
  dob: string;
  bio: string;
  profilePicUrl: string;
  name: string;
  email: string;
  followers: number;
  following: number;
  trendy: boolean;
  verses: any[];
  trendyVerses: number;
  tips: number;
  totalLike: number;
  totalDislikes: number;
  warnings: number;
  userType: string
};
