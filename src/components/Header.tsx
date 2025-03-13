
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui-custom/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, Trophy } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary hover:opacity-90 transition-opacity"
          >
            <Trophy className="h-6 w-6" />
            <span className="font-bold text-xl">CornScore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive("/") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
            >
              Home
            </Link>
            <Link 
              to="/scoreboard" 
              className={`text-sm font-medium transition-colors ${isActive("/scoreboard") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
            >
              Scoreboard
            </Link>
            <Link 
              to="/schedule" 
              className={`text-sm font-medium transition-colors ${isActive("/schedule") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
            >
              Schedule
            </Link>
            {currentUser && (
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${isActive("/dashboard") 
                  ? "text-primary" 
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              >
                Dashboard
              </Link>
            )}
            {isAdmin() && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors ${isActive("/admin") 
                  ? "text-primary" 
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentUser.name}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/login")}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-500" />
            ) : (
              <Menu className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass animate-fade-in border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="px-4 py-5 space-y-4">
            <Link 
              to="/" 
              className={`block text-base font-medium ${isActive("/") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/scoreboard" 
              className={`block text-base font-medium ${isActive("/scoreboard") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Scoreboard
            </Link>
            <Link 
              to="/schedule" 
              className={`block text-base font-medium ${isActive("/schedule") 
                ? "text-primary" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>
            {currentUser && (
              <Link 
                to="/dashboard" 
                className={`block text-base font-medium ${isActive("/dashboard") 
                  ? "text-primary" 
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAdmin() && (
              <Link 
                to="/admin" 
                className={`block text-base font-medium ${isActive("/admin") 
                  ? "text-primary" 
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentUser.name}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
