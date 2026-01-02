"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface LeaderboardUser {
  rank: number;
  uid: string;
  username: string;
  avatar?: string;
  correct: number;
  incorrect: number;
  successRate: number;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = collection(db, "users");
        
        // Fetch all users and sort client-side to avoid index requirements
        const querySnapshot = await getDocs(usersRef);

        const users: LeaderboardUser[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          const correct = data.stats?.correctCount || 0;
          const incorrect = data.stats?.incorrectCount || 0;
          const total = correct + incorrect;
          
          const successRate = total > 0 ? (correct / total) * 100 : 0;
          
          // Score calculation: correct answers weighted by success rate
          const score = Math.round(correct * (1 + successRate / 100));

          users.push({
            rank: 0, // Will be assigned after sorting
            uid: doc.id,
            username: data.displayName || data.email?.split("@")[0] || "Anonymous",
            avatar: data.photoURL,
            correct,
            incorrect,
            successRate: Math.round(successRate * 100) / 100,
            score,
          });
        });

        // Sort by score descending and assign ranks
        users.sort((a, b) => b.score - a.score);
        users.forEach((user, index) => {
          user.rank = index + 1;
        });

        // Limit to top 20
        const topUsers = users.slice(0, 20);
        setLeaderboardData(topUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Reorder for podium display: 2nd, 1st, 3rd
  const topThreeData = leaderboardData.slice(0, 3);
  const topThree = topThreeData.length >= 3 
    ? [topThreeData[1], topThreeData[0], topThreeData[2]] 
    : topThreeData.length === 2 
      ? [topThreeData[1], topThreeData[0]] 
      : topThreeData;
  const restOfUsers = leaderboardData.slice(3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold">No Users Yet</p>
          <p className="text-muted-foreground">Be the first to join and compete!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground max-w-2xl">
          Celebrate our most consistent members and see how you stack up against the community.
        </p>
      </div>

      {/* Top 3 Users - Podium Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {topThree.map((user, index) => {
          // Map rank to style (1st place = gold, 2nd = silver, 3rd = bronze)
          const rankStyleMap: { [key: number]: any } = {
            1: {
              accent: "border-yellow-500/30",
              badge: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-500/20"
            }, // 1st place - gold
            2: {
              accent: "border-gray-400/30",
              badge: "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-500/20"
            }, // 2nd place - silver
            3: {
              accent: "border-orange-500/30",
              badge: "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/20"
            }  // 3rd place - bronze
          };

          const style = rankStyleMap[user.rank];
          const isFirstPlace = user.rank === 1;
          
          return (
            <Card 
              key={user.rank} 
              className={`glass-card ${style.accent} ${isFirstPlace ? 'md:scale-110 md:-translate-y-4' : ''} transition-all duration-300 hover:border-primary/40`}
            >
              <CardContent className="flex flex-col items-center p-6 space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  {/* Rank badge */}
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${style.badge} border-4 border-background flex items-center justify-center font-black text-xl`}>
                    {user.rank}
                  </div>
                </div>

                {/* Username */}
                <div className="text-center pt-2">
                  <h3 className="text-xl font-bold">{user.username}</h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Correct</p>
                    <p className="text-lg font-bold">{user.correct}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Incorrect</p>
                    <p className="text-lg font-bold text-muted-foreground">{user.incorrect}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                    <p className="text-lg font-bold">{user.successRate}%</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Score</p>
                    <p className="text-lg font-bold text-primary">{user.score}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rest of the leaderboard */}
      <div className="space-y-3 max-w-6xl mx-auto">
        {restOfUsers.map((user) => (
          <Card 
            key={user.rank} 
            className="glass-card hover:border-primary/30 transition-all duration-200"
          >
            <CardContent className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                {/* Rank + Avatar + Username */}
                <div className="flex items-center gap-4 col-span-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-semibold text-lg">
                    {user.rank}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{user.username}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Correct</p>
                  <p className="text-lg font-semibold">{user.correct}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Incorrect</p>
                  <p className="text-lg font-semibold text-muted-foreground">{user.incorrect}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                  <p className="text-lg font-semibold">{user.successRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Score</p>
                  <p className="text-lg font-semibold text-primary">{user.score}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


