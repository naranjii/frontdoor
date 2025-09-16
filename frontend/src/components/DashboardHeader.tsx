import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserPlus, Settings } from "lucide-react";

interface DashboardHeaderProps {
  onCheckIn: () => void;
}

export const DashboardHeader = ({ onCheckIn }: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted transition-smooth" />
          
          <div className="flex items-center gap-3">
            {/* Customizable logo area */}
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Front Desk Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage check-ins and registrations</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onCheckIn}
            className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 font-medium px-6"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Check In
          </Button>
          
          <Button variant="outline" size="icon" className="transition-smooth">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};