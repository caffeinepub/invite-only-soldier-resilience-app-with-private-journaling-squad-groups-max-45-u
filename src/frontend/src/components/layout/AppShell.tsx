import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useLocalProfile } from '../../hooks/useLocalProfile';
import { useFieldMode } from '../../hooks/useFieldMode';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Home, BookOpen, Users, Target, Settings, AlertCircle, Menu, User, RotateCcw, Brain, Moon, Library, Smartphone, Wrench, Video, FileText, Quote } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import FieldModeToggle from '../fieldMode/FieldModeToggle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { resetAllLocalData } from '../../utils/localDataStore';

interface AppShellProps {
  onShowOnboarding: () => void;
  needsOnboarding: boolean;
}

export default function AppShell({ onShowOnboarding, needsOnboarding }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { displayName, profile, reset } = useLocalProfile();
  const { isFieldMode } = useFieldMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleResetData = () => {
    resetAllLocalData(profile.localUuid);
    reset();
    setShowResetDialog(false);
    navigate({ to: '/' });
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/sleep', label: 'Sleep Performance', icon: Moon },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/groups', label: 'Groups', icon: Users },
    { path: '/modules', label: 'Missions', icon: Target },
    { path: '/assessments', label: 'Assessments', icon: Brain },
    { path: '/quotes', label: 'Daily Quotes', icon: Quote },
    { path: '/mental-performance/reading', label: 'Reading', icon: Library },
    { path: '/mental-performance/apps', label: 'Free Apps', icon: Smartphone },
    { path: '/mental-performance/life-lessons', label: 'Life Lessons', icon: Video },
    { path: '/tools/military-apps', label: 'Military Apps', icon: Wrench },
    { path: '/reports', label: 'Reports', icon: FileText }
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
        return (
          <Button
            key={item.path}
            variant={isActive ? 'secondary' : 'ghost'}
            className={mobile ? 'w-full justify-start' : ''}
            onClick={() => {
              navigate({ to: item.path });
              if (mobile) setMobileMenuOpen(false);
            }}
          >
            <Icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </>
  );

  return (
    <div className={`flex min-h-screen flex-col ${isFieldMode ? 'field-mode' : ''}`}>
      {/* Fixed background layer */}
      <div className="app-background-layer" />
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate({ to: '/' })}
                className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
              >
                <img
                  src="/assets/generated/dagger-icon-mark.dim_256x256.png"
                  alt="DAGGER"
                  className="h-8 w-8 object-contain"
                />
                <span className="hidden sm:inline">Dagger H2F Mental and Sleep Performance</span>
              </button>

              <nav className="hidden md:flex items-center gap-2">
                <NavLinks />
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <FieldModeToggle />
              </div>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col gap-4 mt-8">
                    <NavLinks mobile />
                    <div className="pt-4 border-t">
                      <FieldModeToggle />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">{displayName}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: '/guidelines' })}>
                    <Target className="mr-2 h-4 w-4" />
                    Guidelines
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/settings' })}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings & About
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowResetDialog(true)} className="text-destructive">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Local Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {needsOnboarding && (
          <div className="container mt-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete the onboarding to acknowledge the disclaimer and guidelines.{' '}
                <button onClick={onShowOnboarding} className="underline font-medium">
                  Complete now
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="border-t bg-muted/30 py-6 mt-12">
          <div className="container text-center text-sm text-muted-foreground">
            © 2026. Built with ❤️ using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:underline">
              caffeine.ai
            </a>
          </div>
        </footer>

        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset All Local Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your local data including journal entries, readiness history, and profile settings on this device. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetData} className="bg-destructive text-destructive-foreground">
                Reset Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
