import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useFieldMode } from '../../hooks/useFieldMode';
import { Zap } from 'lucide-react';

export default function FieldModeToggle() {
  const { isFieldMode, toggleFieldMode } = useFieldMode();

  return (
    <div className="flex items-center gap-2">
      <Zap className={`h-4 w-4 ${isFieldMode ? 'text-primary' : 'text-muted-foreground'}`} />
      <Label htmlFor="field-mode" className="text-sm cursor-pointer">
        Field Mode
      </Label>
      <Switch
        id="field-mode"
        checked={isFieldMode}
        onCheckedChange={toggleFieldMode}
      />
    </div>
  );
}
