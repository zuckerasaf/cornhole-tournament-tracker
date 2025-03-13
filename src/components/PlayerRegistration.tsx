
import React, { useState } from "react";
import { Button } from "./ui-custom/Button";
import { Card } from "./ui-custom/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const PlayerRegistration = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    catchphrase: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim() || !formData.catchphrase.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call with 1s delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would send data to the server
      // For now, we'll just show a success message
      toast.success("Registration successful!");
      setSubmitted(true);
      
      // Would normally save to Google Sheets here
      console.log("Player registered:", {
        ...formData,
        userId: currentUser?.id,
        registeredAt: new Date().toISOString(),
      });
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card glass animate className="max-w-md mx-auto">
        <Card.Header>
          <Card.Title>Registration Complete</Card.Title>
          <Card.Description>
            Thank you for registering for the tournament!
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-4">
            <h3 className="text-lg font-semibold mb-2">{formData.name}</h3>
            <p className="italic">&quot;{formData.catchphrase}&quot;</p>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button 
            className="w-full" 
            onClick={() => {
              setFormData({ name: "", catchphrase: "" });
              setSubmitted(false);
            }}
          >
            Register Another Player
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <Card glass animate className="max-w-md mx-auto">
      <Card.Header>
        <Card.Title>Player Registration</Card.Title>
        <Card.Description>
          Join the Cornhole Tournament by registering below.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-white/50 dark:bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="catchphrase">Catchphrase</Label>
            <Input
              id="catchphrase"
              name="catchphrase"
              placeholder="Your cornhole catchphrase"
              value={formData.catchphrase}
              onChange={handleInputChange}
              required
              className="bg-white/50 dark:bg-black/50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This will be displayed on the scoreboard.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};
