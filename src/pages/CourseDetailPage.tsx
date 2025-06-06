
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Download, Star, Users, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCourseById } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = id ? getCourseById(id) : null;

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <Button onClick={() => navigate('/courses')}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleEnroll = () => {
    navigate(`/enroll/${course.id}`);
  };

  const mockReviews = [
    {
      id: '1',
      userName: 'Amanda Silva',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      comment: 'Excellent course! Very clear explanations and practical examples.',
      date: '2024-01-10'
    },
    {
      id: '2',
      userName: 'Carlos Santos',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      rating: 4,
      comment: 'Great content and well-structured modules. Highly recommended!',
      date: '2024-01-08'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Button>

      {/* Course Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-lg overflow-hidden mb-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {course.category}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {course.level}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {course.title}
            </h1>

            <p className="text-lg text-gray-600">
              {course.description}
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-gray-500">Instructor</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {course.price === 0 ? (
                  <div className="text-3xl font-bold text-green-600">Free</div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </div>
                )}
              </div>

              <Button 
                size="lg" 
                className="w-full mb-4"
                onClick={handleEnroll}
              >
                Enroll Now
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span>Community access</span>
                </div>
              </div>

              {course.features && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningOutcomes?.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {course.requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">
                      Module {index + 1}: {module.title}
                    </h3>
                    {module.duration && (
                      <span className="text-sm text-gray-500">
                        {module.duration} hours
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center gap-2 text-sm">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor">
          <Card>
            <CardHeader>
              <CardTitle>About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{course.instructor.name}</h3>
                  {course.instructor.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.instructor.rating} instructor rating</span>
                      </div>
                      {course.instructor.courses && (
                        <span className="text-gray-500">
                          • {course.instructor.courses} courses
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userAvatar} />
                      <AvatarFallback>
                        {review.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailPage;
