import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  Home,
  BookOpen,
  Users,
  Target,
  ClipboardList,
  Moon,
  BookMarked,
  Grid3x3,
  Shield,
  FileText,
  Settings,
  Quote,
  Video,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useLocalProfile } from '../../hooks/useLocalProfile';
import FieldModeToggle from '../fieldMode/FieldModeToggle';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: string;
}

// GUARDRAIL: Life Lessons nav item and path must remain unchanged
const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Daily Quotes', path: '/quotes', icon: Quote },
  { label: 'Journal', path: '/journal', icon: BookOpen },
  { label: 'Groups', path: '/groups', icon: Users },
  { label: 'Missions', path: '/modules', icon: Target },
  { label: 'Assessments', path: '/assessments', icon: ClipboardList },
  { label: 'Sleep Performance', path: '/sleep', icon: Moon, section: 'Performance' },
  { label: 'Recommended Reading', path: '/mental-performance/reading', icon: BookMarked, section: 'Mental Performance' },
  { label: 'Free Soldier Apps', path: '/mental-performance/apps', icon: Grid3x3, section: 'Mental Performance' },
  { label: 'Military Apps', path: '/tools/military-apps', icon: Shield, section: 'Mental Performance' },
  { label: 'Life Lessons', path: '/mental-performance/life-lessons', icon: Video, section: 'Mental Performance' },
  { label: 'Personal Reports', path: '/reports', icon: FileText, section: 'Tools' },
];

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const { profile, reset } = useLocalProfile();

  const handleLogout = async () => {
    await clear();
    reset();
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavClick = () => {
    closeDrawer();
  };

  const groupedNavItems = React.useMemo(() => {
    const groups: Record<string, NavItem[]> = { main: [] };
    navItems.forEach((item) => {
      const section = item.section || 'main';
      if (!groups[section]) groups[section] = [];
      groups[section].push(item);
    });
    return groups;
  }, []);

  return (
    <div className="flex h-screen overflow-hidden flex-col">
      {/* Fixed background layer */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-card/50 backdrop-blur-sm border-b flex items-center px-4 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDrawerOpen(true)}
          className="mr-4"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">Dagger H2F</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Mental & Sleep</p>
          </div>
        </Link>
      </header>

      {/* Drawer Overlay (Scrim) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-full bg-card backdrop-blur-sm border-r z-50 flex flex-col transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={handleNavClick}>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Dagger H2F</h1>
              <p className="text-xs text-muted-foreground">Mental & Sleep</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-6">
            {Object.entries(groupedNavItems).map(([section, items]) => (
              <div key={section}>
                {section !== 'main' && (
                  <>
                    <Separator className="my-2" />
                    <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section}
                    </h3>
                  </>
                )}
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link key={item.path} to={item.path} onClick={handleNavClick}>
                        <Button
                          variant={active ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* User Menu */}
        <div className="p-3 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {profile?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {identity ? 'Authenticated' : 'Local Profile'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" onClick={handleNavClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guidelines" onClick={handleNavClick}>
                  <FileText className="mr-2 h-4 w-4" />
                  Guidelines
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FieldModeToggle />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {identity && (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
