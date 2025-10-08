import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoordinatorDashboardHeader } from "@/components/CoordinatorDashboardHeader";
import { NewPatientModal } from '@/components/NewPatientModal';
import { NewAppointmentModal } from '@/components/NewAppointmentModal';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { patientAPI } from '@/api/api';

type Patient = {
  id: string;
  name: string;
  healthcare?: string;
  age?: number;
};

export default function CoordinatorDashboard(){
  const { data: patients } = useQuery<Patient[]>({ queryKey: ['patients'], queryFn: () => patientAPI.getAll().then(r => r.data) })

  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  const handleNewPatient = () => setIsNewPatientOpen(true);
  const handleNewAppointment = () => setIsNewAppointmentOpen(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="coordinator" setActiveView={() => {}} />
        <div className="container p-6">
          <CoordinatorDashboardHeader onNewPatient={handleNewPatient} onNewAppointment={handleNewAppointment} />
          <NewPatientModal open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen} />
          <NewAppointmentModal open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen} />
          <Card>
            <CardHeader>
              <CardTitle>Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {(patients || []).map((p) => (
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
