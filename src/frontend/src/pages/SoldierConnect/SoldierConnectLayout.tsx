import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookHeart, Users, Target, Bell, Shield } from 'lucide-react';

export default function SoldierConnectLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/soldier-connect', label: 'Home', icon: Users, exact: true },
    { path: '/soldier-connect/discussions', label: 'Discussions', icon: MessageSquare },
    { path: '/soldier-connect/stories', label: 'Stories', icon: BookHeart },
    { path: '/soldier-connect/mentorship', label: 'Mentorship', icon: Users },
    { path: '/soldier-connect/challenges', label: 'Challenges', icon: Target },
    { path: '/soldier-connect/notifications', label: 'Notifications', icon: Bell },
    { path: '/soldier-connect/safety', label: 'Safety', icon: Shield },
  ];

  return (
    <div className="soldier-connect-wrapper">
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Soldier Connect</h1>
          <p className="text-muted-foreground">
            Your offline-first community workspace for peer learning, mentorship, and accountability
          </p>
        </div>

        <nav className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            
            return (
              <Button
                key={item.path}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => navigate({ to: item.path })}
                className="whitespace-nowrap"
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
