import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService, userService, activityService, progressService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Course, EnrollmentData } from '@/types';

// Hook para dados do usuário
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para cursos
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getAllCourses(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para curso específico
export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => courseService.getCourseById(courseId),
    enabled: !!courseId,
  });
};

// Hook para busca de cursos
export const useSearchCourses = (query: string) => {
  return useQuery({
    queryKey: ['searchCourses', query],
    queryFn: () => courseService.searchCourses(query),
    enabled: query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Hook para matrícula em curso
export const useEnrollInCourse = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, enrollmentData }: { courseId: string; enrollmentData: EnrollmentData }) =>
      courseService.enrollInCourse(courseId, enrollmentData),
    onSuccess: (_, { courseId }) => {
      toast({
        title: "Matrícula realizada!",
        description: "Você foi matriculado no curso com sucesso.",
      });
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['enrolledCourses'] });
      
      // Log da atividade
      activityService.logActivity({
        type: 'enrolled',
        courseId,
        courseTitle: 'Curso',
        userId: 'current-user',
      });
    },
    onError: () => {
      toast({
        title: "Erro na matrícula",
        description: "Ocorreu um erro ao matricular no curso. Tente novamente.",
        variant: "destructive",
      });
    },
  });
};

// Hook para progresso do curso
export const useCourseProgress = (courseId: string) => {
  return useQuery({
    queryKey: ['courseProgress', courseId],
    queryFn: () => progressService.getCourseProgress(courseId),
    enabled: !!courseId,
  });
};

// Hook para atualizar progresso
export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, progress }: { courseId: string; progress: number }) =>
      progressService.updateCourseProgress(courseId, progress),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['courseProgress', courseId] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

// Hook para atividades recentes
export const useRecentActivities = (userId: string) => {
  return useQuery({
    queryKey: ['recentActivities', userId],
    queryFn: () => activityService.getRecentActivities(userId),
    enabled: !!userId,
  });
};

// Hook para cursos recomendados
export const useRecommendedCourses = (userId: string) => {
  return useQuery({
    queryKey: ['recommendedCourses', userId],
    queryFn: () => courseService.getRecommendedCourses(userId),
    enabled: !!userId,
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
};

// Hook para estatísticas do usuário
export const useUserStats = (userId: string) => {
  return useQuery({
    queryKey: ['userStats', userId],
    queryFn: () => userService.getUserStats(userId),
    enabled: !!userId,
  });
};
