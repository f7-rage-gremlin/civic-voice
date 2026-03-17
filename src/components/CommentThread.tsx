import { useState } from "react";
import { Comment } from "@/types";
import VoteControl from "./VoteControl";
import { MessageSquare } from "lucide-react";

interface CommentThreadProps {
  comments: Comment[];
  depth?: number;
}

const CommentThread = ({ comments, depth = 0 }: CommentThreadProps) => {
  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={depth} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment, depth }: { comment: Comment; depth: number }) => {
  const [currentComment, setCurrentComment] = useState(comment);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleVote = (vote: "up" | "down") => {
    setCurrentComment((prev) => {
      if (prev.userVote === vote) {
        return { ...prev, userVote: null, upvotes: vote === "up" ? prev.upvotes - 1 : prev.upvotes, downvotes: vote === "down" ? prev.downvotes - 1 : prev.downvotes };
      }
      return {
        ...prev,
        userVote: vote,
        upvotes: vote === "up" ? prev.upvotes + 1 + (prev.userVote === "down" ? 0 : 0) : prev.upvotes - (prev.userVote === "up" ? 1 : 0),
        downvotes: vote === "down" ? prev.downvotes + 1 : prev.downvotes - (prev.userVote === "down" ? 1 : 0),
      };
    });
  };

  return (
    <div className="py-2">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-3">
          <VoteControl
            upvotes={currentComment.upvotes}
            downvotes={currentComment.downvotes}
            userVote={currentComment.userVote}
            onVote={handleVote}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-primary">@{currentComment.author}</span>
              <span className="text-xs text-muted-foreground">{currentComment.createdAt}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{currentComment.text}</p>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare size={12} /> Reply
            </button>
            {showReplyInput && (
              <div className="mt-2 flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 bg-input text-foreground text-sm px-3 py-2 rounded-lg border border-border focus:border-primary focus:outline-none"
                />
                <button
                  onClick={() => { setReplyText(""); setShowReplyInput(false); }}
                  className="bg-primary text-primary-foreground text-sm px-3 py-2 rounded font-bold hover:opacity-90 transition-opacity"
                >
                  POST
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {currentComment.replies.length > 0 && (
        <CommentThread comments={currentComment.replies} depth={depth + 1} />
      )}
    </div>
  );
};

export default CommentThread;
