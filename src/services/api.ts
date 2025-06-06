import { User, Course, Activity, EnrollmentData } from '@/types';

// Base API service class
class BaseApiService {
  private baseURL = '/api'; // Para quando tiver backend real
  
  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Por enquanto retorna dados mock, mas pode ser facilmente substituído
    throw new Error('Method should be implemented by subclass');
  }
}

// User service
export class UserService extends BaseApiService {
  async getCurrentUser(): Promise<User> {
    // Mock data import
    const { getCurrentUser } = await import('@/utils/mockData');
    return getCurrentUser();
  }
  
  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    // Simulação de API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = await this.getCurrentUser();
    return { ...user, ...data };
  }
  
  async getUserStats(userId: string) {
    const user = await this.getCurrentUser();
    return {
      coursesCompleted: user.completedCourses.length,
      certificatesEarned: user.certificates,
      studyHours: user.studyHours,
      currentStreak: 7, // Mock data
    };
  }
}

// Course service
export class CourseService extends BaseApiService {
  async getAllCourses(): Promise<Course[]> {
    const { getAllCourses } = await import('@/utils/mockData');
    return getAllCourses();
  }
  
  async getCourseById(id: string): Promise<Course | null> {
    const { getCourseById } = await import('@/utils/mockData');
    return getCourseById(id) || null;
  }
  
  async searchCourses(query: string): Promise<Course[]> {
    const { searchCourses } = await import('@/utils/mockData');
    return searchCourses(query);
  }
  
  async enrollInCourse(courseId: string, enrollmentData: EnrollmentData): Promise<boolean> {
    // Simulação de processo de matrícula
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true;
  }
  
  async getCoursesByCategory(category: string): Promise<Course[]> {
    const { getCoursesByCategory } = await import('@/utils/mockData');
    return getCoursesByCategory(category);
  }
  
  async getRecommendedCourses(userId: string): Promise<Course[]> {
    const { getRecommendedCourses } = await import('@/utils/mockData');
    return getRecommendedCourses();
  }
}

// Activity service
export class ActivityService extends BaseApiService {
  async getRecentActivities(userId: string): Promise<Activity[]> {
    const { getRecentActivities } = await import('@/utils/mockData');
    return getRecentActivities();
  }
  
  async logActivity(activity: Omit<Activity, 'id' | 'date'>): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    // Aqui salvaria na API/localStorage
    return newActivity;
  }
}

// Progress service
export class ProgressService extends BaseApiService {
  async updateCourseProgress(courseId: string, progress: number): Promise<void> {
    // Mock implementation
    localStorage.setItem(`progress_${courseId}`, progress.toString());
  }
  
  async getCourseProgress(courseId: string): Promise<number> {
    const saved = localStorage.getItem(`progress_${courseId}`);
    return saved ? parseInt(saved) : 0;
  }
  
  async getAllProgress(): Promise<Record<string, number>> {
    const progress: Record<string, number> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('progress_')) {
        const courseId = key.replace('progress_', '');
        progress[courseId] = parseInt(localStorage.getItem(key) || '0');
      }
    }
    return progress;
  }
}

// Export service instances
export const userService = new UserService();
export const courseService = new CourseService();
export const activityService = new ActivityService();
export const progressService = new ProgressService();
