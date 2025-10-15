// Simple demo configuration and mock data used to bypass login/signup
// Toggle via env var REACT_APP_DEMO_MODE or localStorage flag

export const isDemoMode = () => {
  const flag = localStorage.getItem("demoMode");
  if (flag === "true") return true;
  if (flag === "false") return false;
  // Default to true to satisfy request: open project without login
  return process.env.REACT_APP_DEMO_MODE === "false" ? false : true;
};

export const setDemoMode = (value) => {
  localStorage.setItem("demoMode", value ? "true" : "false");
};

export const DEMO_USERS = {
  player: {
    name: "Demo Player",
    email: "player@example.com",
    profilePic: "",
  },
  doctor: {
    name: "Dr. Demo",
    email: "doctor@example.com",
  },
  guardian: {
    name: "Guardian Demo",
    email: "guardian@example.com",
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
