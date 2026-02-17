import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteControlProps {
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
  onVote: (vote: "up" | "down") => void;
  size?: "sm" | "md";
}

const VoteControl = ({ upvotes, downvotes, userVote, onVote, size = "md" }: VoteControlProps) => {
  const score = upvotes - downvotes;
  const iconSize = size === "sm" ? 16 : 22;

  const formatScore = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <div className="flex flex-col items-center gap-0.5 select-none">
      <button
        onClick={(e) => { e.stopPropagation(); onVote("up"); }}
        className={`p-1 transition-colors rounded hover:bg-secondary ${userVote === "up" ? "text-upvote" : "text-muted-foreground hover:text-foreground"}`}
      >
        <ChevronUp size={iconSize} strokeWidth={3} />
      </button>
      <span className={`font-mono text-sm font-bold ${userVote === "up" ? "text-upvote" : userVote === "down" ? "text-downvote" : "text-foreground"}`}>
        {formatScore(score)}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onVote("down"); }}
        className={`p-1 transition-colors rounded hover:bg-secondary ${userVote === "down" ? "text-downvote" : "text-muted-foreground hover:text-foreground"}`}
      >
        <ChevronDown size={iconSize} strokeWidth={3} />
      </button>
    </div>
  );
};

export default VoteControl;
