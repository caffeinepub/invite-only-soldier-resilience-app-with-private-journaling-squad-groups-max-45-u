import React, { useReducer, useCallback, useEffect } from 'react';
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
  Menu,
  Brain,
  ChevronDown,
  ChevronRight,
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
import { useIsMobile } from '../../hooks/useIsMobile';
import FieldModeToggle from '../fieldMode/FieldModeToggle';
import BrandHeaderBanner from '../branding/BrandHeaderBanner';
import { DashboardRefreshProvider, useDashboardRefresh } from '../../contexts/DashboardRefreshContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: string;
}

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
  { label: 'IZOF', path: '/mental-performance/izof', icon: Brain, section: 'Mental Performance' },
  { label: 'Personal Reports', path: '/reports', icon: FileText, section: 'Tools' },
  { label: 'Guidelines', path: '/guidelines', icon: FileText, section: 'Settings' },
  { label: 'Settings', path: '/settings', icon: Settings, section: 'Settings' },
  { label: 'Admin Reports', path: '/admin/reports', icon: Shield, section: 'Admin' },
];

interface AppShellProps {
  children: React.ReactNode;
}

// Navigation state management
type NavState = {
  sidebarOpen: boolean;
  expandedCategories: Set<string>;
};

type NavAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; open: boolean }
  | { type: 'TOGGLE_CATEGORY'; category: string };

function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.open };
    case 'TOGGLE_CATEGORY': {
      const newExpanded = new Set(state.expandedCategories);
      if (newExpanded.has(action.category)) {
        newExpanded.delete(action.category);
      } else {
        newExpanded.add(action.category);
      }
      return { ...state, expandedCategories: newExpanded };
    }
    default:
      return state;
  }
}

function AppShellContent({ children }: AppShellProps) {
  const isMobile = useIsMobile();
  const [navState, dispatch] = useReducer(navReducer, {
    sidebarOpen: !isMobile,
    expandedCategories: new Set(['main', 'Performance', 'Mental Performance', 'Tools', 'Settings', 'Admin']),
  });

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const { profile, reset } = useLocalProfile();
  const { requestDashboardRefresh } = useDashboardRefresh();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      dispatch({ type: 'SET_SIDEBAR', open: false });
    }
  }, [pathname, isMobile]);

  // Update sidebar state when switching between mobile/desktop
  useEffect(() => {
    if (!isMobile && !navState.sidebarOpen) {
      dispatch({ type: 'SET_SIDEBAR', open: true });
    }
  }, [isMobile, navState.sidebarOpen]);

  const handleLogout = useCallback(async () => {
    await clear();
    reset();
  }, [clear, reset]);

  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  }, [pathname]);

  const handleDashboardClick = useCallback((e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      requestDashboardRefresh();
    }
  }, [pathname, requestDashboardRefresh]);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const closeSidebar = useCallback(() => {
    dispatch({ type: 'SET_SIDEBAR', open: false });
  }, []);

  const toggleCategory = useCallback((category: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', category });
  }, []);

  const groupedNavItems = React.useMemo(() => {
    const groups: Record<string, NavItem[]> = { main: [] };
    navItems.forEach((item) => {
      const section = item.section || 'main';
      if (!groups[section]) groups[section] = [];
      groups[section].push(item);
    });
    return groups;
  }, []);

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <>
      <ScrollArea className="flex-1">
        <nav className={`space-y-2 ${collapsed ? 'px-2 py-4' : 'px-3 py-4'}`}>
          {Object.entries(groupedNavItems).map(([section, items]) => {
            const isExpanded = navState.expandedCategories.has(section);
            const isMainSection = section === 'main';

            return (
              <div key={section}>
                {!isMainSection && !collapsed && (
                  <>
                    <Separator className="my-2" />
                    <button
                      onClick={() => toggleCategory(section)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    >
                      <span>{section}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </button>
                  </>
                )}
                <div
                  className={`space-y-1 transition-all duration-200 ${
                    !isMainSection && !collapsed && !isExpanded
                      ? 'max-h-0 overflow-hidden opacity-0'
                      : 'max-h-[2000px] opacity-100'
                  }`}
                >
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={item.path === '/' ? handleDashboardClick : undefined}
                        className="block"
                      >
                        <Button
                          variant={active ? 'secondary' : 'ghost'}
                          className={collapsed ? 'w-full p-0' : 'w-full justify-start'}
                          size={collapsed ? 'icon' : 'sm'}
                          aria-current={active ? 'page' : undefined}
                          aria-label={collapsed ? item.label : undefined}
                        >
                          <Icon className={collapsed ? 'h-5 w-5' : 'mr-2 h-4 w-4'} />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="p-3 border-t flex-shrink-0">
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
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/guidelines" className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Guidelines
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FieldModeToggle />
              </DropdownMenuItem>
              {identity && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );

  const sidebarCollapsed = !navState.sidebarOpen || (isMobile && !navState.sidebarOpen);
  const showDesktopCollapsed = !isMobile && !navState.sidebarOpen;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile overlay backdrop */}
      {isMobile && navState.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu button - only show when sidebar is closed */}
      {isMobile && !navState.sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-card border shadow-lg"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-card border-r flex-shrink-0 transition-all duration-300 ${
          isMobile
            ? navState.sidebarOpen
              ? 'fixed inset-y-0 left-0 w-64 z-50'
              : 'hidden'
            : navState.sidebarOpen
            ? 'w-64'
            : 'w-16'
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`border-b flex items-center flex-shrink-0 ${
            navState.sidebarOpen ? 'p-4 justify-between' : 'p-3 justify-center'
          }`}
        >
          {navState.sidebarOpen ? (
            <>
              <Link to="/" onClick={handleDashboardClick} className="flex-1 min-w-0">
                <h2 className="text-lg font-bold truncate">Dagger H2F</h2>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={isMobile ? closeSidebar : toggleSidebar}
                aria-label={isMobile ? 'Close menu' : 'Collapse sidebar'}
                className="flex-shrink-0"
              >
                {isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        <SidebarContent collapsed={showDesktopCollapsed} />
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <BrandHeaderBanner />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <DashboardRefreshProvider>
      <AppShellContent>{children}</AppShellContent>
    </DashboardRefreshProvider>
  );
}
