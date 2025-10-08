import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoordinatorDashboardHeader } from "@/components/CoordinatorDashboardHeader";
import { NewPatientModal } from '@/components/NewPatientModal';
import { NewAppointmentModal } from '@/components/NewAppointmentModal';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { patientAPI } from '@/api/api';
import { EditPatientModal } from '@/components/EditPatientModal';
import { ShowPatientModal } from '@/components/ShowPatientModal';

type Patient = {
  id: string;
  name: string;
  healthcare?: string;
  age?: number;
  patientCode?: number;
  supportLevel?: number;
  driveLink?: string;
  notes?: string;
};

export default function CoordinatorDashboard(){
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSupport, setFilterSupport] = useState<number | undefined>(undefined);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>(undefined);
  const [showingPatient, setShowingPatient] = useState<Patient | undefined>(undefined);

  const queryClient = useQueryClient();

  const { data: patients } = useQuery<Patient[]>({ queryKey: ['patients', search, filterSupport], queryFn: () => patientAPI.getAll(search ? { name: search, supportLevel: filterSupport } : {}).then(r => r.data) })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => patientAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this patient?')) return;
    await deleteMutation.mutateAsync(id);
  };

  const patientList = useMemo(() => (patients || []), [patients]);

  const handleEditSaved = () => {
    queryClient.invalidateQueries({ queryKey: ['patients'] });
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar activeView="coordinator" setActiveView={() => {}} />
        <div className="container p-6">
          <CoordinatorDashboardHeader onNewPatient={() => setIsNewPatientOpen(true)} onNewAppointment={() => setIsNewAppointmentOpen(true)} />
          <NewPatientModal open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen} />
          <NewAppointmentModal open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen} />
          <EditPatientModal open={!!editingPatient} onOpenChange={() => setEditingPatient(undefined)} patient={editingPatient} onSaved={handleEditSaved} />
          <ShowPatientModal open={!!showingPatient} onOpenChange={() => setShowingPatient(undefined)} patient={showingPatient} />

          <div className="mb-4 flex items-center gap-3">
            <input className="input max-w-sm" placeholder="Search patients" value={search} onChange={e => setSearch(e.target.value)} />
            <input className="input w-36" placeholder="Support Level" type="number" value={filterSupport ?? ''} onChange={e => setFilterSupport(e.target.value ? Number(e.target.value) : undefined)} />
          </div>

          <div className="grid gap-4">
            {patientList.map(p => (
              <Card key={p.id} className="transition-smooth hover:shadow-soft">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{p.healthcare ?? '—'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setShowingPatient(p)}>SHOW + INFO</Button>
                    <Button onClick={() => setEditingPatient(p)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div><strong>Idade</strong><div>{p.age ?? '-'}</div></div>
                    <div><strong>Nível de Suporte</strong><div>{p.supportLevel ?? '-'}</div></div>
                    <div><strong>Código</strong><div>{p.patientCode ?? '-'}</div></div>
                    <div><strong>Drive Link</strong><div>{p.driveLink ? 'Available' : '-'}</div></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
