import type { User, Match, Post, Prediction, TrendingTopic, Notification, Conversation, SportsTopic } from '@/types';

export const currentUser: User = {
  id: 'user_1',
  name: 'SportX Fan',
  handle: '@sportx_fan',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportx',
  verified: false,
  bio: 'Sports enthusiast | Football fanatic | Prediction master',
  location: 'London, UK',
  website: 'sportx.app',
  joinedDate: 'January 2024',
  following: 160,
  followers: 9,
  coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
};

export const teams = {
  mancity: { id: 'team_1', name: 'Manchester City', abbr: 'MCI', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=mancity', color: '#6CABDD' },
  arsenal: { id: 'team_2', name: 'Arsenal', abbr: 'ARS', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=arsenal', color: '#EF0107' },
  liverpool: { id: 'team_3', name: 'Liverpool', abbr: 'LIV', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=liverpool', color: '#C8102E' },
  realmadrid: { id: 'team_4', name: 'Real Madrid', abbr: 'RMA', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=realmadrid', color: '#FEBE10' },
  barcelona: { id: 'team_5', name: 'Barcelona', abbr: 'BAR', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=barcelona', color: '#A50044' },
  bayern: { id: 'team_6', name: 'Bayern Munich', abbr: 'BAY', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=bayern', color: '#DC052D' },
  psg: { id: 'team_7', name: 'Paris SG', abbr: 'PSG', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=psg', color: '#004170' },
  chelsea: { id: 'team_8', name: 'Chelsea', abbr: 'CHE', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=chelsea', color: '#034694' },
};

export const liveMatches: Match[] = [
  {
    id: 'match_1',
    homeTeam: { ...teams.mancity, score: 2 },
    awayTeam: { ...teams.arsenal, score: 1 },
    time: "67'",
    league: 'Premier League',
    isLive: true,
  },
  {
    id: 'match_2',
    homeTeam: { ...teams.realmadrid, score: 3 },
    awayTeam: { ...teams.barcelona, score: 2 },
    time: "78'",
    league: 'La Liga',
    isLive: true,
  },
  {
    id: 'match_3',
    homeTeam: { ...teams.liverpool, score: 1 },
    awayTeam: { ...teams.chelsea, score: 1 },
    time: "45'",
    league: 'Premier League',
    isLive: true,
  },
  {
    id: 'match_4',
    homeTeam: { ...teams.bayern, score: 2 },
    awayTeam: { ...teams.psg, score: 0 },
    time: "52'",
    league: 'Champions League',
    isLive: true,
  },
];

export const users: User[] = [
  {
    id: 'user_2',
    name: 'ESPN',
    handle: '@espn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=espn',
    verified: true,
    following: 1500,
    followers: 45000000,
  },
  {
    id: 'user_3',
    name: 'Sky Sports Football',
    handle: '@SkyFootball',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skysports',
    verified: true,
    following: 890,
    followers: 8200000,
  },
  {
    id: 'user_4',
    name: 'Transfer News',
    handle: '@TransferNews',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=transfer',
    verified: true,
    following: 234,
    followers: 5200000,
  },
  {
    id: 'user_5',
    name: 'Gary Lineker',
    handle: '@GaryLineker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gary',
    verified: true,
    following: 1200,
    followers: 8900000,
  },
];

export const posts: Post[] = [
  {
    id: 'post_1',
    user: users[0],
    content: 'BREAKING: Manchester City are closing in on a deal for a new striker! Medical scheduled for tomorrow. Transfer fee around €80m. 🚨🔵 #MCFC #TransferNews',
    stats: { replies: 3200, retweets: 8500, likes: 42000, views: 2500000 },
    timestamp: '2h',
  },
  {
    id: 'post_2',
    user: users[1],
    content: 'What a goal! Absolute screamer from 30 yards out! 🚀⚽',
    media: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80'],
    stats: { replies: 890, retweets: 3400, likes: 18900, views: 980000 },
    timestamp: '4h',
  },
  {
    id: 'post_3',
    user: users[2],
    content: 'DONE DEAL: Major transfer confirmed! The player has signed a 5-year contract. More details to follow... ✍️',
    stats: { replies: 2100, retweets: 6700, likes: 31500, views: 1800000 },
    timestamp: '5h',
  },
  {
    id: 'post_4',
    user: users[3],
    content: 'That was some performance last night! The beautiful game at its finest. What did everyone think of the match? 🤔',
    stats: { replies: 4500, retweets: 1200, likes: 28000, views: 1200000 },
    timestamp: '8h',
  },
  {
    id: 'post_5',
    user: currentUser,
    content: 'My prediction for the weekend: City 3-1 Arsenal, Liverpool 2-0 Chelsea, Madrid 2-2 Barca. What are your predictions? 🎯',
    stats: { replies: 45, retweets: 12, likes: 89, views: 1200 },
    timestamp: '12h',
  },
];

export const predictions: Prediction[] = [
  {
    id: 'pred_1',
    question: 'Who will win the Premier League this season?',
    options: [
      { id: 'opt_1', text: 'Manchester City', votes: 12500, percentage: 45 },
      { id: 'opt_2', text: 'Arsenal', votes: 8900, percentage: 32 },
      { id: 'opt_3', text: 'Liverpool', votes: 5200, percentage: 19 },
      { id: 'opt_4', text: 'Other', votes: 1100, percentage: 4 },
    ],
    totalVotes: 27700,
    endsIn: '3 months',
    creator: users[0],
    createdAt: '2 days ago',
    category: 'Premier League',
  },
  {
    id: 'pred_2',
    question: 'Will Haaland score 30+ goals this season?',
    options: [
      { id: 'opt_5', text: 'Yes, easily!', votes: 8200, percentage: 68 },
      { id: 'opt_6', text: 'No, injury problems', votes: 3900, percentage: 32 },
    ],
    totalVotes: 12100,
    endsIn: '2 months',
    creator: users[1],
    createdAt: '1 day ago',
    category: 'Player Stats',
  },
  {
    id: 'pred_3',
    question: 'Next Champions League winner?',
    options: [
      { id: 'opt_7', text: 'Real Madrid', votes: 5600, percentage: 35 },
      { id: 'opt_8', text: 'Man City', votes: 4800, percentage: 30 },
      { id: 'opt_9', text: 'Bayern Munich', votes: 3200, percentage: 20 },
      { id: 'opt_10', text: 'Other', votes: 2400, percentage: 15 },
    ],
    totalVotes: 16000,
    endsIn: '4 months',
    creator: users[2],
    createdAt: '3 days ago',
    category: 'Champions League',
  },
];

export const trendingTopics: TrendingTopic[] = [
  { id: 'trend_1', category: 'Sports · Trending', topic: 'TransferDeadlineDay', posts: '2.4M posts', isSports: true },
  { id: 'trend_2', category: 'Football · Trending', topic: 'PremierLeague', posts: '890K posts', isSports: true },
  { id: 'trend_3', category: 'Trending in UK', topic: 'ChampionsLeague', posts: '456K posts', isSports: true },
  { id: 'trend_4', category: 'Sports · Trending', topic: 'NBAPlayoffs', posts: '234K posts', isSports: true },
  { id: 'trend_5', category: 'Football · Trending', topic: 'Messi', posts: '189K posts', isSports: true },
];

export const sportsTopics: SportsTopic[] = [
  { id: 'sport_1', name: 'Premier League', hashtag: '#PremierLeague', posts: '2.1M posts', trending: true },
  { id: 'sport_2', name: 'Champions League', hashtag: '#UCL', posts: '1.8M posts', trending: true },
  { id: 'sport_3', name: 'Transfer News', hashtag: '#TransferNews', posts: '980K posts', trending: true },
  { id: 'sport_4', name: 'La Liga', hashtag: '#LaLiga', posts: '756K posts', trending: false },
  { id: 'sport_5', name: 'Serie A', hashtag: '#SerieA', posts: '432K posts', trending: false },
  { id: 'sport_6', name: 'Bundesliga', hashtag: '#Bundesliga', posts: '389K posts', trending: false },
];

export const notifications: Notification[] = [
  { id: 'notif_1', type: 'like', user: users[0], content: 'liked your post', timestamp: '2m', read: false },
  { id: 'notif_2', type: 'retweet', user: users[1], content: 'retweeted your post', timestamp: '15m', read: false },
  { id: 'notif_3', type: 'follow', user: users[2], content: 'followed you', timestamp: '1h', read: true },
  { id: 'notif_4', type: 'mention', user: users[3], content: 'mentioned you in a post', post: posts[0], timestamp: '3h', read: true },
  { id: 'notif_5', type: 'prediction', user: users[0], content: 'Your prediction was correct!', timestamp: '5h', read: true },
];

export const conversations: Conversation[] = [
  { id: 'conv_1', user: users[0], lastMessage: 'Thanks for the update!', timestamp: '2m', unread: 2 },
  { id: 'conv_2', user: users[1], lastMessage: 'Did you see the match?', timestamp: '1h', unread: 0 },
  { id: 'conv_3', user: users[2], lastMessage: 'Great prediction!', timestamp: '3h', unread: 1 },
];
