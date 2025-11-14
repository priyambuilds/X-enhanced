interface UserSearchResult {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  isBlueVerified: boolean;
  badges: Array<{
    badge_type: string;
    description: string;
    badge_url: string;
  }>;
  location: string;
  isFollowing: boolean;
  isFollowedBy: boolean;
}