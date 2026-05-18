export interface DrawerReaction {
  emoji: string;
  count: number;
  label: string;
}

export interface DrawerComment {
  author: string;
  avatarImg?: string;
  avatarColor: string;
  initials: string;
  text: string;
}

export interface CircleWatcher {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarImg?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  year: number;
  rating: string;
  genres: string[];
  duration: string;
  description: string;
  /** Optional subtitle (e.g. "PART TWO") shown below main title in hero */
  subtitle?: string;
  /** Optional title treatment image — replaces text title in hero when set */
  titleImg?: string;
  /** CSS gradient string for the backdrop (hero) */
  backdropCss: string;
  /** Real image path for the backdrop, overrides backdropCss when set */
  backdropImg?: string;
  /** CSS gradient string for the poster */
  posterCss: string;
  /** Real image path for the poster, overrides posterCss when set */
  posterImg?: string;
  /** Accent color for decorative elements */
  accentColor: string;
  /** Watch progress 0–100, only for Continue Watching */
  progress?: number;
  /** Rank 1–10, only for Top 10 rows */
  rank?: number;
  /** Social proof for Recommended section */
  circleWatchers?: CircleWatcher[];
  /** Social proof text (e.g. "3 la están viendo") */
  circleCount?: string;
  /** Organic user quote shown in hover comment bubble */
  comment?: string;
  /** Director name */
  director?: string;
  /** Main cast names */
  cast?: string[];
  /** Sponsorship label */
  sponsored?: boolean;
  /** Sponsor name (e.g. "Paramount+") */
  sponsorName?: string;
  /** Social tags shown in side drawer (e.g. "Distópico", "Plot twist") */
  tags?: string[];
  /** Emoji reactions shown in side drawer */
  reactions?: DrawerReaction[];
  /** Friend comments shown in side drawer */
  comments?: DrawerComment[];
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
