import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { patientAPI } from '@/api/api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: {
    id: string;
    name?: string;
    healthcare?: string;
    age?: number;
    patientCode?: number;
    supportLevel?: number;
    driveLink?: string;
    notes?: string;
  };
  onSaved?: () => void;
}

export const EditPatientModal = ({ open, onOpenChange, patient, onSaved }: Props) => {
  const [name, setName] = useState('');
  const [healthcare, setHealthcare] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [patientCode, setPatientCode] = useState<number | undefined>(undefined);
  const [supportLevel, setSupportLevel] = useState<number | undefined>(undefined);
  const [driveLink, setDriveLink] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (patient) {
      setName(patient.name ?? '');
      setHealthcare(patient.healthcare ?? '');
      setAge(patient.age ?? undefined);
      setPatientCode(patient.patientCode ?? undefined);
      setSupportLevel(patient.supportLevel ?? undefined);
      setDriveLink(patient.driveLink ?? '');
      setNotes(patient.notes ?? '');
    }
  }, [patient]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!patient) return;
    try {
      await patientAPI.update(patient.id, {
        name,
        healthcare: healthcare || undefined,
        age: age ?? undefined,
        patientCode,
        supportLevel,
        driveLink: driveLink || undefined,
        notes: notes || undefined,
      });
      toast({ title: 'Updated', description: `${name} updated` });
      handleClose();
  if (onSaved) onSaved();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update patient' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="healthcare">Healthcare</Label>
            <Input id="healthcare" value={healthcare} onChange={(e) => setHealthcare(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={age ?? ''} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
            <div>
              <Label htmlFor="supportLevel">Support Level</Label>
              <Input id="supportLevel" type="number" value={supportLevel ?? ''} onChange={(e) => setSupportLevel(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
          </div>
          <div>
            <Label htmlFor="patientCode">Patient Code</Label>
            <Input id="patientCode" type="number" value={patientCode ?? ''} onChange={(e) => setPatientCode(e.target.value ? Number(e.target.value) : undefined)} />
          </div>
          <div>
            <Label htmlFor="driveLink">Drive Link</Label>
            <Input id="driveLink" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
