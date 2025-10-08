import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery } from '@tanstack/react-query';
import { patientAPI } from '@/api/api';

export default function CoordinatorDashboard(){
  const { data: patients } = useQuery({ queryKey: ['patients'], queryFn: () => patientAPI.getAll().then(r => r.data) })

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="coordinator" setActiveView={() => {}} />
        <div className="container p-6">
          <DashboardHeader onCheckIn={() => {}} />
          <Card>
            <CardHeader>
              <CardTitle>Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {((patients || []) as any[]).map((p: any) => (
                  <li key={p.id}>{p.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}
