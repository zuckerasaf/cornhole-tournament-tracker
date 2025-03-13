
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { useNavigate } from "react-router-dom";
import { Scoreboard } from "@/components/Scoreboard";
import { Trophy, Users, Calendar, ClipboardList } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("Index page mounted");
  }, []);

  return (
    <Layout>
      <div className="space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl -z-10"></div>
          <div className="glass rounded-2xl py-16 px-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-black/50 -z-10"></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Cornhole Tournament Tracker
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Track scores, schedule games, and register for cornhole tournaments with our elegant, easy-to-use platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/scoreboard")}
                size="lg"
                className="flex items-center font-medium"
              >
                <Trophy className="mr-2 h-5 w-5" />
                View Scoreboard
              </Button>
              {!currentUser && (
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glass hover animate className="p-2">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Live Scoreboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time updates of tournament standings, including wins, points, and rankings.
              </p>
            </div>
          </Card>
          
          <Card glass hover animate className="p-2">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Game Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                View upcoming matches and past results with our interactive schedule.
              </p>
            </div>
          </Card>
          
          <Card glass hover animate className="p-2">
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Team Registration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easy registration for players and teams with custom catchphrases.
              </p>
            </div>
          </Card>
        </section>

        {/* Scoreboard Preview */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Tournament Standings</h2>
          <Scoreboard />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
