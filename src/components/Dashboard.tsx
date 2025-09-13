import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, BarChart3, Brain, Upload, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AdaptiveLearn</h1>
                <p className="text-sm text-muted-foreground">Intelligent Study Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                New Assessment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Study Sessions</p>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this week
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assessments</p>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  85% avg score
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">3 processed today</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-card to-card/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-foreground">78%</p>
                <div className="mt-2">
                  <Progress value={78} className="h-2" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-0 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Learning Activity</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Introduction to Machine Learning", type: "Assessment", score: "92%", time: "2 hours ago" },
                  { title: "Data Structures and Algorithms", type: "Study Session", duration: "45 min", time: "1 day ago" },
                  { title: "Web Development Fundamentals", type: "Document", progress: "75%", time: "2 days ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        {activity.type === "Assessment" && <FileText className="w-5 h-5 text-primary" />}
                        {activity.type === "Study Session" && <BookOpen className="w-5 h-5 text-accent" />}
                        {activity.type === "Document" && <Upload className="w-5 h-5 text-warning" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-success">
                        {activity.score || activity.duration || activity.progress}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-md">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="w-4 h-4 mr-2" />
                  Get Recommendations
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-md">
              <h2 className="text-xl font-semibold text-foreground mb-4">Learning Streak</h2>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-accent mx-auto flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">7</span>
                </div>
                <p className="font-medium text-foreground">Days in a row!</p>
                <p className="text-sm text-muted-foreground">Keep up the great work</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};