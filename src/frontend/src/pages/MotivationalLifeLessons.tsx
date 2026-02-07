/**
 * Motivational Life Lessons & Rationality for Soldiers Page
 * 
 * Interactive catalog of 100 motivational videos organized by category
 * with filtering, search, and in-app video playback.
 */

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Target } from 'lucide-react';
import { motivationalVideos, getCategories } from '../content/mentalPerformance/motivationalLifeLessonsVideos';
import MotivationalVideoCard from '../components/mentalPerformance/MotivationalVideoCard';
import YouTubePlayerDialog from '../components/mentalPerformance/YouTubePlayerDialog';
import type { MotivationalVideo, VideoCategoryTag } from '../types/motivationalVideos';

export default function MotivationalLifeLessons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategoryTag | 'All'>('All');
  const [selectedVideo, setSelectedVideo] = useState<MotivationalVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = getCategories();

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = motivationalVideos;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.categoryTag === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.lessonSummary.toLowerCase().includes(query) ||
        video.soldierTakeaway.toLowerCase().includes(query) ||
        video.categoryTag.toLowerCase().includes(query)
      );
    }

    // Sort by impact score (high to low)
    return [...filtered].sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0));
  }, [searchQuery, selectedCategory]);

  // Group videos by category for display when showing all
  const groupedVideos = useMemo(() => {
    if (selectedCategory !== 'All') return null;

    const groups: Record<string, MotivationalVideo[]> = {};
    filteredVideos.forEach(video => {
      if (!groups[video.categoryTag]) {
        groups[video.categoryTag] = [];
      }
      groups[video.categoryTag].push(video);
    });
    return groups;
  }, [filteredVideos, selectedCategory]);

  const handleVideoClick = (video: MotivationalVideo) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  return (
    <div className="container py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Motivational Life Lessons & Rationality for Soldiers</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          100 high-impact videos for mental readiness, resilience, leadership, and rational decision-making.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, lesson, or takeaway..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'All' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('All')}
          >
            All ({motivationalVideos.length})
          </Button>
          {categories.map(category => {
            const count = motivationalVideos.filter(v => v.categoryTag === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category as VideoCategoryTag)}
              >
                {category} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Videos Display */}
      {filteredVideos.length === 0 ? (
        <Alert>
          <AlertDescription>
            No videos found matching your search or filter. Try adjusting your criteria.
          </AlertDescription>
        </Alert>
      ) : selectedCategory === 'All' && groupedVideos ? (
        // Grouped by category
        <div className="space-y-12">
          {Object.entries(groupedVideos).map(([category, videos]) => (
            <div key={category}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-1">{category}</h2>
                <p className="text-sm text-muted-foreground">
                  {videos.length} video{videos.length !== 1 ? 's' : ''}
                </p>
              </div>
              <Separator className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map(video => (
                  <MotivationalVideoCard
                    key={video.id}
                    video={video}
                    onClick={() => handleVideoClick(video)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Single category or filtered view
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map(video => (
            <MotivationalVideoCard
              key={video.id}
              video={video}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
      )}

      {/* Video Player Dialog */}
      <YouTubePlayerDialog
        video={selectedVideo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
