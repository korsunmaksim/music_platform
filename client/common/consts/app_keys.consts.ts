export const ROUTES = {
  HOME: "/",
  TRACKS: "/tracks",
  CREATE: "/tracks/create",
};

export const NAVBAR_SECTIONS = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Songs", href: ROUTES.TRACKS },
];

export const STEPPER_STEPS = [
  "Track information",
  "Download cover",
  "Download track",
];

export const BACKEND_KEYS = {
  MAIN_URL: "http://localhost:5000/",
  TRACKS_URL: "http://localhost:5000/tracks/",
  COMMENTS_URL: "http://localhost:5000/tracks/comment/",
  LISTEN_URL: "http://localhost:5000/tracks/listen/",
  SEARCH_URL: "http://localhost:5000/tracks/search?query=",
};
