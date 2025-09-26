import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Clock, FileText, QrCode, Search, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { getStatusColor } from "./helper";
import { Input } from "./ui/input";

export function ReceptionTabs() {
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
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

    return (
        <Tabs defaultValue="queue" className="space-y-6 ">
            <TabsList className="grid w-full grid-cols-3 rounded-xl shadow-lg text-center font-medium ">
                <TabsTrigger value="logbook" className="bg-gradient-to-r from-cyan-500/80 via-cyan-500/50 to-cyan-300/50  p-1 py-3 rounded-t-xl rounded-l-xl text-white/95" >Registro de Acessos</TabsTrigger>
                <TabsTrigger value="expected" className="bg-gradient-to-r from-cyan-500/80 via-cyan-500/50 to-cyan-300/50  rounded-t-xl text-white/95 ">Check In Agendado</TabsTrigger>
                <TabsTrigger value="patients" className="bg-gradient-to-r from-cyan-500/80 via-cyan-500/50 to-cyan-300/50  rounded-t-xl rounded-r-xl text-white/95 ">Buscar Cadastro</TabsTrigger>
            </TabsList>

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

            {/* Expected Arrivals */}
            <TabsContent value="expected" className="space-y-6">
                <h2 className="text-xl font-semibold">Agendamentos de Hoje</h2>

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
        </Tabs>
    )
}