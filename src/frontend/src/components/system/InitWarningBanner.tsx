import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface InitWarningBannerProps {
  warning: string | null;
}

export default function InitWarningBanner({ warning }: InitWarningBannerProps) {
  if (!warning) return null;

  return (
    <Alert variant="default" className="border-yellow-500/50 bg-yellow-500/10">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        {warning}
      </AlertDescription>
    </Alert>
  );
}
