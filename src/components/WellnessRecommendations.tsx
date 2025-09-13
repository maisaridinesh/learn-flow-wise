import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Users, Moon, Coffee, Book, Music, TreePine } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise",
    description: "Your stress levels seem elevated today. Try this quick breathing technique to calm your mind.",
    category: "Stress Relief",
    icon: Brain,
    duration: "5 min",
    priority: "high",
    type: "Exercise"
  },
  {
    id: 2,
    title: "Connect with a Friend",
    description: "You mentioned feeling isolated. Reach out to someone you care about for a quick chat.",
    category: "Social Wellness",
    icon: Users,
    duration: "15 min",
    priority: "medium",
    type: "Social"
  },
  {
    id: 3,
    title: "Gentle Evening Routine",
    description: "Your sleep quality could improve. Try this calming routine 1 hour before bed.",
    category: "Sleep Hygiene",
    icon: Moon,
    duration: "30 min",
    priority: "medium",
    type: "Routine"
  },
  {
    id: 4,
    title: "Mindful Study Break",
    description: "Take a break from studying with this mindfulness exercise to refresh your focus.",
    category: "Academic Wellness",
    icon: Book,
    duration: "10 min",
    priority: "low",
    type: "Break"
  }
];

const copingStrategies = [
  {
    title: "Deep Breathing",
    description: "4-7-8 breathing technique for instant calm",
    icon: Brain,
    steps: ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 4 times"]
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Release physical tension systematically",
    icon: Heart,
    steps: ["Start with your toes", "Tense for 5 seconds", "Release and relax", "Move up to next muscle group"]
  },
  {
    title: "Grounding Exercise",
    description: "5-4-3-2-1 technique for anxiety relief",
    icon: TreePine,
    steps: ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"]
  }
];

const resources = [
  { title: "Campus Counseling Center", type: "Professional Help", available: "24/7" },
  { title: "Peer Support Groups", type: "Community", available: "Weekly" },
  { title: "Wellness Workshops", type: "Educational", available: "Monthly" },
  { title: "Crisis Hotline", type: "Emergency", available: "24/7" }
];

export const WellnessRecommendations = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-stress text-white";
      case "medium": return "bg-warning text-white";
      case "low": return "bg-calm text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Personalized Wellness Recommendations</h2>
        <p className="text-muted-foreground">Based on your recent check-ins and patterns</p>
      </div>

      {/* Personalized Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended for You</h3>
        <div className="grid gap-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <Card key={rec.id} className="p-4 shadow-soft hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-wellness flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                      <Badge variant="outline">{rec.duration}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Start Activity
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Coping Strategies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Coping Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copingStrategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <Card key={index} className="p-4 shadow-soft">
                <div className="text-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{strategy.title}</h4>
                  <p className="text-xs text-muted-foreground">{strategy.description}</p>
                </div>
                <div className="space-y-1">
                  {strategy.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                        {stepIndex + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Try Now
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Support Resources */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-lg font-semibold mb-4">Support Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <h4 className="font-medium text-foreground">{resource.title}</h4>
                <p className="text-sm text-muted-foreground">{resource.type}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">{resource.available}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-stress/10 border border-stress/20">
          <p className="text-sm text-stress font-medium">Crisis Support</p>
          <p className="text-xs text-muted-foreground">If you're in crisis, please reach out immediately to emergency services or the crisis hotline.</p>
        </div>
      </Card>
    </div>
  );
};