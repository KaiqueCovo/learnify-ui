
import { User, Course, Activity } from '@/types';
import usersData from '@/data/users.json';
import coursesData from '@/data/courses.json';
import activitiesData from '@/data/activities.json';

export const getCurrentUser = (): User => {
  return usersData.currentUser as User;
};

export const getAllCourses = (): Course[] => {
  return coursesData as Course[];
};

export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id) as Course | undefined;
};

export const getEnrolledCourses = (): Course[] => {
  const user = getCurrentUser();
  return coursesData.filter(course => 
    user.enrolledCourses.includes(course.id)
  ) as Course[];
};

export const getCompletedCourses = (): Course[] => {
  const user = getCurrentUser();
  return coursesData.filter(course => 
    user.completedCourses.includes(course.id)
  ) as Course[];
};

export const getRecentActivities = (): Activity[] => {
  return activitiesData as Activity[];
};

export const getCoursesByCategory = (category: string): Course[] => {
  return coursesData.filter(course => 
    course.category.toLowerCase() === category.toLowerCase()
  ) as Course[];
};

export const searchCourses = (query: string): Course[] => {
  const searchTerm = query.toLowerCase();
  return coursesData.filter(course =>
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm) ||
    course.instructor.name.toLowerCase().includes(searchTerm)
  ) as Course[];
};

export const filterCourses = (filters: {
  category?: string;
  level?: string;
  price?: string;
  duration?: string;
}): Course[] => {
  let filtered = coursesData as Course[];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(course => 
      course.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.level && filters.level !== 'all') {
    filtered = filtered.filter(course => course.level === filters.level);
  }

  if (filters.price) {
    if (filters.price === 'free') {
      filtered = filtered.filter(course => course.price === 0);
    } else if (filters.price === 'paid') {
      filtered = filtered.filter(course => course.price > 0);
    }
  }

  if (filters.duration) {
    if (filters.duration === 'short') {
      filtered = filtered.filter(course => course.duration < 5);
    } else if (filters.duration === 'medium') {
      filtered = filtered.filter(course => course.duration >= 5 && course.duration <= 20);
    } else if (filters.duration === 'long') {
      filtered = filtered.filter(course => course.duration > 20);
    }
  }

  return filtered;
};

export const getRecommendedCourses = (): Course[] => {
  // Return highest rated courses
  return coursesData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4) as Course[];
};

// Mock authentication
export const mockLogin = (email: string, password: string): boolean => {
  // Any email/password combination works for demo
  return email.includes('@') && password.length > 0;
};
