"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MessageCircle, 
  ExternalLink, 
  RefreshCcw, 
  Filter 
} from "lucide-react";

// Mock question from your JSON
const mockQuestion = {
  title: "Bodyguard",
  language: "Cpp",
  topic: "Language Knowledge",
  difficulty: "Easy",
  successRate: "55.7%",
  attempts: "1584",
  description: "Observe the code snippet below. Which statement below best describes its behavior?",
  code: `// a.h
int x = 5;

// b.h
#include "a.h"

// main.cpp
#include "a.h"
#include "b.h"

int main()
{
    return x;
}`,
  options: [
    "The program will compile and run successfully, returning 5",
    "Warning only: the compiler warns about duplicate header inclusions but still runs",
    "Runtime error: program crashes when returning x",
    "Compilation error: multiple definition of x"
  ],
  correct_answer: "Compilation error: multiple definition of x"
};

export default function ProblemsPage() {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    if (!user || !selectedOption || isSubmitting) return;

    setIsSubmitting(true);
    const correct = selectedOption === mockQuestion.correct_answer;
    setIsCorrect(correct);

    try {
      // 1. Record the detailed submission history
      await addDoc(collection(db, "user_submissions"), {
        userId: user.uid,
        questionTitle: mockQuestion.title,
        status: correct ? "correct" : "incorrect",
        difficulty: mockQuestion.difficulty,
        topic: mockQuestion.topic,
        language: mockQuestion.language,
        createdAt: serverTimestamp(),
      });

      // 2. Update the aggregate counters on the user document (The "Cheap" way)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "stats.totalCompleted": increment(1),
        "stats.correctCount": correct ? increment(1) : increment(0),
        "stats.incorrectCount": !correct ? increment(1) : increment(0),
        // Track per-language correct counts for the radar chart
        [`stats.languages.${mockQuestion.language}`]: correct ? increment(1) : increment(0),
        // Track per-topic progress
        [`stats.topics.${mockQuestion.topic}`]: correct ? increment(1) : increment(0),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to save progress. Check your console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Top Header Stats */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded border border-blue-500/20 text-xs font-medium">
          <div className="size-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">C</div>
          {mockQuestion.language}
        </div>
        <Badge variant="outline" className="bg-muted/30">Cooked</Badge>
        <Badge variant="outline" className="text-pink-500 border-pink-500/20 bg-pink-500/5">
          {mockQuestion.topic}
        </Badge>
        <Badge variant="outline" className="bg-muted/30">{mockQuestion.successRate} Success rate</Badge>
        <Badge variant="outline" className="bg-muted/30">{mockQuestion.attempts} First attempts</Badge>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-yellow-500">
            <Star className="size-4" />
          </Button>
          <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs border border-green-500/20">
            <ThumbsUp className="size-3" /> 47
          </div>
          <div className="flex items-center gap-1 bg-red-500/10 text-red-600 px-2 py-1 rounded text-xs border border-red-500/20">
            <ThumbsDown className="size-3" /> 0
          </div>
        </div>
      </div>

      {/* Question Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold tracking-tight">{mockQuestion.title}</h1>
        <CheckCircle2 className="size-6 text-green-500" />
      </div>

      <p className="text-lg text-foreground/90">
        {mockQuestion.description}
      </p>

      {/* Code Block */}
      <Card className="bg-muted/40 border-border p-6 rounded-2xl overflow-hidden font-mono text-sm leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {mockQuestion.code.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-muted-foreground w-4 select-none text-right opacity-50">{i + 1}</span>
              <span className={line.startsWith('//') ? 'text-muted-foreground' : line.startsWith('#') ? 'text-blue-500' : ''}>
                {line}
              </span>
            </div>
          ))}
        </pre>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        {mockQuestion.options.map((option) => {
          const isSelected = selectedOption === option;
          let variant: "outline" | "default" = "outline";
          let className = "w-full justify-start text-left h-auto py-4 px-6 rounded-xl transition-all border-border hover:bg-muted/50";
          
          if (isSelected) {
            className += " border-foreground ring-1 ring-foreground";
          }
          
          if (submitted) {
            if (option === mockQuestion.correct_answer) {
              className += " bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 ring-green-500";
            } else if (isSelected && !isCorrect) {
              className += " bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 ring-red-500";
            }
          }

          return (
            <button
              key={option}
              disabled={submitted || isSubmitting}
              onClick={() => setSelectedOption(option)}
              className={className}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4">
        <Button 
          size="lg" 
          disabled={!selectedOption || submitted || isSubmitting}
          onClick={handleSubmit}
          className="rounded-xl px-8"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        
        <Button variant="ghost" className="rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-600">
          I'm Cooked
        </Button>
        
        <Button variant="outline" className="rounded-xl gap-2 bg-muted/20">
          <RefreshCcw className="size-4" /> Random Question
        </Button>
        
        <Button variant="outline" className="rounded-xl gap-2 bg-green-500/5 text-green-600 border-green-500/20">
          <Filter className="size-4" /> Filtered Question
        </Button>

        <Button variant="outline" className="rounded-xl gap-2">
          <MessageCircle className="size-4" /> Comments (1)
        </Button>

        <Button variant="outline" className="rounded-xl gap-2 bg-yellow-500/5 text-yellow-600 border-yellow-500/20 ml-auto">
          <ExternalLink className="size-4" /> Additional resources
        </Button>
      </div>

      {submitted && (
        <div className={`mt-6 p-4 rounded-xl border ${isCorrect ? 'bg-green-500/10 border-green-500 text-green-600' : 'bg-red-500/10 border-red-500 text-red-600'}`}>
          {isCorrect ? "Correct! Submission saved to Firestore." : "Incorrect. Submission saved to Firestore."}
        </div>
      )}
    </div>
  );
}


