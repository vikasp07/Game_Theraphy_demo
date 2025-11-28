// Simple demo configuration - DEMO MODE ALWAYS ON
// No toggle needed - demo mode is permanent

export const isDemoMode = () => {
  return true; // Always in demo mode - no authentication required
};

// User data from database (demo mode only)
export const DEMO_USERS = {
  player: {
    _id: "67b01d7596d45b9e9566d3cf",
    name: "vikasss",
    email: "vikasss@gmail.com",
    role: "player",
    guardian: "67b01cae96d45b9e9566d3c5",
    profilePic: "",
  },
  doctor: {
    _id: "67a5c7598becf8fd6cdc8339",
    name: "bigbulll",
    email: "bigbull@gmail.com",
    role: "doctor",
    profilePic: "",
  },
  guardian: {
    _id: "67b01cae96d45b9e9566d3c5",
    name: "vikass",
    email: "vikass@gmail.com",
    role: "guardian",
    guardian: null,
    profilePic: "",
  },
};

export const DEMO_GAMES = [
  {
    id: 1,
    title: "Memory Match",
    description: "Match the cards to boost memory!",
    image: "/memory-match-logo.jpeg",
  },
  {
    id: 2,
    title: "Math Quiz",
    description: "Sharpen your math skills.",
    image: "/math-quiz-logo.jpeg",
  },
  {
    id: 3,
    title: "Word Scramble",
    description: "Unscramble the words.",
    image: "/word-scramble-logo.jpeg",
  },
  { id: 4, title: "Family Tree", description: "Learn relations.", image: "/family-tree-logo.png" },
  { id: 5, title: "Astray", description: "Navigate the maze.", image: "/astray-logo.png" },
  { id: 6, title: "Traffic Run", description: "Reflex challenge.", image: "/traffic-run-logo.png" },
  { id: 7, title: "Story Game", description: "Interactive stories.", image: "/story-game-logo.png" },
  { id: 8, title: "Family Match", description: "Match the members.", image: "/family-match-logo.png" },
];

export const DEMO_PROGRESS = [
  { date: new Date().toISOString(), score: 60 },
  { date: new Date(Date.now() - 86400000).toISOString(), score: 55 },
  { date: new Date(Date.now() - 2 * 86400000).toISOString(), score: 50 },
];

export const DEMO_PLAYERS = [
  {
    player: { _id: "demo-player-1", name: "Demo Player", email: "player@gmail.com" },
    progress: DEMO_PROGRESS,
  },
  {
    player: { _id: "p1", name: "Demo Child 1", email: "child1@example.com" },
    progress: DEMO_PROGRESS,
  },
  {
    player: { _id: "p2", name: "Demo Child 2", email: "child2@example.com" },
    progress: DEMO_PROGRESS,
  },
];
