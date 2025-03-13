
import React, { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card>
          <Card.Header>
            <Card.Title>Welcome to Your Dashboard</Card.Title>
            <Card.Description>
              You are logged in as {currentUser.name || currentUser.email}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Your Account Details</h3>
                <p className="text-sm mb-1">
                  <span className="font-medium">Email:</span> {currentUser.email}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Role:</span> {currentUser.role}
                </p>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <Button variant="outline" onClick={handleLogout}>
              Log Out
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
