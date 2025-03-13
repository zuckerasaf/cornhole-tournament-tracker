
import React, { useState, useEffect } from "react";
import { Card } from "./ui-custom/Card";
import { Button } from "./ui-custom/Button";
import { mockGames } from "@/lib/mockData";
import { Game } from "@/lib/types";
import { format } from "date-fns";
import { Calendar, Clock, CheckCircle, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const GameSchedule = () => {
  const { isAdmin } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load mock data
        setGames(mockGames);
        
        // Extract unique dates
        const uniqueDates = Array.from(
          new Set(
            mockGames.map(game => 
              format(new Date(game.date), 'yyyy-MM-dd')
            )
          )
        ).sort();
        
        setDates(uniqueDates);
        setSelectedDate(uniqueDates[0]);
      } catch (error) {
        console.error('Error fetching game schedule data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredGames = selectedDate
    ? games.filter(game => 
        format(new Date(game.date), 'yyyy-MM-dd') === selectedDate
      )
    : games;

  return (
    <div className="animate-fade-in">
      <Card glass>
        <Card.Header>
          <Card.Title className="text-2xl flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-500" />
            Game Schedule
          </Card.Title>
          <Card.Description>
            View upcoming and past cornhole matches
          </Card.Description>
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
            <>
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {dates.map(date => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDate(date)}
                      className="transition-all"
                    >
                      {format(new Date(date), 'MMM d')}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredGames.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No games scheduled for this date.
                  </div>
                ) : (
                  filteredGames.map(game => (
                    <div 
                      key={game.id}
                      className={`p-4 rounded-lg border ${
                        game.isCompleted 
                          ? 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800'
                          : 'bg-white border-blue-100 dark:bg-black/50 dark:border-blue-900/30'
                      } transition-all hover:shadow-sm`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {format(new Date(game.date), 'h:mm a')}
                            </span>
                            {game.isCompleted && (
                              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </span>
                            )}
                          </div>
                          
                          <div className="font-medium text-lg mb-1">
                            {game.team1.name} vs {game.team2.name}
                          </div>
                          
                          {game.isCompleted ? (
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
                              
                              <div className="ml-3 flex items-center">
                                <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {game.team1Score > game.team2Score ? game.team1.name : game.team2.name}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Upcoming match
                            </div>
                          )}
                        </div>
                        
                        {isAdmin() && (
                          <Button 
                            variant={game.isCompleted ? "outline" : "default"} 
                            size="sm"
                          >
                            {game.isCompleted ? "Update Result" : "Record Score"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};
