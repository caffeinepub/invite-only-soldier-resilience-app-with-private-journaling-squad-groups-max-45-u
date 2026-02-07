/**
 * Military Apps Page
 * 
 * Interactive, scannable directory of free military apps for soldiers and families.
 * Features search, tag filtering, and detailed app information in a dialog.
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Info } from 'lucide-react';
import { militaryApps } from '../content/tools/militaryApps';
import { filterMilitaryApps } from '../utils/militaryAppsFilter';
import MilitaryAppDetailsDialog from '../components/tools/MilitaryAppDetailsDialog';
import type { MilitaryApp, MilitaryAppTag } from '../types/militaryApps';

const availableTags: MilitaryAppTag[] = [
  'Installation Info',
  'Benefits',
  'Mental Wellness',
  'Overseas Life'
];

export default function MilitaryApps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<MilitaryAppTag | null>(null);
  const [selectedApp, setSelectedApp] = useState<MilitaryApp | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredApps = filterMilitaryApps(militaryApps, searchQuery, selectedTag);

  const handleAppClick = (app: MilitaryApp) => {
    setSelectedApp(app);
    setDialogOpen(true);
  };

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Military Apps</h1>
        <p className="text-muted-foreground">
          Free apps for installation info, benefits access, mental wellness, and quality-of-life support for soldiers and families.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search apps by name, description, or use case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tag Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All Apps ({militaryApps.length})
          </Button>
          {availableTags.map(tag => {
            const count = militaryApps.filter(app => app.tags.includes(tag)).length;
            return (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Apps Grid */}
      {filteredApps.length === 0 ? (
        <Alert>
          <AlertDescription>
            No apps found matching your search or filter. Try adjusting your criteria.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map(app => (
            <Card
              key={app.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleAppClick(app)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={app.iconPath}
                    alt={app.name}
                    className="w-12 h-12 rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base leading-tight mb-1">
                      {app.name}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {app.oneLine}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {app.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View Details →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <MilitaryAppDetailsDialog
        app={selectedApp}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
