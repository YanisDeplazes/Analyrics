export interface SpotifyTopTracks {
  items: SpotifyTrack[]
  total: number
  limit: number
  offset: number
  href: string
  next: string
  previous: any
}

export interface SpotifyTrack {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: SpotifyExternalIds
  external_urls: SpotifyExternalUrls
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string,
}

export interface SpotifyAlbum {
  album_type: string
  artists: SpotifyArtist[]
  available_markets: string[]
  external_urls: SpotifyExternalUrls
  href: string
  id: string
  images: SpotifyImage[]
  is_playable: boolean
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface SpotifyExternalUrls {
  spotify: string
}

export interface SpotifyImage {
  height: number
  url: string
  width: number
}

export interface SpotifyExternalIds {
  isrc: string
}

export interface SpotifyProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: SpotifyExternalUrls;
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  product: string;
  type: string;
  uri: string;
}

export interface PlaybackState {
  data: {
    position: number; // Current playback position in milliseconds
    duration: number; // Total track duration in milliseconds
  };
}

