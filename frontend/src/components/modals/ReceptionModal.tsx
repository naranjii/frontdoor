import { useState, useEffect } from "react";
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { patientAPI, guestAPI, logbookAPI } from '@/api/api'
import { useAuth } from '@/context/AuthContext'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReceptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional: preselect the visitor type when opening (e.g. 'atendido' or 'visitante') */
  initialVisitorType?: 'atendido' | 'visitante';
  /** Optional: preselect a person's id when opening the modal */
  initialSelectedPersonId?: string;
  /** Optional: preselect person type when opening */
  initialPersonType?: 'atendido' | 'visitante';
}

export const ReceptionModal = ({ open, onOpenChange, initialVisitorType, initialSelectedPersonId, initialPersonType }: ReceptionModalProps) => {
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState("");
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    contact: ""
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
      organization: "",
      contact: ""
    });
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  // when modal opens with initial props, apply them
  useEffect(() => {
    if (open) {
      if (initialVisitorType) {
        setVisitorType(initialVisitorType);
        setStep(2);
      }
      if (initialSelectedPersonId && initialPersonType) {
        // when opening with an id, try to resolve to a name for selection display
        (async () => {
          try {
            if (initialPersonType === 'atendido') {
              const resp = await patientAPI.getById(initialSelectedPersonId)
              setSelectedPerson(resp.data.name)
            } else {
              const resp = await guestAPI.getById(initialSelectedPersonId)
              setSelectedPerson(resp.data.name)
            }
          } catch (e) {
            // ignore
          }
        })()
      }
    }
  }, [open, initialVisitorType, initialSelectedPersonId, initialPersonType]);

  const qc = useQueryClient()
  const auth = useAuth()
  const staffId = auth.user?.id || ''

  const { data: patientsResp } = useQuery({
    queryKey: ['reception-patients', searchTerm],
    queryFn: () => patientAPI.getAll(searchTerm ? { name: searchTerm } : undefined).then(r => r.data),
    enabled: step === 2 && visitorType === 'atendido',
  });

  const { data: guestsResp } = useQuery({
    queryKey: ['reception-guests', searchTerm],
    queryFn: () => guestAPI.getAll(searchTerm ? { name: searchTerm } : undefined).then(r => r.data),
    enabled: step === 2 && visitorType === 'visitante',
  });
  const patients = patientsResp || []
  const guests = guestsResp || []

  const handleNext = () => {
    if (step === 1 && visitorType) {
      setStep(2);
    } else if (step === 2) {
      if (visitorType === "visitante" && !isNewRegistration && !selectedPerson) {
        return;
      }
      if (visitorType === "atendido" && !selectedPerson) {
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    // if checking in a patient, toggle checked flag
    (async () => {
      try {
        if (visitorType === 'atendido') {
          // if new registration, create patient first
          let patientId = undefined
            const found = patients.find(p => p.name === selectedPerson)
            patientId = found?.id
          if (patientId) {
            // toggle checked to true
            await patientAPI.update(patientId, { checked: true } as unknown as { name?: string; healthcare?: string; age?: number; patientCode?: number; supportLevel?: number; driveLink?: string; notes?: string })
            await logbookAPI.create({ staffId, patientId })
          }
        }

        if (visitorType === 'visitante') {
          let guestId = undefined
          if (isNewRegistration) {
            const createResp = await guestAPI.create({name: formData.name, organization: formData.organization, contact: formData.contact})
            guestId = createResp.data.id
          } else {
            const found = guests.find(g => g.name === selectedPerson)
            guestId = found?.id
          }
          if (guestId) {
            // mark guest as checked if endpoint supports it
            await guestAPI.update(guestId, { name: formData.name })
            await logbookAPI.create({ staffId, guestId })
          }
        }

        toast({
          title: "Check-in efetuado",
          description: `${formData.name || selectedPerson} entrou.`,
        });
        qc.invalidateQueries({ queryKey: ['reception-patients'] });
        qc.invalidateQueries({ queryKey: ['reception-guests'] });
        handleClose();
      } catch (err) {
        toast({ title: 'Erro', description: 'Falha no check in' })
      }
    })()
  };

  const filteredList = (visitorType === 'atendido' ? patients : guests).filter((person: { name?: string }) =>
    (person.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {step === 1 && "Atendido ou Visitante"}
            {step === 2 && visitorType === 'atendido' && "Check-in do Atendido"}
            {step === 2 && visitorType === 'visitante' && "Check-in do Visitante"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 1 && "Escolha entre sua lista de pacientes ou visitantes"}
            {step === 2 && visitorType === 'atendido' && `Selecione o nome do atendido para fazer o check-in`}
            {step === 2 && visitorType === 'visitante' && !isNewRegistration && "Cadastre um visitante ou selecione da lista"}
            {step === 2 && isNewRegistration && "Cadastre um novo visitante na sua recepção"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Visitor Type Selection */}
          {step === 1 && (
            <RadioGroup value={visitorType} onValueChange={setVisitorType}>
              <Card className="transition-smooth hover:shadow-soft cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="atendido" className="flex items-center gap-3 cursor-pointer">
                      <User className="h-5 w-5 text-primary" />
                    <RadioGroupItem value="atendido" id="atendido" />

                      <div>
                        <div className="font-medium">Check-in do Atendido</div>
                      </div>
                    </Label>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="transition-smooth hover:shadow-soft cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="visitante" className="flex items-center gap-3 cursor-pointer">
                      
                      <UserPlus className="h-5 w-5 text-accent" />
                    <RadioGroupItem value="visitante" id="visitante" />

                      <div>
                        <div className="font-medium">Check-in do Visitante</div>
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
              {visitorType === "visitante" && (
                <div className="flex gap-3">
                  <Button
                    variant={!isNewRegistration ? "default" : "outline"}
                    onClick={() => setIsNewRegistration(false)}
                    className="flex-1 transition-smooth"
                  >
                    Visita Cadastrada
                  </Button>
                  <Button
                    variant={isNewRegistration ? "default" : "outline"}
                    onClick={() => setIsNewRegistration(true)}
                    className="flex-1 transition-smooth"
                  >
                    Novo Visitante
                  </Button>
                </div>
              )}

              {!isNewRegistration && (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder={`Buscar ${visitorType}s...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 transition-smooth"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredList.map((person) => (
                      <Card
                        key={person.id}
                        className={`transition-smooth cursor-pointer hover:shadow-soft ${selectedPerson === person.name ? "ring-2 ring-primary bg-primary/5" : ""
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

              {isNewRegistration && visitorType === 'visitante' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newName">Nome Completo *</Label>
                    <Input
                      id="newName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newOrganization">Organização ou Empresa</Label>
                    <Input
                      id="newOrganization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newContact">Contato</Label>
                    <Input
                      id="newContact"
                      type="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="transition-smooth"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={step === 1 ? handleClose : () => setStep(step - 1)}
              className="transition-smooth"
            >
              {step === 1 ? "Cancelar" : "Voltar"}
            </Button>

            {step < 2 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !visitorType) ||
                  (step === 2 && !isNewRegistration && !selectedPerson) ||
                  (step === 2 && isNewRegistration && !formData.name)
                }
                className="bg-gradient-primary text-primary-foreground transition-smooth"
              >
                →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name}
                className="bg-gradient-primary text-primary-foreground transition-smooth"
              >
                Check-in ✓
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};