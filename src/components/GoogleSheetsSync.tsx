
import React, { useState } from "react";
import { Card } from "./ui-custom/Card";
import { Button } from "./ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowUpDown, Database, RefreshCw } from "lucide-react";

export const GoogleSheetsSync = () => {
  const [sheetId, setSheetId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sheetId.trim()) {
      toast.error("Please enter a valid Google Sheet ID");
      return;
    }
    
    try {
      setIsSyncing(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would connect to Google Sheets API
      setIsAuthenticated(true);
      setLastSynced(new Date());
      
      toast.success("Connected to Google Sheets successfully");
    } catch (error) {
      toast.error("Failed to connect to Google Sheets");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would sync data with Google Sheets
      setLastSynced(new Date());
      
      toast.success("Data synchronized with Google Sheets");
    } catch (error) {
      toast.error("Failed to synchronize data");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card glass animate>
      <Card.Header>
        <Card.Title className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-green-500" />
          Google Sheets Integration
        </Card.Title>
        <Card.Description>
          Connect and synchronize tournament data with Google Sheets
        </Card.Description>
      </Card.Header>
      <Card.Content>
        {!isAuthenticated ? (
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheetId">Google Sheet ID</Label>
              <Input
                id="sheetId"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
                placeholder="Enter the Google Sheet ID"
                className="bg-white/50 dark:bg-black/50"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Find the Sheet ID in the URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              isLoading={isSyncing}
            >
              Connect to Google Sheets
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
              <div className="flex items-center text-green-800 dark:text-green-300 font-medium mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                Connected to Google Sheets
              </div>
              {lastSynced && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last synchronized: {lastSynced.toLocaleString()}
                </p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
                className="flex-1"
              >
                Disconnect
              </Button>
              <Button
                onClick={handleSync}
                isLoading={isSyncing}
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-1 text-gray-500" />
                Sync Options
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync" className="cursor-pointer">Auto-sync every 30 minutes</Label>
                  <input
                    type="checkbox"
                    id="auto-sync"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-players" className="cursor-pointer">Sync player data</Label>
                  <input
                    type="checkbox"
                    id="sync-players"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-games" className="cursor-pointer">Sync game results</Label>
                  <input
                    type="checkbox"
                    id="sync-games"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};
