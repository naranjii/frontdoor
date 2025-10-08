import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { staffAPI } from '@/api/api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewStaffModal = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR'>('RECEPTIONIST');
  const { toast } = useToast();

  const handleClose = () => onOpenChange(false);

  const handleSubmit = async () => {
    try {
      await staffAPI.register({ username, name, password, role });
      toast({ title: 'Staff created', description: `${name} created successfully` });
      handleClose();
      setName('');
      setUsername('');
      setPassword('');
      setRole('RECEPTIONIST');
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create staff' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
        <DialogHeader>
          <DialogTitle>New Staff</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="susername">Username</Label>
            <Input id="susername" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="sname">Full Name</Label>
            <Input id="sname" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="spassword">Password</Label>
            <Input id="spassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="srole">Role</Label>
            <select id="srole" value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR')} className="select">
              <option value="ADMIN">Admin</option>
              <option value="RECEPTIONIST">Receptionist</option>
              <option value="COORDINATOR">Coordinator</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!name}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
