
import React, { useState, useEffect } from "react";
import { Card } from "./ui-custom/Card";
import { Button } from "./ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { toast } from "sonner";
import { mockTeams, mockGames } from "@/lib/mockData";
import { Team, Game } from "@/lib/types";
import { Plus, Calendar, Trophy, Edit, ArrowUpDown } from "lucide-react";

export const AdminPanel = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState<'schedule' | 'results'>('schedule');
  const [isLoading, setIsLoading] = useState(true);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  
  // Form state
  const [newGame, setNewGame] = useState({
    team1Id: '',
    team2Id: '',
    date: new Date(),
  });
  
  // Game result state
  const [gameResult, setGameResult] = useState({
    team1Score: 0,
    team2Score: 0,
  });

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load mock data
        setTeams(mockTeams);
        setGames(mockGames);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScheduleGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newGame.team1Id || !newGame.team2Id || !newGame.date) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (newGame.team1Id === newGame.team2Id) {
      toast.error("Teams must be different");
      return;
    }
    
    // Get team objects
    const team1 = teams.find(team => team.id === newGame.team1Id);
    const team2 = teams.find(team => team.id === newGame.team2Id);
    
    if (!team1 || !team2) {
      toast.error("Invalid team selection");
      return;
    }
    
    // Create new game object
    const game: Game = {
      id: (games.length + 1).toString(),
      team1: team1,
      team2: team2,
      team1Score: 0,
      team2Score: 0,
      date: newGame.date,
      isCompleted: false,
    };
    
    // In a real app, this would send data to the server
    // For now, we'll just update the local state
    setGames(prevGames => [...prevGames, game]);
    
    // Reset form
    setNewGame({
      team1Id: '',
      team2Id: '',
      date: new Date(),
    });
    
    toast.success("Game scheduled successfully");
  };

  const handleUpdateResult = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingGame) return;
    
    // Validation
    if (gameResult.team1Score < 0 || gameResult.team2Score < 0) {
      toast.error("Scores cannot be negative");
      return;
    }
    
    // Determine winner
    const winnerId = gameResult.team1Score > gameResult.team2Score 
      ? editingGame.team1.id 
      : gameResult.team2Score > gameResult.team1Score 
        ? editingGame.team2.id 
        : undefined;
    
    // Update game object
    const updatedGame: Game = {
      ...editingGame,
      team1Score: gameResult.team1Score,
      team2Score: gameResult.team2Score,
      isCompleted: true,
      winnerId,
    };
    
    // In a real app, this would send data to the server
    // For now, we'll just update the local state
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === updatedGame.id ? updatedGame : game
      )
    );
    
    // Reset form
    setEditingGame(null);
    setGameResult({
      team1Score: 0,
      team2Score: 0,
    });
    
    toast.success("Game result updated successfully");
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setGameResult({
      team1Score: game.team1Score,
      team2Score: game.team2Score,
    });
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 dark:bg-blue-800 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-blue-200 dark:bg-blue-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Navigation */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'schedule' ? 'default' : 'outline'}
          onClick={() => setActiveTab('schedule')}
          className="flex items-center"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Games
        </Button>
        <Button
          variant={activeTab === 'results' ? 'default' : 'outline'}
          onClick={() => setActiveTab('results')}
          className="flex items-center"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Update Results
        </Button>
      </div>
      
      {/* Schedule Games Tab */}
      {activeTab === 'schedule' && (
        <Card glass>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Plus className="h-5 w-5 mr-2 text-blue-500" />
              Schedule New Game
            </Card.Title>
            <Card.Description>
              Create a new match between two teams
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleScheduleGame} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team1">Team 1</Label>
                  <Select 
                    value={newGame.team1Id} 
                    onValueChange={(value) => setNewGame(prev => ({ ...prev, team1Id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team2">Team 2</Label>
                  <Select 
                    value={newGame.team2Id} 
                    onValueChange={(value) => setNewGame(prev => ({ ...prev, team2Id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Game Date & Time</Label>
                <DatePicker 
                  date={newGame.date} 
                  setDate={(date) => setNewGame(prev => ({ ...prev, date: date || new Date() }))}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Schedule Game
              </Button>
            </form>
          </Card.Content>
        </Card>
      )}
      
      {/* Update Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {editingGame ? (
            <Card glass animate>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <Edit className="h-5 w-5 mr-2 text-blue-500" />
                  Update Game Result
                </Card.Title>
                <Card.Description>
                  {editingGame.team1.name} vs {editingGame.team2.name}
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <form onSubmit={handleUpdateResult} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="team1Score">{editingGame.team1.name} Score</Label>
                      <Input
                        id="team1Score"
                        type="number"
                        min="0"
                        value={gameResult.team1Score}
                        onChange={(e) => setGameResult(prev => ({ ...prev, team1Score: parseInt(e.target.value) || 0 }))}
                        className="bg-white/50 dark:bg-black/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team2Score">{editingGame.team2.name} Score</Label>
                      <Input
                        id="team2Score"
                        type="number"
                        min="0"
                        value={gameResult.team2Score}
                        onChange={(e) => setGameResult(prev => ({ ...prev, team2Score: parseInt(e.target.value) || 0 }))}
                        className="bg-white/50 dark:bg-black/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button variant="outline" type="button" onClick={() => setEditingGame(null)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Result
                    </Button>
                  </div>
                </form>
              </Card.Content>
            </Card>
          ) : (
            <Card glass>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-blue-500" />
                  Manage Game Results
                </Card.Title>
                <Card.Description>
                  Update scores for completed games
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {games.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No games scheduled yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {games.map(game => (
                        <div 
                          key={game.id}
                          className={`p-4 rounded-lg border ${
                            game.isCompleted 
                              ? 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800'
                              : 'bg-white border-blue-100 dark:bg-black/50 dark:border-blue-900/30'
                          } transition-all hover:shadow-sm`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="font-medium mb-1">
                                {game.team1.name} vs {game.team2.name}
                              </div>
                              
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {new Date(game.date).toLocaleString()}
                              </div>
                              
                              {game.isCompleted && (
                                <div className="flex items-center text-sm">
                                  <div className={`font-bold mr-1 ${
                                    game.team1Score > game.team2Score 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {game.team1Score}
                                  </div>
                                  <div className="mx-1 text-gray-500">-</div>
                                  <div className={`font-bold ml-1 ${
                                    game.team2Score > game.team1Score 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {game.team2Score}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-3 md:mt-0">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditGame(game)}
                              >
                                {game.isCompleted ? "Update" : "Record Score"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
