import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardHeader } from "@/components/AdminDashboardHeader";
import { NewPatientModal } from '@/components/modals/NewPatientModal';
import { NewAppointmentModal } from '@/components/modals/NewAppointmentModal';
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { staffAPI } from "@/api/api";
import { NewStaffModal } from "@/components/modals/NewStaffModal";
import { StaffFields } from "@/components/StaffFields";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaptionLabel } from "react-day-picker";
import { FieldLabel, FieldLegend } from "@/components/ui/field";


export default function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "RECEPTIONIST" | "COORDINATOR">("RECEPTIONIST");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await staffAPI.register({ username, name, password, role });
      alert("Staff registered");
      setUsername("");
      setName("");
      setPassword("");
    } catch (err) {
      alert("Failed to register");
    }
  }

  const [isNewStaffOpen, setIsNewStaffOpen] = useState(false);
  const handleNewStaff = () => setIsNewStaffOpen(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="admin" setActiveView={() => { }} />
        <div className="container p-6">
          <AdminDashboardHeader onNewStaff={handleNewStaff} />
          <NewStaffModal open={isNewStaffOpen} onOpenChange={setIsNewStaffOpen} />
          <Card className="p-6 ">
            <CardHeader>
              <CardTitle className="tracking-normal">Registrar Novo Acesso Institucional</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <Label htmlFor="sname" className="font-semibold">Nome de exibição:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">Nome de exibição para o novo usuário ( ex.: João da Silva )</FieldLabel>
                  <Input id="sname" placeholder="João da Silva" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <div>
                  <Label htmlFor="susername" className="font-semibold">Nome de acesso:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">Nome de cadastro para acessar à plataforma, nome de login</FieldLabel>
                  <Input id="susername" placeholder="joao@psi" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br />
                <div>
                  <Label htmlFor="spassword" className="font-semibold">Nova senha:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">Defina uma senha para o novo usuário acessar sua instituição</FieldLabel>
                  <Input id="spassword" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <div className="flex items-center gap-2">
                  <Label htmlFor="srole" className="font-semibold">Permissão :</Label>
                  <select id="srole" value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR')} className="select">
                    <option value="RECEPTIONIST">&nbsp;&nbsp;•&nbsp;Recepcionista&nbsp;&nbsp;</option>
                    <option value="COORDINATOR">&nbsp;&nbsp;•&nbsp;Coordenador&nbsp;&nbsp;</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button onClick={handleRegister} disabled={!name}>Registrar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
