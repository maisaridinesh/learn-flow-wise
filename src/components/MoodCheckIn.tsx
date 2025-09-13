import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Heart, Smile, Meh, Frown, AlertCircle } from "lucide-react";

const moodEmojis = [
  { icon: AlertCircle, label: "Very Low", color: "text-stress", value: 1 },
  { icon: Frown, label: "Low", color: "text-sad", value: 2 },
  { icon: Meh, label: "Neutral", color: "text-muted-foreground", value: 3 },
  { icon: Smile, label: "Good", color: "text-calm", value: 4 },
  { icon: Heart, label: "Excellent", color: "text-joy", value: 5 }
];

const wellnessAreas = [
  "Sleep Quality",
  "Stress Level", 
  "Energy Level",
  "Social Connection",
  "Academic Confidence"
];

export const MoodCheckIn = () => {
  const [mood, setMood] = useState<number>(3);
  const [wellnessScores, setWellnessScores] = useState<Record<string, number>>({
    "Sleep Quality": 5,
    "Stress Level": 5,
    "Energy Level": 5,
    "Social Connection": 5,
    "Academic Confidence": 5
  });
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    // Here you would save the data
    toast({
      title: "Check-in submitted!",
      description: "Your wellness data has been recorded. Take care of yourself! 💚",
    });
    
    // Reset form
    setMood(3);
    setWellnessScores({
      "Sleep Quality": 5,
      "Stress Level": 5,
      "Energy Level": 5,
      "Social Connection": 5,
      "Academic Confidence": 5
    });
    setNotes("");
  };

  const updateWellnessScore = (area: string, value: number[]) => {
    setWellnessScores(prev => ({ ...prev, [area]: value[0] }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Daily Wellness Check-In</h2>
        <p className="text-muted-foreground">Take a moment to reflect on how you're feeling today</p>
      </div>

      <Card className="p-6 shadow-soft">
        <div className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">How are you feeling today?</Label>
            <div className="flex justify-center gap-4">
              {moodEmojis.map((moodOption) => {
                const Icon = moodOption.icon;
                return (
                  <button
                    key={moodOption.value}
                    onClick={() => setMood(moodOption.value)}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:bg-muted/50 ${
                      mood === moodOption.value 
                        ? "border-primary bg-primary/10" 
                        : "border-border"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${moodOption.color} mb-2`} />
                    <span className="text-sm font-medium">{moodOption.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wellness Areas */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Wellness Check</Label>
            <div className="grid gap-4">
              {wellnessAreas.map((area) => (
                <div key={area} className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm font-medium">{area}</Label>
                    <span className="text-sm text-muted-foreground">
                      {wellnessScores[area]}/10
                    </span>
                  </div>
                  <Slider
                    value={[wellnessScores[area]]}
                    onValueChange={(value) => updateWellnessScore(area, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-lg font-semibold">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="How was your day? Any challenges or wins you'd like to note?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
          >
            Submit Check-In
          </Button>
        </div>
      </Card>
    </div>
  );
};