import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { WellnessDashboard } from "@/components/WellnessDashboard";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <WellnessDashboard />;
      case "checkin":
        return <MoodCheckIn />;
      case "recommendations":
        return <WellnessRecommendations />;
      case "trends":
        return <WellnessDashboard />;
      case "resources":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Mental Health Resources</h2>
            <p className="text-muted-foreground">Coming soon - Access support resources and educational materials</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Settings</h2>
            <p className="text-muted-foreground">Coming soon - Customize your wellness experience</p>
          </div>
        );
      default:
        return <WellnessDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
