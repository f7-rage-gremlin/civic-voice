export interface LawSubmission {
  id: string;
  title: string;
  description: string;
  author: string;
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
  comments: Comment[];
  createdAt: string;
  bulletPoints?: string[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
  replies: Comment[];
  createdAt: string;
}

export interface VotableLaw {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  vote: "yes" | "no" | null;
  comments: Comment[];
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  isPublic: boolean;
  isFollowing: boolean;
  isActive: boolean;
  weight: number;
  posts: LawSubmission[];
  commentHistory: Comment[];
  votingHistory: { lawTitle: string; vote: "yes" | "no" }[];
}

export interface Settings {
  privacy: "public" | "private";
  votingMode: "manual" | "automatic";
  algorithm: "simple" | "weighted";
}
