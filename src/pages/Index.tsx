import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const pageThemes: Record<string, Record<string, string>> = {
  submissions: {
    "--background": "42 85% 72%",
    "--foreground": "30 80% 12%",
    "--card": "42 30% 97%",
    "--card-foreground": "30 80% 12%",
    "--popover": "42 30% 97%",
    "--popover-foreground": "30 80% 12%",
    "--primary": "38 100% 50%",
    "--primary-foreground": "0 0% 5%",
    "--secondary": "42 50% 90%",
    "--secondary-foreground": "42 50% 15%",
    "--muted": "42 30% 92%",
    "--muted-foreground": "30 40% 30%",
    "--accent": "38 100% 50%",
    "--accent-foreground": "0 0% 5%",
    "--accent-secondary": "18 90% 55%",
    "--accent-secondary-foreground": "0 0% 100%",
    "--accent-tertiary": "190 70% 45%",
    "--accent-tertiary-foreground": "0 0% 100%",
    "--border": "42 20% 82%",
    "--input": "42 30% 95%",
    "--ring": "38 100% 50%",
    "--upvote": "38 100% 45%",
  },
  vote: {
    "--background": "130 60% 62%",
    "--foreground": "130 70% 10%",
    "--card": "130 25% 97%",
    "--card-foreground": "130 70% 10%",
    "--popover": "130 25% 97%",
    "--popover-foreground": "130 70% 10%",
    "--primary": "130 75% 38%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "130 30% 90%",
    "--secondary-foreground": "130 40% 15%",
    "--muted": "130 20% 92%",
    "--muted-foreground": "130 30% 30%",
    "--accent": "130 75% 38%",
    "--accent-foreground": "0 0% 100%",
    "--accent-secondary": "45 85% 55%",
    "--accent-secondary-foreground": "0 0% 10%",
    "--accent-tertiary": "270 50% 55%",
    "--accent-tertiary-foreground": "0 0% 100%",
    "--border": "130 15% 82%",
    "--input": "130 25% 95%",
    "--ring": "130 75% 38%",
    "--upvote": "130 75% 38%",
    "--vote-yes": "130 75% 38%",
  },
  follow: {
    "--background": "205 80% 65%",
    "--foreground": "215 70% 10%",
    "--card": "205 40% 97%",
    "--card-foreground": "215 70% 10%",
    "--popover": "205 40% 97%",
    "--popover-foreground": "215 70% 10%",
    "--primary": "210 90% 50%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "205 35% 90%",
    "--secondary-foreground": "210 50% 15%",
    "--muted": "205 25% 92%",
    "--muted-foreground": "215 30% 30%",
    "--accent": "210 90% 50%",
    "--accent-foreground": "0 0% 100%",
    "--accent-secondary": "170 60% 45%",
    "--accent-secondary-foreground": "0 0% 100%",
    "--accent-tertiary": "30 80% 55%",
    "--accent-tertiary-foreground": "0 0% 10%",
    "--border": "205 20% 82%",
    "--input": "205 35% 95%",
    "--ring": "210 90% 50%",
    "--upvote": "210 90% 50%",
  },
  settings: {
    "--background": "0 70% 67%",
    "--foreground": "0 60% 10%",
    "--card": "0 25% 97%",
    "--card-foreground": "0 60% 10%",
    "--popover": "0 25% 97%",
    "--popover-foreground": "0 60% 10%",
    "--primary": "0 80% 52%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "0 30% 90%",
    "--secondary-foreground": "0 40% 15%",
    "--muted": "0 18% 92%",
    "--muted-foreground": "0 30% 32%",
    "--accent": "0 80% 52%",
    "--accent-foreground": "0 0% 100%",
    "--accent-secondary": "330 65% 55%",
    "--accent-secondary-foreground": "0 0% 100%",
    "--accent-tertiary": "175 55% 45%",
    "--accent-tertiary-foreground": "0 0% 100%",
    "--border": "0 15% 82%",
    "--input": "0 25% 95%",
    "--ring": "0 80% 52%",
    "--upvote": "0 80% 52%",
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
