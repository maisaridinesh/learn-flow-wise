import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Heart, Brain, Users, Moon } from "lucide-react";

const moodData = [
  { date: "Mon", mood: 4, stress: 3, energy: 4 },
  { date: "Tue", mood: 3, stress: 5, energy: 3 },
  { date: "Wed", mood: 5, stress: 2, energy: 5 },
  { date: "Thu", mood: 4, stress: 3, energy: 4 },
  { date: "Fri", mood: 5, stress: 2, energy: 5 },
  { date: "Sat", mood: 4, stress: 2, energy: 4 },
  { date: "Sun", mood: 4, stress: 3, energy: 4 }
];

const wellnessData = [
  { area: "Sleep", score: 8 },
  { area: "Stress", score: 6 },
  { area: "Energy", score: 7 },
  { area: "Social", score: 8 },
  { area: "Academic", score: 7 }
];

export const WellnessDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Wellness Dashboard</h2>
        <p className="text-muted-foreground">Track your mental health journey and wellness trends</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Mood</p>
              <p className="text-2xl font-bold text-foreground">4.2/5</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +8% this week
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-joy/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-joy" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Stress Level</p>
              <p className="text-2xl font-bold text-foreground">3.1/10</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                -12% this week
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-calm/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-calm" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sleep Quality</p>
              <p className="text-2xl font-bold text-foreground">7.8/10</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                Stable
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Check-in Streak</p>
              <p className="text-2xl font-bold text-foreground">7 days</p>
              <p className="text-xs text-success">Keep it up!</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Trends */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Weekly Mood Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--joy))" 
                strokeWidth={3}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="hsl(var(--stress))" 
                strokeWidth={2}
                name="Stress"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="hsl(var(--calm))" 
                strokeWidth={2}
                name="Energy"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Wellness Radar */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Wellness Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={wellnessData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" />
              <PolarRadiusAxis domain={[0, 10]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Progress Goals */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-lg font-semibold mb-4">Weekly Wellness Goals</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Daily Check-ins (7/7)</span>
              <span className="text-sm text-success">100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Meditation Sessions (4/5)</span>
              <span className="text-sm text-muted-foreground">80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Exercise Sessions (3/4)</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};