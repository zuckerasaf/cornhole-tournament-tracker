
import { Player, Team, Game, Tournament } from './types';

// Generate player data
export const mockPlayers: Player[] = [
  { id: '1', name: 'John Smith', catchphrase: 'Let the bags fly!', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 6, totalPoints: 120 },
  { id: '2', name: 'Emily Johnson', catchphrase: 'Watch this!', registeredAt: new Date('2023-06-02'), gamesPlayed: 8, gamesWon: 5, totalPoints: 115 },
  { id: '3', name: 'Michael Brown', catchphrase: 'Cornhole master in the house!', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 7, totalPoints: 140 },
  { id: '4', name: 'Sarah Davis', catchphrase: 'Aim small, miss small.', registeredAt: new Date('2023-06-03'), gamesPlayed: 8, gamesWon: 4, totalPoints: 95 },
  { id: '5', name: 'David Wilson', catchphrase: 'Nothing but hole!', registeredAt: new Date('2023-06-02'), gamesPlayed: 8, gamesWon: 5, totalPoints: 110 },
  { id: '6', name: 'Jessica Martinez', catchphrase: 'Bags don't lie!', registeredAt: new Date('2023-06-04'), gamesPlayed: 8, gamesWon: 3, totalPoints: 85 },
  { id: '7', name: 'Robert Taylor', catchphrase: 'Respect the bag.', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 6, totalPoints: 125 },
  { id: '8', name: 'Jennifer Anderson', catchphrase: 'It's all in the wrist!', registeredAt: new Date('2023-06-03'), gamesPlayed: 8, gamesWon: 2, totalPoints: 70 },
  { id: '9', name: 'Christopher Thomas', catchphrase: 'Feel the slide.', registeredAt: new Date('2023-06-02'), gamesPlayed: 8, gamesWon: 4, totalPoints: 100 },
  { id: '10', name: 'Amanda Jackson', catchphrase: 'In the hole!', registeredAt: new Date('2023-06-04'), gamesPlayed: 8, gamesWon: 5, totalPoints: 105 },
  { id: '11', name: 'Daniel White', catchphrase: 'Bean bag wizard!', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 3, totalPoints: 80 },
  { id: '12', name: 'Elizabeth Harris', catchphrase: 'Watch and learn.', registeredAt: new Date('2023-06-03'), gamesPlayed: 8, gamesWon: 5, totalPoints: 110 },
  { id: '13', name: 'Matthew Clark', catchphrase: 'Cornhole champion!', registeredAt: new Date('2023-06-02'), gamesPlayed: 8, gamesWon: 7, totalPoints: 135 },
  { id: '14', name: 'Stephanie Lewis', catchphrase: 'Sliding to victory!', registeredAt: new Date('2023-06-04'), gamesPlayed: 8, gamesWon: 4, totalPoints: 90 },
  { id: '15', name: 'Andrew Walker', catchphrase: 'Accuracy is everything.', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 6, totalPoints: 120 },
  { id: '16', name: 'Melissa Green', catchphrase: 'Focus and throw.', registeredAt: new Date('2023-06-03'), gamesPlayed: 8, gamesWon: 3, totalPoints: 85 },
  { id: '17', name: 'Kevin Adams', catchphrase: 'Let's bag this win!', registeredAt: new Date('2023-06-02'), gamesPlayed: 8, gamesWon: 5, totalPoints: 105 },
  { id: '18', name: 'Rebecca Mitchell', catchphrase: 'Cornhole queen!', registeredAt: new Date('2023-06-04'), gamesPlayed: 8, gamesWon: 2, totalPoints: 75 },
  { id: '19', name: 'Brian Turner', catchphrase: 'Bag toss pro!', registeredAt: new Date('2023-06-01'), gamesPlayed: 8, gamesWon: 4, totalPoints: 95 },
  { id: '20', name: 'Nicole Phillips', catchphrase: 'Slide it in!', registeredAt: new Date('2023-06-03'), gamesPlayed: 8, gamesWon: 5, totalPoints: 110 },
];

// Generate team data
export const mockTeams: Team[] = [
  { id: '1', name: 'Bag Tossers', players: [mockPlayers[0], mockPlayers[1]], gamesPlayed: 8, gamesWon: 6, totalPoints: 235 },
  { id: '2', name: 'Cornhole Kings', players: [mockPlayers[2], mockPlayers[3]], gamesPlayed: 8, gamesWon: 5, totalPoints: 235 },
  { id: '3', name: 'Bag Sliders', players: [mockPlayers[4], mockPlayers[5]], gamesPlayed: 8, gamesWon: 4, totalPoints: 195 },
  { id: '4', name: 'Hole Seekers', players: [mockPlayers[6], mockPlayers[7]], gamesPlayed: 8, gamesWon: 4, totalPoints: 195 },
  { id: '5', name: 'Bean Bag Bros', players: [mockPlayers[8], mockPlayers[9]], gamesPlayed: 8, gamesWon: 5, totalPoints: 205 },
  { id: '6', name: 'Cornhole Queens', players: [mockPlayers[10], mockPlayers[11]], gamesPlayed: 8, gamesWon: 4, totalPoints: 190 },
  { id: '7', name: 'Bag Droppers', players: [mockPlayers[12], mockPlayers[13]], gamesPlayed: 8, gamesWon: 5, totalPoints: 225 },
  { id: '8', name: 'Ace Tossers', players: [mockPlayers[14], mockPlayers[15]], gamesPlayed: 8, gamesWon: 4, totalPoints: 205 },
  { id: '9', name: 'Hole in One', players: [mockPlayers[16], mockPlayers[17]], gamesPlayed: 8, gamesWon: 3, totalPoints: 180 },
  { id: '10', name: 'Slide & Score', players: [mockPlayers[18], mockPlayers[19]], gamesPlayed: 8, gamesWon: 5, totalPoints: 205 },
];

// Generate game data (8 games per team = 40 games total)
export const mockGames: Game[] = Array.from({ length: 40 }, (_, i) => {
  const team1Index = Math.floor(i / 4) % 10;
  const team2Index = (team1Index + 1 + Math.floor(i / 8)) % 10;
  
  const team1Score = Math.floor(Math.random() * 15) + 5;
  const team2Score = Math.floor(Math.random() * 15) + 5;
  const winnerId = team1Score > team2Score ? mockTeams[team1Index].id : mockTeams[team2Index].id;
  
  return {
    id: (i + 1).toString(),
    team1: mockTeams[team1Index],
    team2: mockTeams[team2Index],
    team1Score,
    team2Score,
    date: new Date(2023, 6, i % 30 + 1),
    isCompleted: true,
    winnerId
  };
});

// Generate tournament data
export const mockTournament: Tournament = {
  id: '1',
  name: 'Summer Cornhole Championship 2023',
  teams: mockTeams,
  games: mockGames,
  startDate: new Date('2023-07-01'),
  endDate: new Date('2023-07-30'),
};

// Mock users
export const mockUsers = [
  { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' as const },
  { id: '2', email: 'user@example.com', name: 'Regular User', role: 'user' as const }
];
