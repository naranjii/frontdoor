import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardHeader } from "@/components/AdminDashboardHeader";
import { useEffect, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { staffAPI } from "@/api/api";
import { NewStaffModal } from "@/components/modals/NewStaffModal";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Staff = {
  id: string;
  name: string;
  username: string;
  role: ('ADMIN' | 'RECEPTIONIST' | 'COORDINATOR');
  isActive?: boolean;
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "RECEPTIONIST" | "COORDINATOR">("RECEPTIONIST");

  const [editingStaff, setEditingStaff] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState<"RECEPTIONIST" | "COORDINATOR" | "ADMIN">("RECEPTIONIST");

  // ✅ Fetch all staff from API
  const { data: staff = [], isLoading } = useQuery<Staff[]>({
    queryKey: ['staff'],
    queryFn: async () => {
    const res = await staffAPI.getAll();
    return res.filter((s) => s.isActive !== false);
  },
  });

  console.log('staff data:', staff);

  // ✅ Delete staff using API
  async function handleDelete(id: string) {
    if (!confirm("Desativar este acesso?")) return;
    try {
      await staffAPI.deactivate(id);
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    } catch {
      alert("Failed to delete");
    }
  }

  // ✅ Update staff using API
  async function handleUpdate(id: string) {
    try {
      await staffAPI.update(id, { name: editName, role: editRole });
      setEditingStaff(null);
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    } catch {
      alert("Failed to update");
    }
  }

  // ✅ Register new staff
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await staffAPI.register({ username, name, password, role });
      alert("Staff registered");
      setUsername("");
      setName("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    } catch {
      alert("Failed to register");
    }
  }

  const [isNewStaffOpen, setIsNewStaffOpen] = useState(false);
  const handleNewStaff = () => setIsNewStaffOpen(true);

  if (isLoading) return <div className="p-6 tracking-wider">Carregando ...</div>;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="admin" setActiveView={() => { }} />
        <div className="container p-6">
          <AdminDashboardHeader onNewStaff={handleNewStaff} />
          <NewStaffModal open={isNewStaffOpen} onOpenChange={setIsNewStaffOpen} />

          {/* Register Form */}
          <Card className="mt-3 p-6">
            <CardHeader>
              <CardTitle className="tracking-normal">Registrar Novo Acesso Institucional</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister}>
                <div>
                  <Label htmlFor="sname" className="font-semibold">Nome de exibição:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">
                    Nome de exibição para o novo usuário ( ex.: João da Silva )
                  </FieldLabel>
                  <Input id="sname" placeholder="João da Silva" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <div>
                  <Label htmlFor="susername" className="font-semibold">Nome de acesso:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">
                    Nome de login para acessar à plataforma
                  </FieldLabel>
                  <Input id="susername" placeholder="joao@psi" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br />
                <div>
                  <Label htmlFor="spassword" className="font-semibold">Nova senha:</Label>
                  <FieldLabel className="text-muted-foreground font-normal">
                    Defina uma senha para o novo usuário
                  </FieldLabel>
                  <Input id="spassword" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <div className="flex items-center gap-2">
                  <Label htmlFor="srole" className="font-semibold">Permissão:</Label>
                  <select id="srole" value={role} onChange={(e) => setRole(e.target.value as ("RECEPTIONIST" | "COORDINATOR" | "ADMIN"))} className="select">
                    <option value="RECEPTIONIST">Recepcionista</option>
                    <option value="COORDINATOR">Coordenador</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="submit" disabled={!name}>Registrar</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Staff List */}
          <Card className="mt-3 p-6">
            <CardHeader>
              <CardTitle className="tracking-normal">Gerenciar Acessos à sua Instituição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-4">
                {staff.map((s) => (
                  <Card key={s.id} className="p-4 flex justify-between items-center">
                    <CardHeader>
                      <CardTitle>{s.name}</CardTitle>
                    </CardHeader>
                    {editingStaff === s.id ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Nome"
                        />
                        <select
                          value={editRole}
                          onChange={(e) =>
                            setEditRole(e.target.value as "RECEPTIONIST" | "COORDINATOR" | "ADMIN")
                          }
                          className="select"
                        >
                          <option value="RECEPTIONIST">Recepcionista</option>
                          <option value="COORDINATOR">Coordenador</option>
                          <option value="ADMIN">Administrador</option>
                        </select>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdate(s.id)}>Salvar</Button>
                          <Button variant="outline" onClick={() => setEditingStaff(null)}>Cancelar</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <div className="font-semibold">{s.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {s.username} — {s.role}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingStaff(s.id);
                              setEditName(s.name);
                              setEditRole(s.role);
                            }}
                          >
                            Editar Acesso
                          </Button>
                          <Button variant="destructive" onClick={() => handleDelete(s.id)}>
                            Desativar Acesso
                          </Button>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
