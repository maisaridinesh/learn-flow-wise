import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { DocumentUpload } from "@/components/DocumentUpload";
import { AssessmentGenerator } from "@/components/AssessmentGenerator";
import { Analytics } from "@/components/Analytics";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "upload":
        return <DocumentUpload />;
      case "assessments":
        return <AssessmentGenerator />;
      case "analytics":
        return <Analytics />;
      case "library":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Document Library</h2>
            <p className="text-muted-foreground">Coming soon - Organize and manage your learning materials</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Settings</h2>
            <p className="text-muted-foreground">Coming soon - Customize your learning experience</p>
          </div>
        );
      default:
        return <Dashboard />;
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
