import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Zap, Award, TrendingUp } from 'lucide-react';
import type { ReactionType } from '../../types/soldierConnect';

interface ReactionBarProps {
  reactions: Record<ReactionType, number>;
  onReact: (type: ReactionType) => void;
  compact?: boolean;
}

const reactionIcons: Record<ReactionType, React.ReactNode> = {
  'Like': <ThumbsUp className="h-4 w-4" />,
  'Motivated': <Zap className="h-4 w-4" />,
  'Respect': <Award className="h-4 w-4" />,
  'Strong Work': <TrendingUp className="h-4 w-4" />,
};

export default function ReactionBar({ reactions, onReact, compact = false }: ReactionBarProps) {
  const reactionTypes: ReactionType[] = ['Like', 'Motivated', 'Respect', 'Strong Work'];

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {reactionTypes.map(type => {
          const count = reactions[type] || 0;
          if (count === 0) return null;
          return (
            <Badge key={type} variant="secondary" className="text-xs">
              {reactionIcons[type]}
              <span className="ml-1">{count}</span>
            </Badge>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {reactionTypes.map(type => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          onClick={() => onReact(type)}
          className="gap-1"
        >
          {reactionIcons[type]}
          <span className="text-xs">{reactions[type] || 0}</span>
        </Button>
      ))}
    </div>
  );
}
