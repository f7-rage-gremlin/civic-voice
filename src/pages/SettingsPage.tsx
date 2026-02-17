import { useState } from "react";
import { Settings } from "@/types";
import { mockUsers } from "@/data/mockData";
import { Eye, EyeOff, Zap, Hand, BarChart3, Equal } from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>({
    privacy: "public",
    votingMode: "manual",
    algorithm: "simple",
  });

  const followedUsers = mockUsers.filter((u) => u.isFollowing);
  const [weights, setWeights] = useState<Record<string, number>>(
    Object.fromEntries(mockUsers.map((u) => [u.id, u.weight]))
  );

  return (
    <div className="pb-20">
      <h1 className="text-3xl mb-8 text-glow">SETTINGS</h1>

      {/* Privacy */}
      <section className="mb-8">
        <h2 className="text-lg mb-4 text-muted-foreground">PRIVACY</h2>
        <div className="space-y-2">
          <SettingOption
            active={settings.privacy === "public"}
            onClick={() => setSettings((s) => ({ ...s, privacy: "public" }))}
            icon={<Eye size={20} />}
            label="PUBLIC"
            description="People can see your votes and follow you"
          />
          <SettingOption
            active={settings.privacy === "private"}
            onClick={() => setSettings((s) => ({ ...s, privacy: "private" }))}
            icon={<EyeOff size={20} />}
            label="PRIVATE"
            description="No one can see your votes or follow you"
          />
        </div>
      </section>

      {/* Voting Mode */}
      <section className="mb-8">
        <h2 className="text-lg mb-4 text-muted-foreground">VOTING</h2>
        <div className="space-y-2">
          <SettingOption
            active={settings.votingMode === "manual"}
            onClick={() => setSettings((s) => ({ ...s, votingMode: "manual" }))}
            icon={<Hand size={20} />}
            label="MANUAL"
            description="Only you can click to vote"
          />
          <SettingOption
            active={settings.votingMode === "automatic"}
            onClick={() => setSettings((s) => ({ ...s, votingMode: "automatic" }))}
            icon={<Zap size={20} />}
            label="AUTOMATIC"
            description="Vote assigned based on people you follow (you can still override)"
          />
        </div>
      </section>

      {/* Algorithm */}
      {settings.votingMode === "automatic" && (
        <section className="mb-8">
          <h2 className="text-lg mb-4 text-muted-foreground">ALGORITHM</h2>
          <div className="space-y-2">
            <SettingOption
              active={settings.algorithm === "simple"}
              onClick={() => setSettings((s) => ({ ...s, algorithm: "simple" }))}
              icon={<Equal size={20} />}
              label="SIMPLE"
              description="Average vote of who you've selected from whom you're following"
            />
            <SettingOption
              active={settings.algorithm === "weighted"}
              onClick={() => setSettings((s) => ({ ...s, algorithm: "weighted" }))}
              icon={<BarChart3 size={20} />}
              label="WEIGHTED"
              description="Weighted average based on influence sliders below"
            />
          </div>

          {settings.algorithm === "weighted" && followedUsers.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground tracking-wider">INFLUENCE WEIGHTS</h3>
              {followedUsers.map((user) => (
                <div key={user.id} className="bg-card border border-border rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase text-sm">{user.name}</span>
                    <span className="font-mono text-primary text-sm font-bold">{(weights[user.id] ?? 0).toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={weights[user.id] ?? 0}
                    onChange={(e) => setWeights((w) => ({ ...w, [user.id]: parseFloat(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

const SettingOption = ({
  active,
  onClick,
  icon,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left bg-card border rounded p-4 flex items-start gap-4 transition-all ${
      active ? "border-primary" : "border-border hover:border-primary/30"
    }`}
  >
    <span className={`mt-0.5 ${active ? "text-primary" : "text-muted-foreground"}`}>{icon}</span>
    <div>
      <span className={`font-bold text-sm tracking-wider ${active ? "text-primary" : "text-foreground"}`}>{label}</span>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  </button>
);

export default SettingsPage;
