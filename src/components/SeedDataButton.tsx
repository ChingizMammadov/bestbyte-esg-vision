
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedEsgData } from "@/utils/seedEsgData";
import { useToast } from "@/hooks/use-toast";
import { Database, Loader2 } from "lucide-react";

export function SeedDataButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsLoading(true);
    try {
      const result = await seedEsgData();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        // Refresh the page to show the new data
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: `Failed to seed data: ${result.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while seeding data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedData}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Database className="w-4 h-4" />
      )}
      {isLoading ? "Seeding..." : "Add Sample Data"}
    </Button>
  );
}
