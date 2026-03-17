import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const pageThemes = {
  submissions: {
    "--background": "48 90% 92%",
    "--card": "48 80% 96%",
    "--popover": "48 80% 96%",
    "--primary": "45 100% 50%",
    "--secondary": "48 40% 85%",
    "--muted": "48 30% 88%",
    "--accent": "45 100% 50%",
    "--border": "45 30% 78%",
    "--input": "48 40% 90%",
    "--ring": "45 100% 50%",
    "--upvote": "45 100% 45%",
  },
  vote: {
    "--background": "142 40% 92%",
    "--card": "142 35% 96%",
    "--popover": "142 35% 96%",
    "--primary": "142 71% 40%",
    "--secondary": "142 20% 85%",
    "--muted": "142 15% 88%",
    "--accent": "142 71% 40%",
    "--border": "142 20% 78%",
    "--input": "142 20% 90%",
    "--ring": "142 71% 40%",
    "--upvote": "142 71% 40%",
  },
  follow: {
    "--background": "210 60% 92%",
    "--card": "210 50% 96%",
    "--popover": "210 50% 96%",
    "--primary": "210 100% 50%",
    "--secondary": "210 30% 85%",
    "--muted": "210 20% 88%",
    "--accent": "210 100% 50%",
    "--border": "210 25% 78%",
    "--input": "210 30% 90%",
    "--ring": "210 100% 50%",
    "--upvote": "210 100% 50%",
  },
  settings: {
    "--background": "0 50% 93%",
    "--card": "0 40% 96%",
    "--popover": "0 40% 96%",
    "--primary": "0 72% 51%",
    "--secondary": "0 25% 86%",
    "--muted": "0 15% 88%",
    "--accent": "0 72% 51%",
    "--border": "0 20% 80%",
    "--input": "0 25% 91%",
    "--ring": "0 72% 51%",
    "--upvote": "0 72% 51%",
  },
} as const;

const Index = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof pageThemes>("submissions");

  return (
    <div
      className="min-h-screen bg-background transition-colors duration-300"
      style={pageThemes[activeTab] as React.CSSProperties}
    >
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-6 w-full">
        {activeTab === "submissions" && <SubmissionsPage />}
        {activeTab === "vote" && <VotePage />}
        {activeTab === "follow" && <FollowPage />}
        {activeTab === "settings" && <SettingsPage />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as keyof typeof pageThemes)} />
    </div>
  );
};

export default Index;
