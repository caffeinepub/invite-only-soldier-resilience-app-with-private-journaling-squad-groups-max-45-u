import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookHeart, Users, Target, Bell, Shield, ArrowRight } from 'lucide-react';
import { useSoldierConnect } from '../../hooks/useSoldierConnect';

export default function SoldierConnectHome() {
  const navigate = useNavigate();
  const { state, unreadNotifications } = useSoldierConnect();

  const sections = [
    {
      title: 'Discussion Threads',
      description: 'Join conversations on mental performance, sleep, fitness, leadership, and more',
      icon: MessageSquare,
      path: '/soldier-connect/discussions',
      count: state.threads.length,
      countLabel: 'threads',
    },
    {
      title: 'Peer Stories & Highlights',
      description: 'Share motivational wins, lessons learned, and personal reflections',
      icon: BookHeart,
      path: '/soldier-connect/stories',
      count: state.stories.length,
      countLabel: 'stories',
    },
    {
      title: 'Mentorship & Advice',
      description: 'Get guidance from H2F staff, NCOs, and experienced soldiers',
      icon: Users,
      path: '/soldier-connect/mentorship',
      count: state.mentorNotes.length,
      countLabel: 'mentor notes',
    },
    {
      title: 'Challenges & Missions',
      description: 'Track PT goals, journaling streaks, sleep targets, and mindset drills',
      icon: Target,
      path: '/soldier-connect/challenges',
      count: state.challenges.length,
      countLabel: 'challenges',
    },
    {
      title: 'Notifications',
      description: 'Stay updated on replies, highlights, and challenge reminders',
      icon: Bell,
      path: '/soldier-connect/notifications',
      count: unreadNotifications.length,
      countLabel: 'unread',
    },
    {
      title: 'Safety & Moderation',
      description: 'Community guidelines and content reporting',
      icon: Shield,
      path: '/soldier-connect/safety',
      count: state.flags.length,
      countLabel: 'flags',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Soldier Connect</CardTitle>
          <CardDescription>
            This is your offline-first community workspace. All content is stored locally on your device
            and works without an internet connection. Share insights, learn from peers, and build accountability.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <Card key={section.path} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  {section.count > 0 && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {section.count} {section.countLabel}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: section.path })}
                >
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
