/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: communityhighlights
 * Interface for CommunityHighlights
 */
export interface CommunityHighlights {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  mediaType?: string;
  /** @wixFieldType url */
  mediaUrl?: string;
  /** @wixFieldType url */
  thumbnailUrl?: string;
  /** @wixFieldType text */
  uploaderName?: string;
  /** @wixFieldType datetime */
  datePosted?: Date | string;
}


/**
 * Collection ID: communitymembers
 * Interface for CommunityMembers
 */
export interface CommunityMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  memberName?: string;
  /** @wixFieldType url */
  instagramUrl?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  avatar?: string;
  /** @wixFieldType url */
  twitterUrl?: string;
  /** @wixFieldType url */
  twitchUrl?: string;
  /** @wixFieldType url */
  youtubeUrl?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: herovideo
 * Interface for HeroVideo
 */
export interface HeroVideo {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  videoTitle?: string;
  /** @wixFieldType url */
  videoUrl?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType boolean */
  autoplay?: boolean;
  /** @wixFieldType boolean */
  isMuted?: boolean;
  /** @wixFieldType date */
  publishDate?: Date | string;
}


/**
 * Collection ID: leaderboard
 * Interface for Leaderboard
 */
export interface Leaderboard {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  playerName?: string;
  /** @wixFieldType number */
  rank?: number;
  /** @wixFieldType number */
  score?: number;
  /** @wixFieldType text */
  gameTitle?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  badgeImage?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  countryFlagImage?: string;
}


/**
 * Collection ID: news
 * Interface for NewsArticles
 */
export interface NewsArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType datetime */
  publishDate?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featuredImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  excerpt?: string;
}


/**
 * Collection ID: tournaments
 * Interface for Tournaments
 */
export interface Tournaments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType text */
  tournamentName?: string;
  /** @wixFieldType text */
  gameTitle?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  prizePool?: number;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType url */
  rulesUrl?: string;
  /** @wixFieldType url */
  bracketUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  gameImage?: string;
}
