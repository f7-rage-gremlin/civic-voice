import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import SubmissionsPage from "@/pages/SubmissionsPage";
import VotePage from "@/pages/VotePage";
import FollowPage from "@/pages/FollowPage";
import SettingsPage from "@/pages/SettingsPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("submissions");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pt-24 pb-6">
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
