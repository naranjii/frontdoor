import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Clock, FileText, QrCode, Search, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from '@tanstack/react-query'
import { patientAPI } from '@/api/api'
import { useEffect, useMemo } from 'react'
import { guestAPI, appointmentAPI, logbookAPI } from '@/api/api'

type Guest = { id: string; name: string; note?: string; checked?: boolean }
type Appointment = { id: string; appointmentAt: string; patientId?: string; therapist?: string }
type LogbookEntry = { id: string; patientId?: string; guestId?: string; action: string; createdAt?: string }

type Patient = { id: string; name: string; phone?: string; lastVisit?: string; status?: string; healthcare?: string; checked?: boolean }

interface ReceptionTabsProps {
    activeTab?: string
    setActiveTab?: (tab: string) => void
    onOpenCheckIn?: () => void
    onOpenCheckInWithPatient?: (name?: string) => void
    onOpenCheckInWithPerson?: (id?: string, type?: 'patient' | 'guest') => void
}

export function ReceptionTabs({ activeTab, setActiveTab, onOpenCheckIn, onOpenCheckInWithPatient, onOpenCheckInWithPerson }: ReceptionTabsProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [cadastrosView, setCadastrosView] = useState<'patients' | 'guests'>('patients')

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 250)
        return () => clearTimeout(t)
    }, [searchTerm])

    const { data: patientsResp } = useQuery<Patient[]>({ queryKey: ['patients', debouncedSearch], queryFn: () => patientAPI.getAll(debouncedSearch ? { name: debouncedSearch } : undefined).then(r => r.data) })
    const { data: guestsResp } = useQuery<Guest[]>({ queryKey: ['guests', debouncedSearch], queryFn: () => guestAPI.getAll(debouncedSearch ? { name: debouncedSearch } : undefined).then(r => r.data) })
    const patients = useMemo(() => patientsResp || [], [patientsResp])
    const guests = useMemo(() => guestsResp || [], [guestsResp])

    const mockQueue = [
        // placeholder when no data
        { id: 1, name: "John Doe", type: "Paciente", time: "10:30 AM", status: "waiting", therapist: "Dr. Sarah Johnson", purpose: "Joining to chega junto", action: "drivelink"},
    ]

    const mockExpectedArrivals = [
        { id: 1, name: "Alice Brown", time: "11:30 AM", therapist: "Dr. Sarah Johnson", type: "Fisioterapia" },
    ]

    const { data: appointmentsResp } = useQuery<Appointment[]>({ queryKey: ['appointments'], queryFn: () => appointmentAPI.getAll().then(r => r.data) })
    const appointments = useMemo(() => appointmentsResp || [], [appointmentsResp])

    const { data: logbooksResp } = useQuery<LogbookEntry[]>({ queryKey: ['logbooks'], queryFn: () => logbookAPI.getAll().then(r => r.data) })
    const logbooks = useMemo(() => logbooksResp || [], [logbooksResp])

    // derive current queue from patients and guests with checked === true
    const queuePatients = patients.filter(p => !!p.checked)
    const queueGuests = guests.filter(g => !!g.checked)
    const queue = [...queuePatients, ...queueGuests]

    // expected arrivals from appointments in next 2 hours
    const expectedArrivals = useMemo(() => {
        const now = new Date()
        const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000)
        return (appointments || []).filter(a => {
            const appt = new Date(a.appointmentAt || '')
            return appt >= now && appt <= inTwoHours
        })
    }, [appointments])

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.phone || '').includes(searchTerm)
    )
    const filteredGuests = guests.filter(g => (g.name || '').toLowerCase().includes(searchTerm.toLowerCase()))

    const controlledValue = activeTab ?? 'logbook'

    const handleSelectPatient = (p: Patient) => {
        if (onOpenCheckInWithPerson) onOpenCheckInWithPerson(p.id, 'patient')
    }
    const handleSelectGuest = (g: Guest) => {
        if (onOpenCheckInWithPerson) onOpenCheckInWithPerson(g.id, 'guest')
    }

    return (
        <Tabs value={controlledValue} onValueChange={(v) => setActiveTab?.(v)} className="space-y-6">
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
                        <CardDescription>Histórico de entrada e saída de visitantes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(logbooks || []).map((entry) => (
                                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${entry.action === "check-in" ? "bg-success" : "bg-muted"}`} />
                                        <div>
                                            <h4 className="font-medium">{entry.patientId || entry.guestId}</h4>
                                            <p className="text-sm text-muted-foreground">{entry.action}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-sm">{entry.action === "check-in" ? "Entrada" : "Saída"}</div>
                                        <div className="text-xs text-muted-foreground">{entry.createdAt || ''}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="expected" className="space-y-6">
                <h2 className="text-xl font-semibold">Agendamentos de Hoje</h2>

                <div className="grid gap-4">
                    {(expectedArrivals || []).map((arrival) => (
                        <Card key={arrival.id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-accent-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{arrival.patientId || arrival.id}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(arrival.appointmentAt || '').toLocaleTimeString()} com {arrival.therapist}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline">Esperado</Badge>
                                    <Button variant="outline" size="sm" onClick={() => onOpenCheckIn?.() }>
                                        Pré Check-in
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Cadastros</h2>
                    <div className="flex items-center gap-2">
                        <div className="space-x-2">
                            <Button size="sm" variant={cadastrosView === 'patients' ? 'default' : 'outline'} onClick={() => setCadastrosView('patients')}>Pacientes</Button>
                            <Button size="sm" variant={cadastrosView === 'guests' ? 'default' : 'outline'} onClick={() => setCadastrosView('guests')}>Guests</Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* List patients or guests depending on subview */}
                <div className="grid gap-4">
                    {cadastrosView === 'patients' && (filteredPatients.slice(0, 20)).map((patient) => (
                        <Card key={patient.id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold">{patient.name}</h3>
                                    <p className="text-sm text-muted-foreground">{patient.healthcare || ''}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                                        {patient.status || 'unknown'}
                                    </Badge>
                                    <Button variant="outline" size="sm" onClick={() => handleSelectPatient(patient)}>
                                        Fazer Check-in
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <FileText className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {cadastrosView === 'guests' && (filteredGuests.slice(0, 20)).map((g) => (
                        <Card key={g.id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold">{g.name}</h3>
                                    <p className="text-sm text-muted-foreground">{g.note || ''}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => handleSelectGuest(g)}>
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