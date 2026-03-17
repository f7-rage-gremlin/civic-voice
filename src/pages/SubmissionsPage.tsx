import { useState } from "react";
import { mockSubmissions } from "@/data/mockData";
import { LawSubmission } from "@/types";
import VoteControl from "@/components/VoteControl";
import CommentThread from "@/components/CommentThread";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<LawSubmission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<LawSubmission | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleVote = (id: string, vote: "up" | "down") => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.userVote === vote) {
          return { ...s, userVote: null, upvotes: vote === "up" ? s.upvotes - 1 : s.upvotes, downvotes: vote === "down" ? s.downvotes - 1 : s.downvotes };
        }
        return {
          ...s,
          userVote: vote,
          upvotes: vote === "up" ? s.upvotes + 1 + (s.userVote === "down" ? 0 : 0) : s.upvotes - (s.userVote === "up" ? 1 : 0),
          downvotes: vote === "down" ? s.downvotes + 1 : s.downvotes - (s.userVote === "down" ? 1 : 0),
        };
      })
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) => {
        if (!prev) return null;
        if (prev.userVote === vote) {
          return { ...prev, userVote: null, upvotes: vote === "up" ? prev.upvotes - 1 : prev.upvotes, downvotes: vote === "down" ? prev.downvotes - 1 : prev.downvotes };
        }
        return {
          ...prev,
          userVote: vote,
          upvotes: vote === "up" ? prev.upvotes + 1 : prev.upvotes - (prev.userVote === "up" ? 1 : 0),
          downvotes: vote === "down" ? prev.downvotes + 1 : prev.downvotes - (prev.userVote === "down" ? 1 : 0),
        };
      });
    }
  };

  const handleSubmit = () => {
    if (!newTitle.trim()) return;
    const submission: LawSubmission = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      author: "You",
      upvotes: 1,
      downvotes: 0,
      userVote: "up",
      comments: [],
      createdAt: "Just now",
    };
    setSubmissions((prev) => [submission, ...prev]);
    setNewTitle("");
    setNewDescription("");
  };

  if (selectedSubmission) {
    return (
      <div className="pb-20">
        <button
          onClick={() => setSelectedSubmission(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={18} /> <span className="text-sm font-bold">BACK</span>
        </button>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex gap-4">
            <VoteControl
              upvotes={selectedSubmission.upvotes}
              downvotes={selectedSubmission.downvotes}
              userVote={selectedSubmission.userVote}
              onVote={(vote) => handleVote(selectedSubmission.id, vote)}
            />
            <div className="flex-1">
              <h1 className="text-2xl mb-2">{selectedSubmission.title}</h1>
              <p className="text-sm text-muted-foreground mb-1">
                Posted by <span className="text-primary">@{selectedSubmission.author}</span> · {selectedSubmission.createdAt}
              </p>
              <p className="text-foreground leading-relaxed mt-4">{selectedSubmission.description}</p>
              {selectedSubmission.bulletPoints && (
                <ul className="mt-4 space-y-2">
                  {selectedSubmission.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-sm font-bold text-muted-foreground mb-4 tracking-wider">
            {selectedSubmission.comments.length} COMMENTS
          </h3>
          <div className="flex gap-2 mb-6">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none"
            />
            <button className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              <Send size={18} />
            </button>
          </div>
          <CommentThread comments={selectedSubmission.comments} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl mb-6 text-glow">LAW SUBMISSIONS</h1>

      {/* Submit form */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title of your law submission..."
          className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none mb-3 font-bold"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Describe your proposed law..."
          rows={3}
          className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none mb-3 resize-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold text-sm tracking-wider hover:opacity-90 transition-opacity w-full"
        >
          SUBMIT
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-2">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            onClick={() => setSelectedSubmission(submission)}
            className="bg-card border border-border rounded p-4 flex gap-4 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <VoteControl
              upvotes={submission.upvotes}
              downvotes={submission.downvotes}
              userVote={submission.userVote}
              onVote={(vote) => handleVote(submission.id, vote)}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-lg leading-tight">{submission.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{submission.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>@{submission.author}</span>
                <span>·</span>
                <span>{submission.createdAt}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><MessageSquare size={12} /> {submission.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsPage;
