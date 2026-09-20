export type Status =
  "playing" | "paused" | "backlog" | "wishlist" | "completed" | "stopped";
export type ViewMode = "grid" | "cards" | "list";
export type Game = {
  id: string;
  title: string;
  year: number;
  genre: string;
  platforms: string;
  hoursToBeat: number;
  description: string;
  steamId: number;
  released: string;
};
export type Entry = {
  status: Status;
  hours: number;
  progress: number;
  favorite: boolean;
  rating: number;
  notes: string;
};
export const statuses: { id: Status; label: string }[] = [
  { id: "playing", label: "Play next" },
  { id: "paused", label: "Collecting dust" },
  { id: "backlog", label: "Not started" },
  { id: "wishlist", label: "Play later" },
  { id: "completed", label: "Completed" },
  { id: "stopped", label: "Stopped" },
];
export const games: Game[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    year: 2022,
    genre: "RPG",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 60,
    steamId: 1245620,
    released: "2022-02-25",
    description:
      "Rise, Tarnished. Explore the Lands Between, uncover the power of the Elden Ring, and become an Elden Lord in a vast world shaped by myth.",
  },
  {
    id: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    year: 2018,
    genre: "Adventure",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 50,
    steamId: 1174180,
    released: "2018-10-26",
    description:
      "America, 1899. Arthur Morgan and the Van der Linde gang must rob, steal and fight their way across the rugged heartland as the age of outlaws comes to an end.",
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    year: 2020,
    genre: "RPG",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 30,
    steamId: 1091500,
    released: "2020-12-10",
    description:
      "Become a mercenary outlaw in Night City, a sprawling metropolis obsessed with power, glamour and body modification. Your choices shape the story and the world around you.",
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    year: 2017,
    genre: "Indie",
    platforms: "PC · PlayStation · Xbox · Switch",
    hoursToBeat: 27,
    steamId: 367520,
    released: "2017-02-24",
    description:
      "Descend into the haunting depths of Hallownest. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs in a forgotten kingdom.",
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur’s Gate 3",
    year: 2023,
    genre: "RPG",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 65,
    steamId: 1086940,
    released: "2023-08-03",
    description:
      "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
  },
  {
    id: "hades",
    title: "Hades",
    year: 2020,
    genre: "Indie",
    platforms: "PC · PlayStation · Xbox · Switch",
    hoursToBeat: 22,
    steamId: 1145360,
    released: "2020-09-17",
    description:
      "Defy the god of the dead as you battle out of the Underworld. Wield the powers and mythic weapons of Olympus in a rogue-like dungeon crawler.",
  },
  {
    id: "god-of-war",
    title: "God of War",
    year: 2018,
    genre: "Action",
    platforms: "PC · PlayStation",
    hoursToBeat: 21,
    steamId: 1593500,
    released: "2018-04-20",
    description:
      "Living as a man outside the shadow of the gods, Kratos must adapt to unfamiliar lands, unexpected threats and a second chance at being a father.",
  },
  {
    id: "witcher-3",
    title: "The Witcher 3",
    year: 2015,
    genre: "RPG",
    platforms: "PC · PlayStation · Xbox · Switch",
    hoursToBeat: 52,
    steamId: 292030,
    released: "2015-05-19",
    description:
      "You are Geralt of Rivia, mercenary monster slayer. Explore a war-torn world as you track down the Child of Prophecy, a living weapon that can alter the shape of the world.",
  },
  {
    id: "sekiro",
    title: "Sekiro: Shadows Die Twice",
    year: 2019,
    genre: "Action",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 30,
    steamId: 814380,
    released: "2019-03-22",
    description:
      "Carve your own clever path to vengeance. Explore late 1500s Sengoku Japan as a disgraced warrior rescued from the brink of death.",
  },
  {
    id: "death-stranding",
    title: "Death Stranding",
    year: 2019,
    genre: "Adventure",
    platforms: "PC · PlayStation · Xbox",
    hoursToBeat: 40,
    steamId: 1850570,
    released: "2019-11-08",
    description:
      "Carry the disconnected remnants of our future. Sam Bridges journeys across a shattered landscape to reconnect a fractured society.",
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    year: 2016,
    genre: "Simulation",
    platforms: "PC · PlayStation · Xbox · Switch · Mobile",
    hoursToBeat: 55,
    steamId: 413150,
    released: "2016-02-26",
    description:
      "Turn an overgrown field into a thriving home. Raise animals, grow crops, explore mysterious caves and build friendships in a peaceful country town.",
  },
  {
    id: "ghost-of-tsushima",
    title: "Ghost of Tsushima",
    year: 2020,
    genre: "Action",
    platforms: "PC · PlayStation",
    hoursToBeat: 25,
    steamId: 2215430,
    released: "2020-07-17",
    description:
      "Forge a new path and wage an unconventional war for the freedom of Tsushima. Discover a story of honor and sacrifice in a beautiful open world.",
  },
];
export const cover = (game: Game) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.steamId}/library_600x900_2x.jpg`;
export const hero = (game: Game) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.steamId}/library_hero.jpg`;
export const emptyEntry = (status: Status = "backlog"): Entry => ({
  status,
  hours: 0,
  progress: 0,
  favorite: false,
  rating: 0,
  notes: "",
});
export const initialEntries: Record<string, Entry> = {
  "elden-ring": {
    ...emptyEntry("playing"),
    hours: 72,
    progress: 68,
    favorite: true,
  },
  "red-dead-redemption-2": { ...emptyEntry("paused"), hours: 26, progress: 39 },
  "cyberpunk-2077": {
    ...emptyEntry("paused"),
    hours: 20,
    progress: 44,
    favorite: true,
  },
  "hollow-knight": { ...emptyEntry("paused"), hours: 18, progress: 42 },
  "baldurs-gate-3": emptyEntry(),
  hades: emptyEntry(),
  "god-of-war": emptyEntry(),
  "witcher-3": {
    ...emptyEntry("completed"),
    hours: 86,
    progress: 100,
    favorite: true,
    rating: 5,
  },
  sekiro: emptyEntry("wishlist"),
  "death-stranding": emptyEntry("wishlist"),
};
