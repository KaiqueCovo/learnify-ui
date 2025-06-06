
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, Award, BookOpen, Download } from 'lucide-react';
import { getCurrentUser, getEnrolledCourses, getCompletedCourses } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const user = getCurrentUser();
  const enrolledCourses = getEnrolledCourses();
  const completedCourses = getCompletedCourses();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo, SP - Brasil',
    bio: 'Desenvolvedora apaixonada por tecnologia e educação digital. Sempre em busca de novos conhecimentos em programação e design de experiência do usuário.',
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const certificates = [
    {
      id: '1',
      courseTitle: 'React Development Fundamentals',
      issuedDate: '2024-03-21',
      instructor: 'Kaique Covo',
      credentialId: 'CERT-REACT-2024-001',
      skills: ['React', 'Hooks', 'Components', 'JSX'],
      validationUrl: 'https://learnify.com/verify/CERT-REACT-2024-001'
    },
    {
      id: '2',
      courseTitle: 'TypeScript and Advanced React Patterns',
      issuedDate: '2024-03-01',
      instructor: 'Pedro Oliveira',
      credentialId: 'CERT-TS-2024-002',
      skills: ['TypeScript', 'React Patterns', 'State Management', 'Custom Hooks'],
      validationUrl: 'https://learnify.com/verify/CERT-TS-2024-002'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{profileData.email}</p>
                  <div className="space-y-2 text-sm text-left">
                    <div>
                      <span className="font-medium">Phone:</span>
                      <span className="ml-2 text-gray-600">{profileData.phone}</span>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2 text-gray-600">{profileData.location}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {enrolledCourses.length}
                    </div>
                    <div className="text-sm text-gray-600">Enrolled</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {completedCourses.length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {user.certificates}
                    </div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {user.studyHours}
                    </div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Enrolled Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructor.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="bg-gray-200 rounded-full h-2 flex-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                          </div>
                          <span className="text-sm text-gray-600">65%</span>
                        </div>
                      </div>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Completed Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.instructor.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Completed on January 10, 2024
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    My Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{certificate.courseTitle}</h3>
                          <p className="text-sm text-gray-600">
                            Instructor: {certificate.instructor}
                          </p>
                          <p className="text-sm text-gray-500">
                            Issued: {new Date(certificate.issuedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="font-medium">Completed "UI/UX Design Mastery"</p>
                        <p className="text-sm text-gray-500">January 10, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="font-medium">Enrolled in "React Development Fundamentals"</p>
                        <p className="text-sm text-gray-500">January 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <div>
                        <p className="font-medium">Earned certificate for "Python Programming"</p>
                        <p className="text-sm text-gray-500">January 5, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
