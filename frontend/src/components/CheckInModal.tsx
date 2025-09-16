import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockPatients = [
  { id: 1, name: "John Smith", phone: "+1 (555) 123-4567" },
  { id: 2, name: "David Johnson", phone: "+1 (555) 345-6789" },
  { id: 3, name: "Sarah Wilson", phone: "+1 (555) 456-7890" },
];

const mockGuests = [
  { id: 1, name: "Maria Garcia", phone: "+1 (555) 234-5678" },
];

export const CheckInModal = ({ open, onOpenChange }: CheckInModalProps) => {
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState("");
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    notes: ""
  });
  
  const { toast } = useToast();

  const handleReset = () => {
    setStep(1);
    setVisitorType("");
    setIsNewRegistration(false);
    setSelectedPerson("");
    setSearchTerm("");
    setFormData({
      name: "",
      phone: "",
      email: "",
      purpose: "",
      notes: ""
    });
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  const handleNext = () => {
    if (step === 1 && visitorType) {
      setStep(2);
    } else if (step === 2) {
      if (visitorType === "guest" && !isNewRegistration && !selectedPerson) {
        return;
      }
      if (visitorType === "patient" && !selectedPerson) {
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Check-in successful",
      description: `${formData.name || selectedPerson} has been checked in.`,
    });
    handleClose();
  };

  const getCurrentList = () => {
    return visitorType === "patient" ? mockPatients : mockGuests;
  };

  const filteredList = getCurrentList().filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {step === 1 && "Select Visitor Type"}
            {step === 2 && `Select ${visitorType === "patient" ? "Patient" : "Guest"}`}
            {step === 3 && "Check-in Details"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 1 && "Choose whether this is a patient or guest check-in."}
            {step === 2 && `Choose an existing ${visitorType} or register a new one.`}
            {step === 3 && "Complete the check-in process."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Visitor Type Selection */}
          {step === 1 && (
            <RadioGroup value={visitorType} onValueChange={setVisitorType}>
              <Card className="transition-smooth hover:shadow-soft cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient" className="flex items-center gap-3 cursor-pointer">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Patient Check-in</div>
                        <div className="text-sm text-muted-foreground">Registered patient appointment</div>
                      </div>
                    </Label>
                  </div>
                </CardHeader>
              </Card>

              <Card className="transition-smooth hover:shadow-soft cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="guest" id="guest" />
                    <Label htmlFor="guest" className="flex items-center gap-3 cursor-pointer">
                      <UserPlus className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-medium">Guest Check-in</div>
                        <div className="text-sm text-muted-foreground">Visitor or new registration</div>
                      </div>
                    </Label>
                  </div>
                </CardHeader>
              </Card>
            </RadioGroup>
          )}

          {/* Step 2: Person Selection */}
          {step === 2 && (
            <div className="space-y-4">
              {visitorType === "guest" && (
                <div className="flex gap-3">
                  <Button
                    variant={!isNewRegistration ? "default" : "outline"}
                    onClick={() => setIsNewRegistration(false)}
                    className="flex-1 transition-smooth"
                  >
                    Existing Guest
                  </Button>
                  <Button
                    variant={isNewRegistration ? "default" : "outline"}
                    onClick={() => setIsNewRegistration(true)}
                    className="flex-1 transition-smooth"
                  >
                    New Registration
                  </Button>
                </div>
              )}

              {!isNewRegistration && (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder={`Search ${visitorType}s...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 transition-smooth"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredList.map((person) => (
                      <Card
                        key={person.id}
                        className={`transition-smooth cursor-pointer hover:shadow-soft ${
                          selectedPerson === person.name ? "ring-2 ring-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedPerson(person.name)}
                      >
                        <CardContent className="p-3">
                          <div className="font-medium text-foreground">{person.name}</div>
                          <div className="text-sm text-muted-foreground">{person.phone}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {isNewRegistration && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newName">Full Name</Label>
                    <Input
                      id="newName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPhone">Phone Number</Label>
                    <Input
                      id="newPhone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newEmail">Email (Optional)</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Check-in Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                  <SelectTrigger className="transition-smooth">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="visiting">Visiting Patient</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information..."
                  className="transition-smooth"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={step === 1 ? handleClose : () => setStep(step - 1)}
              className="transition-smooth"
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !visitorType) ||
                  (step === 2 && !isNewRegistration && !selectedPerson) ||
                  (step === 2 && isNewRegistration && !formData.name)
                }
                className="bg-gradient-primary text-primary-foreground transition-smooth"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.purpose}
                className="bg-gradient-primary text-primary-foreground transition-smooth"
              >
                Complete Check-in
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};