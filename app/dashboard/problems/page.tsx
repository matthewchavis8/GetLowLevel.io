"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/config";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  getDoc,
  arrayUnion 
} from "firebase/firestore";
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
      console.log("Starting submission process...");
      
      // 1. Record the detailed submission history
      const submissionRef = await addDoc(collection(db, "user_submissions"), {
        userId: user.uid,
        questionTitle: mockQuestion.title,
        status: correct ? "correct" : "incorrect",
        difficulty: mockQuestion.difficulty,
        topic: mockQuestion.topic,
        language: mockQuestion.language,
        createdAt: serverTimestamp(),
      });
      console.log("Submission recorded with ID:", submissionRef.id);

      // 2. Check if this is the first time they've solved this question
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      console.log("Current user data:", userData);
      
      const completedQuestions = userData?.completedQuestions || [];
      const isFirstTimeCorrect = correct && !completedQuestions.includes(mockQuestion.title);
      console.log("Is first time correct?", isFirstTimeCorrect);

      // 3. Ensure stats structure exists first
      const currentStats = userData?.stats || {};
      console.log("Current stats:", currentStats);
      
      if (!userData?.stats || !currentStats.languages || !currentStats.topics) {
        console.log("Initializing stats structure...");
        await updateDoc(userRef, {
          stats: {
            totalCompleted: currentStats.totalCompleted || 0,
            correctCount: currentStats.correctCount || 0,
            incorrectCount: currentStats.incorrectCount || 0,
            languages: currentStats.languages || {},
            topics: currentStats.topics || {}
          }
        });
        console.log("Stats structure initialized");
      }

      // 4. Update the aggregate counters using increments
      const updates: any = {};
      
      // Track incorrect attempts (every wrong answer counts)
      if (!correct) {
        updates["stats.incorrectCount"] = increment(1);
      }

      // Only increment correct count, totalCompleted, languages, and topics if this is their first time solving this question correctly
      if (isFirstTimeCorrect) {
        updates["stats.correctCount"] = increment(1);
        updates["stats.totalCompleted"] = increment(1);
        updates["completedQuestions"] = arrayUnion(mockQuestion.title);
        
        // Track unique questions per language
        if (mockQuestion.language && mockQuestion.language !== null) {
          updates[`stats.languages.${mockQuestion.language}`] = increment(1);
        }
        
        // Track unique questions per topic
        if (mockQuestion.topic && mockQuestion.topic !== null) {
          updates[`stats.topics.${mockQuestion.topic}`] = increment(1);
        }
      }

      console.log("Updates to apply:", Object.keys(updates));

      if (Object.keys(updates).length > 0) {
        await updateDoc(userRef, updates);
        console.log("Update successful!");
        
        // Verify the update was successful
        const verifyDoc = await getDoc(userRef);
        const verifyData = verifyDoc.data();
        console.log("Stats after update:", verifyData?.stats);
        console.log("Completed questions:", verifyData?.completedQuestions);
      }

      setSubmitted(true);
      console.log("Submission complete!");
    } catch (error: any) {
      console.error("Error submitting answer:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      alert(`Failed to save progress: ${error?.message || "Unknown error"}. Check your console for details.`);
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


