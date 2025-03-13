
import React, { useState, useEffect } from "react";
import { Card } from "./ui-custom/Card";
import { Button } from "./ui-custom/Button";
import { mockTeams } from "@/lib/mockData";
import { Team } from "@/lib/types";
import { Trophy, Medal, ArrowUpDown } from "lucide-react";

type SortKey = 'name' | 'gamesWon' | 'gamesPlayed' | 'totalPoints';
type SortDirection = 'asc' | 'desc';

export const Scoreboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>('gamesWon');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load mock data
        setTeams(mockTeams);
      } catch (error) {
        console.error('Error fetching scoreboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      // Toggle direction if same key
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new key and default to desc
      setSortBy(key);
      setSortDirection('desc');
    }
  };

  const sortedTeams = [...teams].sort((a, b) => {
    let comparison = 0;
    
    // Sort by the selected key
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      comparison = (a[sortBy] as number) - (b[sortBy] as number);
    }
    
    // Apply sort direction
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="animate-fade-in">
      <Card glass>
        <Card.Header className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Card.Title className="text-2xl flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Tournament Scoreboard
            </Card.Title>
            <Card.Description>
              Current standings for all teams in the tournament
            </Card.Description>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button 
              variant={sortBy === 'name' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('name')}
              className="flex items-center"
            >
              Team 
              {sortBy === 'name' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button 
              variant={sortBy === 'gamesWon' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('gamesWon')}
              className="flex items-center"
            >
              Wins 
              {sortBy === 'gamesWon' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button 
              variant={sortBy === 'gamesPlayed' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('gamesPlayed')}
              className="flex items-center"
            >
              Games 
              {sortBy === 'gamesPlayed' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button 
              variant={sortBy === 'totalPoints' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSort('totalPoints')}
              className="flex items-center"
            >
              Points 
              {sortBy === 'totalPoints' && (
                <ArrowUpDown className="ml-1 h-3 w-3" />
              )}
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-200 dark:bg-blue-800 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-blue-200 dark:bg-blue-800 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Team</th>
                    <th className="text-center py-3 px-4">Players</th>
                    <th className="text-center py-3 px-4">Games</th>
                    <th className="text-center py-3 px-4">Wins</th>
                    <th className="text-center py-3 px-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
                    <tr 
                      key={team.id} 
                      className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                        index === 0 ? 'bg-amber-50 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        {index === 0 ? (
                          <div className="flex justify-center items-center w-8 h-8 bg-yellow-400 text-white rounded-full">
                            <Trophy className="h-4 w-4" />
                          </div>
                        ) : index === 1 ? (
                          <div className="flex justify-center items-center w-8 h-8 bg-gray-300 text-white rounded-full">
                            <Medal className="h-4 w-4" />
                          </div>
                        ) : index === 2 ? (
                          <div className="flex justify-center items-center w-8 h-8 bg-amber-600 text-white rounded-full">
                            <Medal className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="text-center font-mono w-8 h-8 flex items-center justify-center text-gray-500">
                            {index + 1}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-medium">{team.name}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-xs space-y-1">
                          {team.players.map(player => (
                            <div key={player.id} className="hover:text-primary transition-colors cursor-default" title={player.catchphrase}>
                              {player.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">{team.gamesPlayed}</td>
                      <td className="py-4 px-4 text-center font-medium">{team.gamesWon}</td>
                      <td className="py-4 px-4 text-center">{team.totalPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};
