import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: {
    id: string;
    name?: string;
    age?: number;
    healthcare?: string;
    supportLevel?: number;
    patientCode?: number;
    driveLink?: string;
    notes?: string;
  };
}

export const ShowPatientModal = ({ open, onOpenChange, patient }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle>Patient Info</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label className="text-sm">Name</Label>
            <div className="font-medium">{patient?.name}</div>
          </div>
          <div>
            <Label className="text-sm">Age</Label>
            <div>{patient?.age ?? '-'}</div>
          </div>
          <div>
            <Label className="text-sm">Healthcare</Label>
            <div>{patient?.healthcare ?? '-'}</div>
          </div>
          <div>
            <Label className="text-sm">Support Level</Label>
            <div>{patient?.supportLevel ?? '-'}</div>
          </div>
          <div>
            <Label className="text-sm">Patient Code</Label>
            <div>{patient?.patientCode ?? '-'}</div>
          </div>
          <div>
            <Label className="text-sm">Drive Link</Label>
            <div>{patient?.driveLink ? <a href={patient.driveLink} target="_blank" rel="noreferrer" className="text-primary underline">Open Drive</a> : '-'}</div>
          </div>
          <div>
            <Label className="text-sm">Notes</Label>
            <div>{patient?.notes ?? '-'}</div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
