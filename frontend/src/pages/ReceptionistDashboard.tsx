import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Clock,

} from "lucide-react"
import { ReceptionModal } from "@/components/modals/ReceptionModal"
import { ReceptionistDashboardHeader } from "@/components/ReceptionistDashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ReceptionTabs } from "@/components/ReceptionTabs"
import { useQuery } from '@tanstack/react-query'
import { patientAPI, logbookAPI, appointmentAPI } from '@/api/api'

type Patient = { id: string; name: string; checked?: boolean; healthcare?: string };
type Logbook = { id: string; checkIn: string };
type Appointment = { id: string; appointmentAt: string };

export default function ReceptionistDashboard() {
  const [activeView, setActiveView] = useState("logbook");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>(undefined);
  const [selectedPersonType, setSelectedPersonType] = useState<'patient' | 'guest' | undefined>(undefined);
  const [isCheckInOpenLocal, setIsCheckInOpenLocal] = useState(false);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // reception tabs will handle searching and selecting patients; keep selected name + modal state here

  const { data: patients } = useQuery<Patient[]>({ queryKey: ['patients', debouncedSearch], queryFn: () => patientAPI.getAll(debouncedSearch ? { name: debouncedSearch } : undefined).then(r => r.data) })
  const { data: logbooks } = useQuery<Logbook[]>({ queryKey: ['logbooks'], queryFn: () => logbookAPI.getAll().then(r => r.data) })
  const { data: appointments } = useQuery<Appointment[]>({ queryKey: ['appointments'], queryFn: () => appointmentAPI.getAll().then(r => r.data) })

  const patientList = useMemo(() => (patients || []) as Patient[], [patients]);

  // derive current queue from patients marked as checked
  const queue = useMemo(() => patientList.filter(p => !!p.checked), [patientList]);

  // derive expected arrivals from appointments scheduled in next 2 hours
  const expectedArrivals = useMemo(() => {
    if (!appointments) return [] as Appointment[];
    const now = new Date();
    const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return (appointments || []).filter((a) => {
      const appt = new Date(a.appointmentAt || '');
      return appt >= now && appt <= inTwoHours;
    });
  }, [appointments]);



  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        {/* Sidebar */}
        <AppSidebar activeView={activeView} setActiveView={setActiveView} /> {/* TO FIX SIDEBAR ACTIVE VIEW */}
        {/* Header */}
        <div className="border-2 border-cyan-300/30 rounded-b-[40px] outline-double outline-cyan-100/80 container w-full p-6 space-y-6">
          <ReceptionistDashboardHeader onCheckIn={() => setIsCheckInOpen(true)} />
          {/* patient search / typeahead moved into `ReceptionTabs` "Cadastros" tab */}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Check-ins de Hoje</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{(logbooks || []).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fila Atual</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{queue.length}</div>
                <p className="text-xs text-muted-foreground">Pessoas aguardando</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex  items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">Chegadas Esperadas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{expectedArrivals.length}</div>
                <p className="text-xs text-muted-foreground">Próximas 2 horas</p>
              </CardContent>
            </Card>
          </div>
          <ReceptionTabs
            activeTab={activeView}
            setActiveTab={setActiveView}
            onOpenCheckIn={() => setIsCheckInOpen(true)}
            onOpenCheckInWithPerson={(id?: string, type?: 'patient' | 'guest') => {
              if (id) setSelectedPersonId(id);
              if (type) setSelectedPersonType(type);
              setIsCheckInOpenLocal(true);
            }}
          />

        </div>
        <ReceptionModal
          open={isCheckInOpen}
          onOpenChange={setIsCheckInOpen}
        />
        <ReceptionModal
          open={isCheckInOpenLocal}
          onOpenChange={setIsCheckInOpenLocal}
          initialPersonType={selectedPersonType}
          initialSelectedPersonId={selectedPersonId}
        />
      </div>
    </SidebarProvider>

  )
}