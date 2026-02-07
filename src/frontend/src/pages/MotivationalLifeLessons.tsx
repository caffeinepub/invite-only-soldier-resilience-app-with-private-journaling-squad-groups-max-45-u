import React, { useState, useMemo } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motivationalVideos, getCategories } from '../content/mentalPerformance/motivationalLifeLessonsVideos';
import type { MotivationalVideo, VideoCategoryTag } from '../types/motivationalVideos';
import MotivationalVideoCard from '../components/mentalPerformance/MotivationalVideoCard';
import YouTubePlayerDialog from '../components/mentalPerformance/YouTubePlayerDialog';
import { validateMotivationalVideos } from '../utils/validateMotivationalVideos';
import { useAllLifeLessonsProgress } from '../hooks/useLifeLessonsProgress';

export default function MotivationalLifeLessons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategoryTag | 'All'>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MotivationalVideo | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const allProgress = useAllLifeLessonsProgress();

  // Run validation in development
  React.useEffect(() => {
    validateMotivationalVideos();
  }, []);

  // Get categories with counts
  const categories = useMemo(() => getCategories(), []);

  // Filter videos
  const filteredVideos = useMemo(() => {
    let filtered = motivationalVideos;

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((video) => allProgress[video.id]?.isFavorited);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, showFavoritesOnly, allProgress]);

  // Group videos by category for display
  const groupedVideos = useMemo(() => {
    const groups = new Map<VideoCategoryTag, MotivationalVideo[]>();

    filteredVideos.forEach((video) => {
      const existing = groups.get(video.category) || [];
      groups.set(video.category, [...existing, video]);
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
  const favoritedCount = Object.values(allProgress).filter((p) => p.isFavorited).length;
  const watchedCount = Object.values(allProgress).filter((p) => p.isWatched).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Life Lessons</h1>
              <p className="text-muted-foreground mt-1">
                Curated videos for resilience, leadership, and mental performance
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{totalVideos} videos</span>
                <span>•</span>
                <span>{favoritedCount} favorited</span>
                <span>•</span>
                <span>{watchedCount} watched</span>
              </div>
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
      <div className="border-b bg-card/30 backdrop-blur-sm sticky top-[140px] z-10">
        <div className="w-full px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          </div>
          
          {/* Favorites Filter */}
          <div className="mb-3">
            <Button
              variant={showFavoritesOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favorites Only
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('All')}
            >
              All ({totalVideos})
            </Button>
            {categories.map(({ tag, count, icon }) => (
              <Button
                key={tag}
                variant={selectedCategory === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(tag)}
              >
                <span className="mr-1">{icon}</span>
                {tag} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <main className="w-full px-4 py-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {showFavoritesOnly
                ? 'No favorited videos yet. Start favoriting videos to see them here!'
                : 'No videos found matching your filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Array.from(groupedVideos.entries()).map(([category, videos]) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{videos[0].icon}</span>
                  <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                  <Badge variant="secondary">{videos.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <MotivationalVideoCard
                      key={video.id}
                      video={video}
                      onClick={() => handleVideoClick(video)}
                    />
                  ))}
                </div>
              </section>
            ))}
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
