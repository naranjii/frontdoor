import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Clock, FileText, QrCode, Search, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

export function ReceptionTabs() {
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const mockPatients = [
        { id: 1, name: "John Doe", phone: "(555) 123-4567", lastVisit: "2024-01-10", status: "active" },
    ]

    const mockQueue = [
        { id: 1, name: "John Doe", type: "Paciente", time: "10:30 AM", status: "waiting", therapist: "Dr. Sarah Johnson", purpose: "Joining to chega junto", action: "drivelink"},
    ]

    const mockExpectedArrivals = [
        { id: 1, name: "Alice Brown", time: "11:30 AM", therapist: "Dr. Sarah Johnson", type: "Fisioterapia" },
    ]

    const filteredPatients = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    )

    return (
        <Tabs defaultValue="logbook" className="space-y-6">
            <TabsList className="tracking-wider grid w-full grid-cols-3 shadow-md shadow-cyan-700/30 text-center font-medium">

                <TabsTrigger
                    value="logbook"
                    className="
        py-1 rounded-t-lg text-slate-600 tracking-widest 
        border-x border-t border-gray-400
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-cyan-500
        bg-gradient-to-r from-cyan-00/80 to-cyan-700/50
        hover:shadow-md hover:shadow-cyan-700/10 hover:bg-cyan-600/10
        transition-discrete duration-500      
        data-[state=active]:font-bold data-[state=active]:shadow-inner data-[state=active]:text-gray-200"
                >
                    Histórico
                </TabsTrigger>

                <TabsTrigger
                    value="expected"
                    className="
        py-1 rounded-t-lg text-slate-600 tracking-widest
        border-x border-t border-gray-400
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-cyan-500
        bg-gradient-to-r from-cyan-00/80 to-cyan-700/50
        hover:shadow-md hover:shadow-cyan-700/10 hover:bg-cyan-600/10
        transition-discrete duration-900     
        data-[state=active]:font-bold data-[state=active]:shadow-inner data-[state=active]:text-gray-200"
                >
                    Agenda
                </TabsTrigger>

                <TabsTrigger
                    value="patients"
                    className="
        py-1 rounded-t-lg text-slate-600 tracking-widest
        border-x border-t border-gray-400
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-cyan-500
        bg-gradient-to-r from-cyan-00/80 to-cyan-700/50
        hover:shadow-md hover:shadow-cyan-700/10 hover:bg-cyan-600/10
        transition-discrete duration-500      
        data-[state=active]:font-bold data-[state=active]:shadow-inner data-[state=active]:text-gray-200"
                >
                    Cadastros
                </TabsTrigger>
            </TabsList>

            {/* Logbook */}
            <TabsContent value="logbook" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Livro de Entradas e Saídas</CardTitle>
                        <CardDescription>Histórico de entradas e saídas do prédio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockQueue.map((entry, index) => (
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