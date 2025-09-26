import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Clock,

} from "lucide-react"
import { CheckInModal } from "@/components/CheckInModal"
import { DashboardHeader } from "@/components/DashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ReceptionTabs } from "@/components/ReceptionTabs"

export default function ReceptionistDashboard() {
  const [activeView, setActiveView] = useState("logbook");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const mockQueue = [
    { id: 1, name: "John Doe", type: "Paciente", time: "10:30 AM", status: "waiting", therapist: "Dr. Sarah Johnson", purpose: "Joining to chega junto" },
  ]

  const mockExpectedArrivals = [
    { id: 1, name: "Alice Brown", time: "11:30 AM", therapist: "Dr. Sarah Johnson", type: "Fisioterapia" },
  ]



  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        {/* Sidebar */}
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        {/* Header */}
        <div className="border-2 border-cyan-300/30 rounded-b-[40px] outline-double outline-cyan-100/80 container w-full p-6 space-y-6">
          <DashboardHeader onCheckIn={() => setIsCheckInOpen(true)} />

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Check-ins de Hoje</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">24</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fila Atual</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{mockQueue.length}</div>
                <p className="text-xs text-muted-foreground">Pessoas aguardando</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex  items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">Chegadas Esperadas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{mockExpectedArrivals.length}</div>
                <p className="text-xs text-muted-foreground">Próximas 2 horas</p>
              </CardContent>
            </Card>
          </div>
          <ReceptionTabs />

        </div>
        <CheckInModal
          open={isCheckInOpen}
          onOpenChange={setIsCheckInOpen}
        />
      </div>
    </SidebarProvider>

  )
}