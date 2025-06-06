import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Users, Play } from 'lucide-react';
import { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'featured';
  showProgress?: boolean;
  progress?: number;
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
  className?: string;
}

export const CourseCard = ({
  course,
  variant = 'default',
  showProgress = false,
  progress = 0,
  onEnroll,
  onContinue,
  className,
}: CourseCardProps) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Card className={cn(
      'hover:shadow-lg transition-all duration-200 group',
      isFeatured && 'border-primary bg-gradient-to-br from-primary/5 to-primary/10',
      className
    )}>
      {/* Thumbnail */}
      <div className={cn(
        'relative overflow-hidden',
        isCompact ? 'h-32' : 'h-48'
      )}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button size="sm" variant="secondary" className="rounded-full">
            <Play className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
        
        {/* Featured badge */}
        {isFeatured && (
          <Badge className="absolute top-2 right-2" variant="default">
            Featured
          </Badge>
        )}
        
        {/* Difficulty level */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 capitalize"
        >
          {course.level}
        </Badge>
      </div>

      <CardHeader className={cn(isCompact && 'pb-2')}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={cn(
            'line-clamp-2',
            isCompact ? 'text-sm' : 'text-base'
          )}>
            {course.title}
          </CardTitle>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        {!isCompact && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        )}
      </CardHeader>

      <CardContent className={cn(isCompact && 'pt-0')}>
        {/* Course meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.studentsCount?.toLocaleString()}</span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            {course.instructor.name}
          </span>
        </div>

        {/* Progress bar (if enrolled) */}
        {showProgress && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Price and action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.price > 0 ? (
              <>
                <span className="font-bold text-lg">
                  R$ {course.price?.toFixed(2)}
                </span>
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {course.originalPrice.toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <Badge variant="secondary">Gratuito</Badge>
            )}
          </div>

          {showProgress ? (
            <Button 
              size="sm" 
              onClick={() => onContinue?.(course.id)}
            >
              Continue
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => onEnroll?.(course.id)}
            >
              Enroll
            </Button>
          )}
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && !isCompact && (
          <div className="flex flex-wrap gap-1 mt-3">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
