import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Target, Clock, Award, BookOpen } from "lucide-react";

export const Analytics = () => {
  const performanceData = [
    { subject: "Machine Learning", score: 92, trend: "+8%", sessions: 12 },
    { subject: "Data Structures", score: 78, trend: "+15%", sessions: 8 },
    { subject: "Web Development", score: 85, trend: "+3%", sessions: 15 },
    { subject: "Algorithms", score: 71, trend: "-2%", sessions: 6 },
  ];

  const weeklyActivity = [
    { day: "Mon", sessions: 2, score: 85 },
    { day: "Tue", sessions: 3, score: 92 },
    { day: "Wed", sessions: 1, score: 78 },
    { day: "Thu", sessions: 4, score: 88 },
    { day: "Fri", sessions: 2, score: 95 },
    { day: "Sat", sessions: 3, score: 82 },
    { day: "Sun", sessions: 2, score: 90 },
  ];

  const maxSessions = Math.max(...weeklyActivity.map(d => d.sessions));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-3xl font-bold text-foreground">84%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">+6% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Study Time</p>
              <p className="text-3xl font-bold text-foreground">28h</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-foreground">24</p>
              <div className="flex items-center gap-1 mt-1">
                <Target className="w-3 h-3 text-accent" />
                <span className="text-xs text-muted-foreground">Assessments</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-3xl font-bold text-foreground">7</p>
              <div className="flex items-center gap-1 mt-1">
                <BookOpen className="w-3 h-3 text-warning" />
                <span className="text-xs text-muted-foreground">Days</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Subject Performance</h2>
            <Button variant="outline" size="sm">View Details</Button>
          </div>

          <div className="space-y-6">
            {performanceData.map((subject, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{subject.subject}</h3>
                    <p className="text-sm text-muted-foreground">{subject.sessions} sessions completed</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-foreground">{subject.score}%</span>
                      <Badge 
                        variant={subject.trend.startsWith('+') ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {subject.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Progress value={subject.score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Weekly Activity</h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          <div className="space-y-4">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">{day.sessions} sessions</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm font-medium text-foreground">{day.score}% avg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.sessions / maxSessions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Recommendations */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Personalized Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-warning" />
                <h3 className="font-medium text-foreground">Focus Area</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Your Algorithms score has decreased. Consider reviewing sorting and searching concepts.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Review Materials
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <h3 className="font-medium text-foreground">Strength</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Excellent progress in Machine Learning! You're ready for advanced topics.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Advanced Practice
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground">Study Schedule</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Maintain your 7-day streak! Schedule 30 minutes of practice tomorrow.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Set Reminder
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};