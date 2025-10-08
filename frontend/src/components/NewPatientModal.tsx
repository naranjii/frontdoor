import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { patientAPI } from '@/api/api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPatientModal = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState('');
  const [healthcare, setHealthcare] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const { toast } = useToast();

  const handleClose = () => onOpenChange(false);

  const handleSubmit = async () => {
    try {
      await patientAPI.create({ name, healthcare, age });
      toast({ title: 'Patient created', description: `${name} created successfully` });
      handleClose();
      setName('');
      setHealthcare('');
      setAge(undefined);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create patient' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle>New Patient</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pname">Full Name</Label>
            <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phealth">Healthcare</Label>
            <Input id="phealth" value={healthcare} onChange={(e) => setHealthcare(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="page">Age (optional)</Label>
            <Input id="page" type="number" value={age ?? ''} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!name || !healthcare}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
