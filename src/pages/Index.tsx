import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const pageThemes: Record<string, Record<string, string>> = {
  submissions: {
    "--background": "42 100% 65%",
    "--foreground": "42 60% 10%",
    "--card": "42 30% 97%",
    "--card-foreground": "42 60% 10%",
    "--popover": "42 30% 97%",
    "--popover-foreground": "42 60% 10%",
    "--primary": "38 100% 50%",
    "--primary-foreground": "0 0% 5%",
    "--secondary": "42 50% 90%",
    "--secondary-foreground": "42 50% 15%",
    "--muted": "42 30% 92%",
    "--muted-foreground": "42 20% 40%",
    "--accent": "38 100% 50%",
    "--accent-foreground": "0 0% 5%",
    "--border": "42 20% 92%",
    "--input": "42 30% 95%",
    "--ring": "38 100% 50%",
    "--upvote": "38 100% 45%",
  },
  vote: {
    "--background": "145 65% 55%",
    "--foreground": "145 50% 8%",
    "--card": "145 25% 97%",
    "--card-foreground": "145 50% 8%",
    "--popover": "145 25% 97%",
    "--popover-foreground": "145 50% 8%",
    "--primary": "145 85% 35%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "145 30% 90%",
    "--secondary-foreground": "145 40% 15%",
    "--muted": "145 20% 92%",
    "--muted-foreground": "145 15% 40%",
    "--accent": "145 85% 35%",
    "--accent-foreground": "0 0% 100%",
    "--border": "145 15% 92%",
    "--input": "145 25% 95%",
    "--ring": "145 85% 35%",
    "--upvote": "145 85% 35%",
  },
  follow: {
    "--background": "205 90% 60%",
    "--foreground": "210 60% 8%",
    "--card": "205 40% 97%",
    "--card-foreground": "210 60% 8%",
    "--popover": "205 40% 97%",
    "--popover-foreground": "210 60% 8%",
    "--primary": "210 100% 45%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "205 35% 90%",
    "--secondary-foreground": "210 50% 15%",
    "--muted": "205 25% 92%",
    "--muted-foreground": "210 20% 40%",
    "--accent": "210 100% 45%",
    "--accent-foreground": "0 0% 100%",
    "--border": "205 20% 92%",
    "--input": "205 35% 95%",
    "--ring": "210 100% 45%",
    "--upvote": "210 100% 45%",
  },
  settings: {
    "--background": "0 80% 62%",
    "--foreground": "0 50% 8%",
    "--card": "0 25% 97%",
    "--card-foreground": "0 50% 8%",
    "--popover": "0 25% 97%",
    "--popover-foreground": "0 50% 8%",
    "--primary": "0 85% 50%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "0 30% 90%",
    "--secondary-foreground": "0 40% 15%",
    "--muted": "0 18% 92%",
    "--muted-foreground": "0 15% 42%",
    "--accent": "0 85% 50%",
    "--accent-foreground": "0 0% 100%",
    "--border": "0 15% 92%",
    "--input": "0 25% 95%",
    "--ring": "0 85% 50%",
    "--upvote": "0 85% 50%",
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
