import React, { useState, useMemo } from 'react';
import { Play, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motivationalVideos, getCategories } from '../content/mentalPerformance/motivationalLifeLessonsVideos';
import type { MotivationalVideo, VideoCategoryTag } from '../types/motivationalVideos';
import MotivationalVideoCard from '../components/mentalPerformance/MotivationalVideoCard';
import YouTubePlayerDialog from '../components/mentalPerformance/YouTubePlayerDialog';
import { validateMotivationalVideos } from '../utils/validateMotivationalVideos';

export default function MotivationalLifeLessons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategoryTag | 'All'>('All');
  const [selectedVideo, setSelectedVideo] = useState<MotivationalVideo | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Run validation in development
  React.useEffect(() => {
    validateMotivationalVideos();
  }, []);

  // Get categories with counts
  const categories = useMemo(() => getCategories(), []);

  // Filter videos
  const filteredVideos = useMemo(() => {
    let filtered = motivationalVideos;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((video) => video.categoryTag === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.lessonSummary.toLowerCase().includes(query) ||
          video.soldierTakeaway.toLowerCase().includes(query) ||
          video.categoryTag.toLowerCase().includes(query) ||
          video.badges?.some((badge) => badge.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group videos by category for display
  const groupedVideos = useMemo(() => {
    const groups = new Map<VideoCategoryTag, MotivationalVideo[]>();

    filteredVideos.forEach((video) => {
      const existing = groups.get(video.categoryTag) || [];
      groups.set(video.categoryTag, [...existing, video]);
    });

    // Sort each group by impact score (descending)
    groups.forEach((videos, category) => {
      groups.set(
        category,
        videos.sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0))
      );
    });

    return groups;
  }, [filteredVideos]);

  const handleVideoClick = (video: MotivationalVideo) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = (open: boolean) => {
    setIsPlayerOpen(open);
    if (!open) {
      setSelectedVideo(null);
    }
  };

  const totalVideos = motivationalVideos.length;

  // When there are zero videos, render nothing (chrome-only page)
  if (totalVideos === 0) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Motivational Life Lessons</h1>
              <p className="text-muted-foreground mt-1">
                Curated videos for resilience, leadership, and mental performance
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="border-b bg-card/30 backdrop-blur-sm sticky top-[120px] z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('All')}
            >
              All ({totalVideos})
            </Button>
            {categories.map(({ tag, count }) => (
              <Button
                key={tag}
                variant={selectedCategory === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(tag)}
              >
                {tag} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredVideos.length === 0 ? (
          // When filters yield zero results, render nothing (no "no results" message)
          <div />
        ) : (
          <div className="space-y-12">
            {Array.from(groupedVideos.entries() as Iterable<[VideoCategoryTag, MotivationalVideo[]]>).map(
              ([category, videos]) => (
                <section key={category}>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                    <Badge variant="secondary">{videos.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <MotivationalVideoCard
                        key={video.id}
                        video={video}
                        onClick={() => handleVideoClick(video)}
                      />
                    ))}
                  </div>
                </section>
              )
            )}
          </div>
        )}
      </main>

      {/* YouTube Player Dialog */}
      <YouTubePlayerDialog
        video={selectedVideo}
        open={isPlayerOpen}
        onOpenChange={handleClosePlayer}
      />
    </div>
  );
}
