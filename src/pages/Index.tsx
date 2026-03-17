import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("submissions");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTab);
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
