import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const pageThemes: Record<string, Record<string, string>> = {
  submissions: {
    "--background": "45 95% 88%",
    "--foreground": "45 50% 10%",
    "--card": "45 85% 94%",
    "--card-foreground": "45 50% 10%",
    "--popover": "45 85% 94%",
    "--popover-foreground": "45 50% 10%",
    "--primary": "42 100% 50%",
    "--primary-foreground": "0 0% 5%",
    "--secondary": "45 60% 82%",
    "--secondary-foreground": "45 50% 15%",
    "--muted": "45 40% 85%",
    "--muted-foreground": "45 20% 40%",
    "--accent": "42 100% 50%",
    "--accent-foreground": "0 0% 5%",
    "--border": "45 50% 75%",
    "--input": "45 60% 88%",
    "--ring": "42 100% 50%",
    "--upvote": "42 100% 45%",
  },
  vote: {
    "--background": "145 55% 88%",
    "--foreground": "145 40% 10%",
    "--card": "145 45% 94%",
    "--card-foreground": "145 40% 10%",
    "--popover": "145 45% 94%",
    "--popover-foreground": "145 40% 10%",
    "--primary": "145 80% 38%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "145 35% 82%",
    "--secondary-foreground": "145 40% 15%",
    "--muted": "145 25% 85%",
    "--muted-foreground": "145 15% 40%",
    "--accent": "145 80% 38%",
    "--accent-foreground": "0 0% 100%",
    "--border": "145 30% 75%",
    "--input": "145 35% 88%",
    "--ring": "145 80% 38%",
    "--upvote": "145 80% 38%",
  },
  follow: {
    "--background": "205 80% 88%",
    "--foreground": "210 50% 10%",
    "--card": "205 65% 94%",
    "--card-foreground": "210 50% 10%",
    "--popover": "205 65% 94%",
    "--popover-foreground": "210 50% 10%",
    "--primary": "210 100% 50%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "205 45% 82%",
    "--secondary-foreground": "210 50% 15%",
    "--muted": "205 30% 85%",
    "--muted-foreground": "210 20% 40%",
    "--accent": "210 100% 50%",
    "--accent-foreground": "0 0% 100%",
    "--border": "205 40% 75%",
    "--input": "205 50% 88%",
    "--ring": "210 100% 50%",
    "--upvote": "210 100% 50%",
  },
  settings: {
    "--background": "0 65% 90%",
    "--foreground": "0 40% 10%",
    "--card": "0 50% 95%",
    "--card-foreground": "0 40% 10%",
    "--popover": "0 50% 95%",
    "--popover-foreground": "0 40% 10%",
    "--primary": "0 85% 55%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "0 35% 84%",
    "--secondary-foreground": "0 40% 15%",
    "--muted": "0 20% 86%",
    "--muted-foreground": "0 15% 42%",
    "--accent": "0 85% 55%",
    "--accent-foreground": "0 0% 100%",
    "--border": "0 30% 78%",
    "--input": "0 40% 89%",
    "--ring": "0 85% 55%",
    "--upvote": "0 85% 55%",
  },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("submissions");

  useEffect(() => {
    const root = document.documentElement;
    const theme = pageThemes[activeTab];
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-6 w-full">
        {activeTab === "submissions" && <SubmissionsPage />}
        {activeTab === "vote" && <VotePage />}
        {activeTab === "follow" && <FollowPage />}
        {activeTab === "settings" && <SettingsPage />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
