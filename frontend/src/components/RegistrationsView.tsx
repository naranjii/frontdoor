import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Phone, Mail, Calendar, UserPlus } from "lucide-react";

// Mock data for demonstration
const mockRegistrations = [
  {
    id: 1,
    name: "John Smith",
    type: "Patient",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "2024-01-10",
    status: "active",
    registrationDate: "2023-05-15"
  },
  {
    id: 2,
    name: "Maria Garcia",
    type: "Guest",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 234-5678",
    lastVisit: "2024-01-15",
    status: "active",
    registrationDate: "2024-01-15"
  },
  {
    id: 3,
    name: "David Johnson",
    type: "Patient",
    email: "david.j@email.com",
    phone: "+1 (555) 345-6789",
    lastVisit: "2024-01-14",
    status: "active",
    registrationDate: "2023-08-22"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    type: "Patient",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 456-7890",
    lastVisit: "2023-12-20",
    status: "inactive",
    registrationDate: "2023-03-10"
  }
];

export const RegistrationsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-success/10 text-success border-success/20" 
      : "bg-muted/20 text-muted-foreground border-muted/30";
  };

  const getTypeColor = (type: string) => {
    return type === "Patient" 
      ? "bg-primary/10 text-primary border-primary/20" 
      : "bg-accent/10 text-accent border-accent/20";
  };

  const filteredRegistrations = mockRegistrations.filter(registration => {
    const matchesSearch = registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "patients") return matchesSearch && registration.type === "Patient";
    if (activeTab === "guests") return matchesSearch && registration.type === "Guest";
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Registrations</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 transition-smooth"
            />
          </div>
          <Button variant="outline" className="transition-smooth">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground transition-smooth">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Registration
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="all" className="transition-smooth">All Registrations</TabsTrigger>
          <TabsTrigger value="patients" className="transition-smooth">Patients</TabsTrigger>
          <TabsTrigger value="guests" className="transition-smooth">Guests</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredRegistrations.map((registration) => (
              <Card key={registration.id} className="transition-smooth hover:shadow-medium bg-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-foreground">{registration.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(registration.type)}>
                        {registration.type}
                      </Badge>
                      <Badge className={getStatusColor(registration.status)}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{registration.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{registration.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Last visit: {new Date(registration.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UserPlus className="h-4 w-4" />
                      <span>Registered: {new Date(registration.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};