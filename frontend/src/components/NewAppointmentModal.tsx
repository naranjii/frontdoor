import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { appointmentAPI } from '@/api/api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAppointmentModal = ({ open, onOpenChange }: Props) => {
  const [patientId, setPatientId] = useState('');
  const [guestId, setGuestId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const { toast } = useToast();

  const handleClose = () => onOpenChange(false);

  const handleSubmit = async () => {
    try {
      // TODO: replace createdById with real staff id from auth context or token
      await appointmentAPI.create({ createdById: 1, patientId: patientId || undefined, guestId: guestId || undefined, scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined });
      toast({ title: 'Appointment created', description: `Appointment scheduled` });
      handleClose();
      setPatientId('');
      setGuestId('');
      setScheduledAt('');
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create appointment' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="patientId">Patient ID (optional)</Label>
            <Input id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="guestId">Guest ID (optional)</Label>
            <Input id="guestId" value={guestId} onChange={(e) => setGuestId(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="scheduledAt">Scheduled At</Label>
            <Input id="scheduledAt" type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
