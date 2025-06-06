
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getAllCourses, searchCourses, filterCourses } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    price: 'all',
    duration: 'all',
  });
  const [sortBy, setSortBy] = useState('popular');
  
  const navigate = useNavigate();
  const allCourses = getAllCourses();

  const filteredCourses = useMemo(() => {
    let courses = allCourses;

    // Apply search
    if (searchQuery) {
      courses = searchCourses(searchQuery);
    }

    // Apply filters
    courses = filterCourses({
      category: filters.category !== 'all' ? filters.category : undefined,
      level: filters.level !== 'all' ? filters.level : undefined,
      price: filters.price !== 'all' ? filters.price : undefined,
      duration: filters.duration !== 'all' ? filters.duration : undefined,
    });

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        courses.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'rating':
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        courses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        courses.sort((a, b) => b.price - a.price);
        break;
      case 'recent':
        // For demo, just reverse the order
        courses.reverse();
        break;
      default:
        break;
    }

    return courses;
  }, [searchQuery, filters, sortBy, allCourses]);

  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const priceOptions = ['all', 'free', 'paid'];
  const durationOptions = ['all', 'short', 'medium', 'long'];

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div onClick={() => navigate(`/courses/${course.id}`)}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            {course.price === 0 ? (
              <Badge className="bg-green-500 hover:bg-green-600">Free</Badge>
            ) : (
              <Badge variant="secondary">${course.price}</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{course.instructor.name}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                ⭐ {course.rating}
              </span>
              <span>{course.studentsCount.toLocaleString()} students</span>
              <span>{course.duration}h</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {course.level}
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
        <p className="text-gray-600 mt-2">
          Discover new skills and advance your career with our expert-led courses.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select 
            value={filters.category} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.level} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.price} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, price: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {priceOptions.map(price => (
                <SelectItem key={price} value={price}>
                  {price === 'all' ? 'All Prices' : price === 'free' ? 'Free' : 'Paid'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.duration} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map(duration => (
                <SelectItem key={duration} value={duration}>
                  {duration === 'all' ? 'All Duration' : 
                   duration === 'short' ? '< 5 hours' :
                   duration === 'medium' ? '5-20 hours' : '20+ hours'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {allCourses.length} courses
        </p>
        {(searchQuery || Object.values(filters).some(f => f !== 'all')) && (
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setFilters({ category: 'all', level: 'all', price: 'all', duration: 'all' });
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
