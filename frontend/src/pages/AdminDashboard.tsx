import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";
import { staffAPI } from "@/api/api";

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="admin" setActiveView={() => {}} />
        <div className="container p-6">
          <DashboardHeader onCheckIn={() => {}} />
          <Card>
            <CardHeader>
              <CardTitle>Register Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-3">
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
                <select value={role} onChange={e => setRole(e.target.value as "ADMIN" | "RECEPTIONIST" | "COORDINATOR")} className="select">
                  <option value="ADMIN">Admin</option>
                  <option value="RECEPTIONIST">Receptionist</option>
                  <option value="COORDINATOR">Coordinator</option>
                </select>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
