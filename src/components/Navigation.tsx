import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  TrendingUp, 
  Lightbulb, 
  BarChart3, 
  Brain, 
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
    { id: "dashboard", label: "Wellness Dashboard", icon: BarChart3 },
    { id: "checkin", label: "Daily Check-In", icon: Heart },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
    { id: "trends", label: "My Trends", icon: TrendingUp },
    { id: "resources", label: "Resources", icon: Brain },
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
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">WellnessMind</h1>
              <p className="text-xs text-muted-foreground">Mental Health Support</p>
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
                  {item.id === "checkin" && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      ✓
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Wellness Summary */}
          <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
            <h3 className="text-sm font-medium text-foreground mb-2">This Week</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Check-ins</span>
                <span className="font-medium text-foreground">7/7</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Mood</span>
                <span className="font-medium text-success">4.2/5</span>
              </div>
              <div className="flex justify-between">
                <span>Wellness Streak</span>
                <span className="font-medium text-foreground">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};