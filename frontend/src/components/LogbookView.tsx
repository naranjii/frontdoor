import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, User, Calendar } from "lucide-react";

// Mock data for demonstration
const mockLogbookEntries = [
  {
    id: 1,
    timestamp: "2024-01-15 09:30:00",
    type: "check-in",
    name: "John Smith",
    category: "Patient",
    purpose: "Routine Checkup",
    status: "completed"
  },
  {
    id: 2,
    timestamp: "2024-01-15 10:15:00",
    type: "check-in",
    name: "Maria Garcia",
    category: "Guest",
    purpose: "Visiting Patient",
    status: "in-progress"
  },
  {
    id: 3,
    timestamp: "2024-01-15 11:00:00",
    type: "check-out",
    name: "David Johnson",
    category: "Patient",
    purpose: "Physical Therapy",
    status: "completed"
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:30:00",
    type: "check-in",
    name: "Sarah Wilson",
    category: "Patient",
    purpose: "Consultation",
    status: "waiting"
  }
];

export const LogbookView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-primary/10 text-primary border-primary/20";
      case "waiting": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "check-in" 
      ? "bg-accent/10 text-accent border-accent/20" 
      : "bg-secondary/50 text-secondary-foreground border-secondary/30";
  };

  const filteredEntries = mockLogbookEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "check-ins") return matchesSearch && entry.type === "check-in";
    if (activeTab === "check-outs") return matchesSearch && entry.type === "check-out";
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Logbook</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 transition-smooth"
            />
          </div>
          <Button variant="outline" className="transition-smooth">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="all" className="transition-smooth">All Entries</TabsTrigger>
          <TabsTrigger value="check-ins" className="transition-smooth">Check-ins</TabsTrigger>
          <TabsTrigger value="check-outs" className="transition-smooth">Check-outs</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="transition-smooth hover:shadow-medium bg-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-foreground">{entry.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(entry.type)}>
                        {entry.type === "check-in" ? "Check In" : "Check Out"}
                      </Badge>
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{entry.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{entry.purpose}</span>
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