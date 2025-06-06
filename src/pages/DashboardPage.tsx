
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentUser, getEnrolledCourses, getRecentActivities, getRecommendedCourses } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

const DashboardPage = () => {
  const { t } = useI18n();
  const user = getCurrentUser();
  const enrolledCourses = getEnrolledCourses();
  const activities = getRecentActivities();
  const recommendedCourses = getRecommendedCourses();
  const navigate = useNavigate();

  const stats = [
    {
      title: t('dashboard.enrolled'),
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('dashboard.completed'),
      value: user.completedCourses.length,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('dashboard.certificates'),
      value: user.certificates,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: t('dashboard.hours'),
      value: user.studyHours,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.welcome')}, {user.name.split(' ')[0]}! 🎓
        </h1>
        <p className="text-gray-600 mt-2">
          {t('dashboard.subtitle')} Você já acumulou {user.studyHours} horas de aprendizado!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg mr-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {t('dashboard.continue')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.pickupwhere')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{course.title}</h4>
                  <span className="text-xs text-gray-500">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {course.instructor.name}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {t('dashboard.continuebtn')}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.activity')}</CardTitle>
            <CardDescription>
              {t('dashboard.latestactivities')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'completed' ? 'bg-green-500' :
                  activity.type === 'enrolled' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.type === 'completed' && t('dashboard.activitycompleted')}
                    {activity.type === 'enrolled' && t('dashboard.activityenrolled')}
                    {activity.type === 'certificate' && t('dashboard.activitycertificate')}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.courseTitle}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('dashboard.recommended')}</CardTitle>
              <CardDescription>
                {t('dashboard.basedon')}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
            >
              {t('dashboard.viewall')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.slice(0, 4).map((course) => (
              <div key={course.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {course.instructor.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>⭐ {course.rating}</span>
                    <span>•</span>
                    <span>{course.duration}h</span>
                    {course.price === 0 ? (
                      <span className="text-green-600 font-medium">{t('courses.free')}</span>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {t('courses.viewdetails')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
