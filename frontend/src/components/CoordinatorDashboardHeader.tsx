import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Calendar } from "lucide-react";

interface CoordinatorHeaderProps {
  onNewPatient: () => void;
  onNewAppointment: () => void;
}

export const CoordinatorDashboardHeader = ({ onNewPatient, onNewAppointment }: CoordinatorHeaderProps) => {
  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted transition-smooth" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Painel do Coordenador</h1>
              <p className="text-sm text-muted-foreground">Gestão de pacientes e agendamentos</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onNewPatient} className="h-12 px-4 rounded-md bg-gradient-primary text-primary-foreground font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
          <Button onClick={onNewAppointment} className="h-12 px-4 rounded-md bg-gradient-secondary text-primary-foreground font-semibold">
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>
    </header>
  );
};
