import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BookOpen, Users, FileText, Settings, Shield, LogOut, Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const navItems = [
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/groups', label: 'Groups', icon: Users },
    { path: '/modules', label: 'Modules', icon: FileText }
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline">Resilience</span>
            </button>

            <nav className="hidden md:flex items-center gap-2">
              <NavLinks />
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks mobile />
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
                <div className="px-2 py-1.5 text-sm font-medium">{userProfile?.username || 'User'}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/guidelines' })}>
                  <FileText className="mr-2 h-4 w-4" />
                  Guidelines
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/settings' })}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings & About
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate({ to: '/admin/reports' })}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Reports
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

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
    </div>
  );
}
