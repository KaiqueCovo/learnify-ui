import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Course, Activity } from '@/types';

interface AppState {
  // User state
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Courses state
  enrolledCourses: Course[];
  completedCourses: Course[];
  favoriteCourses: string[];
  
  // Learning progress
  currentProgress: Record<string, number>;
  studyStreak: number;
  totalStudyTime: number;
  
  // UI state
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'pt' | 'en';
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
  completeCourse: (courseId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
  toggleFavoriteCourse: (courseId: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'pt' | 'en') => void;
  incrementStudyTime: (minutes: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isAuthenticated: false,
      enrolledCourses: [],
      completedCourses: [],
      favoriteCourses: [],
      currentProgress: {},
      studyStreak: 0,
      totalStudyTime: 0,
      sidebarCollapsed: false,
      theme: 'light',
      language: 'pt',
      
      // Actions
      setUser: (user) => set({ currentUser: user, isAuthenticated: true }),
      
      logout: () => set({ 
        currentUser: null, 
        isAuthenticated: false,
        enrolledCourses: [],
        completedCourses: [],
        currentProgress: {},
      }),
      
      enrollInCourse: (courseId) => set((state) => ({
        enrolledCourses: [...state.enrolledCourses.filter(c => c.id !== courseId)],
        currentProgress: { ...state.currentProgress, [courseId]: 0 }
      })),
      
      completeCourse: (courseId) => set((state) => {
        const course = state.enrolledCourses.find(c => c.id === courseId);
        if (!course) return state;
        
        return {
          completedCourses: [...state.completedCourses, course],
          enrolledCourses: state.enrolledCourses.filter(c => c.id !== courseId),
          currentProgress: { ...state.currentProgress, [courseId]: 100 }
        };
      }),
      
      updateProgress: (courseId, progress) => set((state) => ({
        currentProgress: { ...state.currentProgress, [courseId]: progress }
      })),
      
      toggleFavoriteCourse: (courseId) => set((state) => ({
        favoriteCourses: state.favoriteCourses.includes(courseId)
          ? state.favoriteCourses.filter(id => id !== courseId)
          : [...state.favoriteCourses, courseId]
      })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      incrementStudyTime: (minutes) => set((state) => ({
        totalStudyTime: state.totalStudyTime + minutes
      })),
    }),
    {
      name: 'learnify-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
        favoriteCourses: state.favoriteCourses,
        totalStudyTime: state.totalStudyTime,
        studyStreak: state.studyStreak,
      }),
    }
  )
);
