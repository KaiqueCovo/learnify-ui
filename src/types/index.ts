
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: number;
  studyHours: number;
  joinDate?: string;
  level?: string;
  favoriteCategories?: string[];
}

export interface Instructor {
  name: string;
  avatar: string;
  bio: string;
  rating?: number;
  courses?: number;
  experience?: string;
  specialties?: string[];
}

export interface CourseModule {
  title: string;
  lessons: string[];
  duration?: number;
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  thumbnail: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  studentsCount: number;
  category: string;
  tags?: string[];
  modules: CourseModule[];
  features?: string[];
  requirements?: string[];
  learningOutcomes?: string[];
  lastUpdated?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Activity {
  id: string;
  type: 'enrolled' | 'completed' | 'certificate' | 'started' | 'progress_update';
  courseId: string;
  courseTitle: string;
  userId: string;
  date: string;
  progress?: number;
  timeSpent?: string;
  credentialId?: string;
}

export interface EnrollmentData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    documentNumber: string;
  };
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  additionalInfo: {
    educationLevel: string;
    occupation: string;
    hearAboutUs: string;
    goals: string;
    marketingConsent: boolean;
  };
}
