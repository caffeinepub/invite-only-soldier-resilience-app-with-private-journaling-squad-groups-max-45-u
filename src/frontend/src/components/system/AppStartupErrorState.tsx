import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AppStartupErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function AppStartupErrorState({
  title = 'Unable to Load App',
  message,
  onRetry,
  showRetry = true
}: AppStartupErrorStateProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        
        {showRetry && onRetry && (
          <div className="flex justify-center">
            <Button onClick={onRetry} variant="default">
              Retry
            </Button>
          </div>
        )}
        
        <p className="text-center text-sm text-muted-foreground">
          If the problem persists, try refreshing the page or clearing your browser cache.
        </p>
      </div>
    </div>
  );
}
