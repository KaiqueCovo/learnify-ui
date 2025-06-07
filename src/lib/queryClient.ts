import { QueryClient } from '@tanstack/react-query';

// Configuração otimizada do React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache padrão de 5 minutos
      staleTime: 5 * 60 * 1000,
      // Garbage collection após 10 minutos
      gcTime: 10 * 60 * 1000,
      // Retry apenas em caso de erro de rede
      retry: (failureCount, error: unknown) => {
        if (error && typeof error === 'object' && 'status' in error && error.status === 404) return false;
        return failureCount < 3;
      },
      // Refetch em focus para dados críticos
      refetchOnWindowFocus: false,
      // Background refetch
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry para mutations críticas
      retry: 1,
    },
  },
});

// Prefetch de dados críticos
export const prefetchCriticalData = async () => {
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['currentUser'],
      queryFn: async () => {
        const { getCurrentUser } = await import('@/utils/mockData');
        return getCurrentUser();
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['courses'],
      queryFn: async () => {
        const { getAllCourses } = await import('@/utils/mockData');
        return getAllCourses();
      },
    }),
  ]);
};

// Cache invalidation helpers
export const invalidateUserData = () => {
  queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  queryClient.invalidateQueries({ queryKey: ['userStats'] });
  queryClient.invalidateQueries({ queryKey: ['recentActivities'] });
};

export const invalidateCourseData = () => {
  queryClient.invalidateQueries({ queryKey: ['courses'] });
  queryClient.invalidateQueries({ queryKey: ['recommendedCourses'] });
  queryClient.invalidateQueries({ queryKey: ['enrolledCourses'] });
};

// Optimistic updates helpers
export const updateCourseProgressOptimistically = (courseId: string, progress: number) => {
  queryClient.setQueryData(['courseProgress', courseId], progress);
  
  // Atualizar dados do usuário se necessário
  queryClient.setQueryData(['currentUser'], (oldData: unknown) => {
    if (!oldData) return oldData;
    return {
      ...(oldData as Record<string, unknown>),
      // Atualizar progresso nos dados do usuário
    };
  });
};
