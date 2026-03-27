const KEY = 'arena_bookmarks';
export interface BookmarkedPost {
  id: string; userId: string; userName: string; userHandle: string;
  userAvatar: string; content: string; timestamp: string;
  likes: number; replies: number; retweets: number; savedAt: string;
}
export function getBookmarks(): BookmarkedPost[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
export function addBookmark(post: BookmarkedPost): void {
  const existing = getBookmarks();
  if (!existing.find(b => b.id === post.id)) {
    localStorage.setItem(KEY, JSON.stringify([post, ...existing]));
  }
}
export function removeBookmark(postId: string): void {
  localStorage.setItem(KEY, JSON.stringify(getBookmarks().filter(b => b.id !== postId)));
}
export function isBookmarked(postId: string): boolean {
  return getBookmarks().some(b => b.id === postId);
}
