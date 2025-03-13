
import { Header } from "./Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <Header />
      <main className="flex-grow px-4 md:px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="page-transition w-full">
          {children}
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Cornhole Tournament Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};
