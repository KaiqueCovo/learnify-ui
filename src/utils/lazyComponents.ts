// Lazy loading para componentes pesados
import { lazy } from 'react';

// Pages - Lazy loading para reduzir bundle inicial
export const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
export const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
export const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'));
export const EnrollmentPage = lazy(() => import('@/pages/EnrollmentPage'));
export const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
export const ResumePage = lazy(() => import('@/pages/ResumePage'));

// Componentes pesados que podem ser lazy loaded
export const ChartComponents = lazy(() => import('@/components/ui/chart'));
export const CarouselComponents = lazy(() => import('@/components/ui/carousel'));

// Hook para preload de componentes críticos
export const usePreloadCriticalComponents = () => {
  const preloadComponents = () => {
    // Preload das páginas mais acessadas
    import('@/pages/DashboardPage');
    import('@/pages/CoursesPage');
  };

  return { preloadComponents };
};
