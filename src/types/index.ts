export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate?: string;
  following: number;
  followers: number;
  coverImage?: string;
}

export interface Team {
  id: string;
  name: string;
  abbr: string;
  logo: string;
  color: string;
}

export interface Match {
  id: string;
  homeTeam: Team & { score: number };
  awayTeam: Team & { score: number };
  time: string;
  league: string;
  isLive: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  media?: string[];
  stats: {
    replies: number;
    retweets: number;
    likes: number;
    views?: number;
  };
  timestamp: string;
  isRepost?: boolean;
  repostedBy?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Prediction {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsIn: string;
  creator: User;
  createdAt: string;
  category: string;
}

export interface TrendingTopic {
  id: string;
  category: string;
  topic: string;
  posts: string;
  isSports: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'follow' | 'mention' | 'prediction';
  user: User;
  content?: string;
  post?: Post;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface SportsTopic {
  id: string;
  name: string;
  hashtag: string;
  posts: string;
  trending: boolean;
  image?: string;
}
