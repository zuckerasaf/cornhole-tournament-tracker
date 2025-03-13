
export interface Player {
  id: string;
  name: string;
  catchphrase: string;
  registeredAt: Date;
  gamesPlayed: number;
  gamesWon: number;
  totalPoints: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  gamesPlayed: number;
  gamesWon: number;
  totalPoints: number;
}

export interface Game {
  id: string;
  team1: Team;
  team2: Team;
  team1Score: number;
  team2Score: number;
  date: Date;
  isCompleted: boolean;
  winnerId?: string;
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  games: Game[];
  startDate: Date;
  endDate: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}
