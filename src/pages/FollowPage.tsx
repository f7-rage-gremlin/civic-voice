import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { UserProfile } from "@/types";
import VoteControl from "@/components/VoteControl";
import { ArrowLeft, Search, UserPlus, UserCheck, Check, X, MessageSquare } from "lucide-react";

const FollowPage = () => {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [profileTab, setProfileTab] = useState<"posts" | "comments" | "voting">("posts");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFollow = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isFollowing: !u.isFollowing, isActive: !u.isFollowing ? u.isActive : false } : u))
    );
    if (selectedUser?.id === id) {
      setSelectedUser((prev) => prev ? { ...prev, isFollowing: !prev.isFollowing } : null);
    }
  };

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  if (selectedUser) {
    return (
      <div className="pb-20">
        <button
          onClick={() => setSelectedUser(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={18} /> <span className="text-sm font-bold">BACK</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl">{selectedUser.name}</h1>
            <p className="text-sm text-muted-foreground">@{selectedUser.handle}</p>
          </div>
          <button
            onClick={() => toggleFollow(selectedUser.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              selectedUser.isFollowing
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {selectedUser.isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
            {selectedUser.isFollowing ? "FOLLOWING" : "FOLLOW"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {(["posts", "comments", "voting"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setProfileTab(tab)}
              className={`flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${
                profileTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab} HISTORY
            </button>
          ))}
        </div>

        {profileTab === "posts" && (
          <div className="space-y-4">
            {selectedUser.posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No posts yet</p>
            ) : (
              selectedUser.posts.map((post) => (
                <div key={post.id} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <VoteControl upvotes={post.upvotes} downvotes={post.downvotes} userVote={post.userVote} onVote={() => {}} size="sm" />
                  <div>
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {profileTab === "comments" && (
          <div className="space-y-4">
            {selectedUser.commentHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No comments yet</p>
            ) : (
              selectedUser.commentHistory.map((comment) => (
                <div key={comment.id} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm">{comment.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">↑ {comment.upvotes}</p>
                </div>
              ))
            )}
          </div>
        )}

        {profileTab === "voting" && (
          <div className="space-y-4">
            {selectedUser.votingHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No voting history</p>
            ) : (
              selectedUser.votingHistory.map((vh, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                  <span className="font-bold uppercase text-sm">{vh.lawTitle}</span>
                  <span className={`flex items-center gap-1 text-xs font-bold ${vh.vote === "yes" ? "text-vote-yes" : "text-vote-no"}`}>
                    {vh.vote === "yes" ? <Check size={14} /> : <X size={14} />}
                    {vh.vote.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl mb-6 text-glow">FOLLOW</h1>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search people..."
          className="w-full bg-input text-foreground pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div
              className="flex-1 min-w-0"
              onClick={() => setSelectedUser(user)}
            >
              <h3 className="font-bold uppercase">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.handle}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFollow(user.id); }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-xs tracking-wider transition-all ${
                user.isFollowing
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {user.isFollowing ? <UserCheck size={14} /> : <UserPlus size={14} />}
              {user.isFollowing ? "FOLLOWING" : "FOLLOW"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowPage;
