import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Calendar } from "lucide-react";

interface AdminHeaderProps {
  onNewStaff: () => void;
}

export const AdminDashboardHeader = ({ onNewStaff }: AdminHeaderProps) => {
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
              <h1 className="text-xl font-semibold text-foreground">Painel Administrador</h1>
              <p className="text-sm text-muted-foreground">Gestor de acesso institucional</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onNewStaff} className="h-12 px-4 rounded-md bg-gradient-primary text-primary-foreground font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Novo Funcionário
          </Button>
        </div>
      </div>
    </header>
  );
};
