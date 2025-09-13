import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Upload, 
  Brain, 
  BarChart3, 
  BookOpen, 
  Settings,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "assessments", label: "Assessments", icon: Brain },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "library", label: "Library", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-card/80 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-sm border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AdaptiveLearn</h1>
              <p className="text-xs text-muted-foreground">Study Companion</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                  {item.id === "assessments" && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      3
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Progress Summary */}
          <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
            <h3 className="text-sm font-medium text-foreground mb-2">This Week</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Study Sessions</span>
                <span className="font-medium text-foreground">17</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Score</span>
                <span className="font-medium text-success">84%</span>
              </div>
              <div className="flex justify-between">
                <span>Time Spent</span>
                <span className="font-medium text-foreground">28h</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};