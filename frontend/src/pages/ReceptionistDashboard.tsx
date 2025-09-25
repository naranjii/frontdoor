import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import {
  Users,
  UserPlus,
  Clock,
  Search,
  Plus,
  FileText,
  QrCode,
  Building2,
  UserCheck,
  Activity,
  Settings
} from "lucide-react"
import { toast } from "sonner"
import { CheckInModal } from "@/components/CheckInModal"
import { DashboardHeader } from "@/components/DashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { LogbookView } from "@/components/LogbookView"
import { RegistrationsView } from "@/components/RegistrationsView"

export default function ReceptionistDashboard() {
  const [activeView, setActiveView] = useState("logbook");
  const [searchTerm, setSearchTerm] = useState("")
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  const mockPatients = [
    { id: 1, name: "John Doe", phone: "(555) 123-4567", lastVisit: "2024-01-10", status: "active" },
  ]

  const mockQueue = [
    { id: 1, name: "John Doe", type: "Paciente", time: "10:30 AM", status: "waiting", therapist: "Dr. Sarah Johnson", purpose: "Joining to chega junto" },
  ]

  const mockExpectedArrivals = [
    { id: 1, name: "Alice Brown", time: "11:30 AM", therapist: "Dr. Sarah Johnson", type: "Fisioterapia" },
  ]

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-warning text-warning-foreground"
      case "processing":
        return "bg-primary text-primary-foreground"
      case "completed":
        return "bg-success text-success-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        {/* Sidebar */}
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        {/* Header */}
        <div className="outline-double outline-cyan-300/50 bg-cyan-100/10 container w-full p-6 space-y-6">
          <DashboardHeader onCheckIn={() => setIsCheckInOpen(true)} />

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Check-ins de Hoje</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fila Atual</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockQueue.length}</div>
                <p className="text-xs text-muted-foreground">Pessoas aguardando</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chegadas Esperadas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockExpectedArrivals.length}</div>
                <p className="text-xs text-muted-foreground">Próximas 2 horas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Espera</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 min</div>
                <p className="text-xs text-success">Abaixo da meta</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="queue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="queue">Fila Atual</TabsTrigger>
              <TabsTrigger value="expected">Chegadas Esperadas</TabsTrigger>
              <TabsTrigger value="patients">Buscar Paciente</TabsTrigger>
              <TabsTrigger value="logbook">Registro de Hoje</TabsTrigger>
            </TabsList>

            {/* Current Queue */}
            <TabsContent value="queue" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Fila Atual</h2>
                <Badge className="bg-primary text-primary-foreground">
                  Atualizações em Tempo Real
                </Badge>
              </div>

              <div className="grid gap-4">
                {mockQueue.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.type} • Chegada às {item.time}
                            {item.therapist && ` • ${item.therapist}`}
                            {item.purpose && ` • ${item.purpose}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Chamar Próximo
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Expected Arrivals */}
            <TabsContent value="expected" className="space-y-6">
              <h2 className="text-xl font-semibold">Chegadas Esperadas</h2>

              <div className="grid gap-4">
                {mockExpectedArrivals.map((arrival) => (
                  <Card key={arrival.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{arrival.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {arrival.type} • {arrival.time} com {arrival.therapist}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Esperado</Badge>
                        <Button variant="outline" size="sm" onClick={() => setIsCheckInOpen(true)}>
                          Pré Check-in
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Patient Lookup */}
            <TabsContent value="patients" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Buscar Paciente</h2>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.phone} • Última visita: {patient.lastVisit}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                          {patient.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setIsCheckInOpen(true)}>
                          Fazer Check-in
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Logbook */}
            <TabsContent value="logbook" className="space-y-6">
              <h2 className="text-xl font-semibold">Registro de Hoje</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Registro de Check-ins/Check-outs</CardTitle>
                  <CardDescription>Acompanhamento em tempo real dos visitantes de hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Doe", action: "Check-in", time: "09:30 AM", type: "Paciente" },
                      { name: "Jane Smith", action: "Check-out", time: "10:15 AM", type: "Visitante" },
                      { name: "Bob Johnson", action: "Check-in", time: "10:30 AM", type: "Paciente" },
                      { name: "Alice Brown", action: "Check-in", time: "11:00 AM", type: "Paciente" }
                    ].map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${entry.action === "Check-in" ? "bg-success" : "bg-muted"
                            }`} />
                          <div>
                            <h4 className="font-medium">{entry.name}</h4>
                            <p className="text-sm text-muted-foreground">{entry.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{entry.action === "Check-in" ? "Entrada" : "Saída"}</div>
                          <div className="text-xs text-muted-foreground">{entry.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <CheckInModal
          open={isCheckInOpen}
          onOpenChange={setIsCheckInOpen}
        />
      </div>
    </SidebarProvider>

  )
}