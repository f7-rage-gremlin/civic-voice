import { useState } from "react";
import { mockVotableLaws } from "@/data/mockData";
import { VotableLaw } from "@/types";
import CommentThread from "@/components/CommentThread";
import { ArrowLeft, Send, Check, X, Minus } from "lucide-react";

const VotePage = () => {
  const [laws, setLaws] = useState<VotableLaw[]>(mockVotableLaws);
  const [selectedLaw, setSelectedLaw] = useState<VotableLaw | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleVote = (id: string, vote: "yes" | "no" | null) => {
    setLaws((prev) =>
      prev.map((l) => (l.id === id ? { ...l, vote: l.vote === vote ? null : vote } : l))
    );
    if (selectedLaw?.id === id) {
      setSelectedLaw((prev) => prev ? { ...prev, vote: prev.vote === vote ? null : vote } : null);
    }
  };

  if (selectedLaw) {
    return (
      <div className="pb-20">
        <button
          onClick={() => setSelectedLaw(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={18} /> <span className="text-sm font-bold">BACK</span>
        </button>

        <div className="bg-card border border-border rounded p-5">
          <h1 className="text-2xl mb-4">{selectedLaw.title}</h1>
          <p className="text-foreground leading-relaxed">{selectedLaw.description}</p>

          {selectedLaw.bulletPoints.length > 0 && (
            <ul className="mt-4 space-y-2">
              {selectedLaw.bulletPoints.map((bp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <VoteButton
            type="yes"
            active={selectedLaw.vote === "yes"}
            onClick={() => handleVote(selectedLaw.id, "yes")}
          />
          <VoteButton
            type="no"
            active={selectedLaw.vote === "no"}
            onClick={() => handleVote(selectedLaw.id, "no")}
          />
          <VoteButton
            type="abstain"
            active={selectedLaw.vote === null}
            onClick={() => handleVote(selectedLaw.id, null)}
          />
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-sm font-bold text-muted-foreground mb-4 tracking-wider">
            {selectedLaw.comments.length} COMMENTS
          </h3>
          <div className="flex gap-2 mb-6">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-input text-foreground px-4 py-3 rounded border border-border focus:border-primary focus:outline-none"
            />
            <button className="bg-primary text-primary-foreground px-4 py-3 rounded font-bold hover:opacity-90 transition-opacity">
              <Send size={18} />
            </button>
          </div>
          <CommentThread comments={selectedLaw.comments} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl mb-6 text-glow">VOTE!</h1>

      <div className="space-y-3">
        {laws.map((law, index) => (
          <div
            key={law.id}
            className="bg-card border border-border rounded p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0" onClick={() => setSelectedLaw(law)}>
              <h3 className="font-bold text-foreground uppercase tracking-wide">{law.title}</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <VoteButton
                type="yes"
                active={law.vote === "yes"}
                onClick={() => handleVote(law.id, "yes")}
                compact
              />
              <VoteButton
                type="no"
                active={law.vote === "no"}
                onClick={() => handleVote(law.id, "no")}
                compact
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VoteButton = ({
  type,
  active,
  onClick,
  compact = false,
}: {
  type: "yes" | "no" | "abstain";
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) => {
  const config = {
    yes: { icon: Check, activeClass: "bg-vote-yes text-background", label: "YES" },
    no: { icon: X, activeClass: "bg-vote-no text-foreground", label: "NO" },
    abstain: { icon: Minus, activeClass: "bg-vote-abstain text-foreground", label: "ABSTAIN" },
  };

  const { icon: Icon, activeClass, label } = config[type];

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex items-center gap-1.5 rounded font-bold text-xs tracking-wider transition-all ${
        compact ? "px-3 py-2" : "px-4 py-2.5"
      } ${active ? activeClass : "bg-secondary text-muted-foreground hover:text-foreground"}`}
    >
      <Icon size={compact ? 14 : 16} strokeWidth={3} />
      {!compact && label}
    </button>
  );
};

export default VotePage;
