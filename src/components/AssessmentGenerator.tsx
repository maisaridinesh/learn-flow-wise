import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Brain, FileText, CheckCircle2, Settings, Zap } from "lucide-react";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: string;
  difficulty: "easy" | "medium" | "hard";
}

export const AssessmentGenerator = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [questionTypes, setQuestionTypes] = useState<string[]>(["multiple-choice"]);
  const [questionCount, setQuestionCount] = useState([10]);
  const [difficulty, setDifficulty] = useState("medium");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();

  const documents = [
    { id: "1", name: "Introduction to Machine Learning.pdf", processed: true },
    { id: "2", name: "Data Structures Guide.docx", processed: true },
    { id: "3", name: "Web Development Basics.txt", processed: false },
  ];

  const questionTypeOptions = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "true-false", label: "True/False" },
    { value: "short-answer", label: "Short Answer" },
    { value: "essay", label: "Essay" },
  ];

  const handleGenerate = async () => {
    if (!selectedDocument) {
      toast({
        title: "Select a document",
        description: "Please select a document to generate questions from.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate generated questions
    setTimeout(() => {
      const mockQuestions: Question[] = [
        {
          id: "1",
          type: "multiple-choice",
          question: "What is the primary goal of machine learning?",
          options: [
            "To replace human intelligence",
            "To enable computers to learn and improve from experience",
            "To create perfect algorithms",
            "To eliminate the need for data"
          ],
          correctAnswer: "To enable computers to learn and improve from experience",
          difficulty: "easy"
        },
        {
          id: "2",
          type: "true-false",
          question: "Supervised learning requires labeled training data.",
          correctAnswer: "true",
          difficulty: "medium"
        },
        {
          id: "3",
          type: "short-answer",
          question: "Explain the difference between overfitting and underfitting in machine learning models.",
          difficulty: "hard"
        }
      ];

      setGeneratedQuestions(mockQuestions);
      setProgress(100);
      setIsGenerating(false);
      
      toast({
        title: "Assessment generated successfully!",
        description: `Created ${questionCount[0]} questions from your document.`,
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Assessment Generator</h1>
        <p className="text-muted-foreground">Create personalized assessments from your uploaded content</p>
      </div>

      {/* Configuration Panel */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Assessment Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Source Document</label>
            <Select value={selectedDocument} onValueChange={setSelectedDocument}>
              <SelectTrigger>
                <SelectValue placeholder="Select a processed document" />
              </SelectTrigger>
              <SelectContent>
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id} disabled={!doc.processed}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {doc.name}
                      {doc.processed && <Badge variant="secondary" className="ml-2">Ready</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Number of Questions</label>
            <div className="px-3 py-2">
              <Slider
                value={questionCount}
                onValueChange={setQuestionCount}
                max={50}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5</span>
                <span className="font-medium">{questionCount[0]} questions</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Question Types */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Question Types</label>
            <div className="grid grid-cols-2 gap-2">
              {questionTypeOptions.map((type) => (
                <Button
                  key={type.value}
                  variant={questionTypes.includes(type.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setQuestionTypes(prev =>
                      prev.includes(type.value)
                        ? prev.filter(t => t !== type.value)
                        : [...prev, type.value]
                    );
                  }}
                  className="justify-start"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Difficulty Level</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium text-foreground">Custom Instructions (Optional)</label>
          <Textarea
            placeholder="Add specific instructions for question generation, topics to focus on, or learning objectives..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedDocument}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Generating Assessment...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Assessment
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Analyzing content and creating questions...
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <h2 className="text-xl font-semibold text-foreground">Generated Assessment</h2>
            </div>
            <Badge variant="secondary">{generatedQuestions.length} questions</Badge>
          </div>

          <div className="space-y-6">
            {generatedQuestions.map((question, index) => (
              <div key={question.id} className="p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {question.type.replace("-", " ")}
                    </Badge>
                    <Badge 
                      variant={question.difficulty === "easy" ? "secondary" : question.difficulty === "medium" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {question.difficulty}
                    </Badge>
                  </div>
                </div>

                <h3 className="font-medium text-foreground mb-3">{question.question}</h3>

                {question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded border ${
                          option === question.correctAnswer
                            ? "border-success bg-success/10"
                            : "border-border bg-background"
                        }`}
                      >
                        <span className="text-sm">{String.fromCharCode(65 + optionIndex)}. {option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="bg-gradient-to-r from-success to-accent hover:from-success/90 hover:to-accent/90">
              Save Assessment
            </Button>
            <Button variant="outline">
              Preview Test
            </Button>
            <Button variant="outline">
              Export Questions
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};