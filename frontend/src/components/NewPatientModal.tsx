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
    const [age, setAge] = useState<number | undefined>(undefined);
    const [healthcare, setHealthcare] = useState('');
    const [patientCode, setPatientCode] = useState<number | undefined>(undefined);
    const [supportLevel, setSupportLevel] = useState<number | undefined>(undefined);
    const [driveLink, setDriveLink] = useState('');
    const [notes, setNotes] = useState('');
    const { toast } = useToast();

    const handleClose = () => onOpenChange(false);

    const handleSubmit = async () => {
        try {
            await patientAPI.create({ name, age, healthcare: healthcare || undefined, patientCode, supportLevel, driveLink: driveLink || undefined, notes: notes || undefined });
            toast({ title: 'Paciente criado', description: `${name} criado com sucesso` });
            handleClose();
            setName('');
            setHealthcare('');
            setPatientCode(undefined);
            setSupportLevel(undefined);
            setDriveLink('');
            setNotes('');
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to create patient' });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card border-border/50 shadow-medium">
                <DialogHeader>
                    <DialogTitle>Novo Paciente</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="pname">Nome Completo *</Label>
                        <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="page">Idade *</Label>
                        <Input id="page" type="number" value={age ?? ''} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                    <div>
                        <Label htmlFor="phealth">Plano de Saúde</Label>
                        <Input id="phealth" value={healthcare} onChange={(e) => setHealthcare(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="ppatientCode">Código do Paciente</Label>
                        <Input id="ppatientCode" type="number" value={patientCode ?? ''} onChange={(e) => setPatientCode(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                    <div>
                        <Label htmlFor="psupport">Nível de Suporte</Label>
                        <Input id="psupport" type="number" value={supportLevel ?? ''} onChange={(e) => setSupportLevel(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                    <div>
                        <Label htmlFor="pdrive">Link do Drive</Label>
                        <Input id="pdrive" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="pnotes">Observações</Label>
                        <Input id="pnotes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} disabled={!name}>Criar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
