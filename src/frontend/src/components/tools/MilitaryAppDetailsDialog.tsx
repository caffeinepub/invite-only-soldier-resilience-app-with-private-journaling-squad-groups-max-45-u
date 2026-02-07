/**
 * Military App Details Dialog
 * 
 * Displays full app information including how-to-use, download links, and tags.
 * External links open in new tab with proper security attributes.
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import type { MilitaryApp } from '../../types/militaryApps';

interface MilitaryAppDetailsDialogProps {
  app: MilitaryApp | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MilitaryAppDetailsDialog({
  app,
  open,
  onOpenChange
}: MilitaryAppDetailsDialogProps) {
  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={app.iconPath}
              alt={app.name}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <DialogTitle className="text-xl">{app.name}</DialogTitle>
              <DialogDescription className="text-sm font-medium text-foreground mt-1">
                {app.oneLine}
              </DialogDescription>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {app.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        {/* How to Use */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">How Soldiers Can Use It</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {app.howToUse}
          </p>
        </div>

        <Separator className="my-4" />

        {/* Download Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Download</h3>
          <div className="flex flex-wrap gap-2">
            {app.downloadLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  {link.platform}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
