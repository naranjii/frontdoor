import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { LogbookView } from "@/components/LogbookView";
import { RegistrationsView } from "@/components/RegistrationsView";
import { CheckInModal } from "@/components/CheckInModal";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("logbook");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case "logbook":
        return <LogbookView />;
      case "registrations":
        return <RegistrationsView />;
      default:
        return <LogbookView />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader onCheckIn={() => setIsCheckInOpen(true)} />
          
          <main className="flex-1 p-6">
            {renderActiveView()}
          </main>
          
          <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
            © 2024 OTWare. All rights reserved.
          </footer>
        </div>
        
        <CheckInModal 
          open={isCheckInOpen} 
          onOpenChange={setIsCheckInOpen} 
        />
      </div>
    </SidebarProvider>
  );
};