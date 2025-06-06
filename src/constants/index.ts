// Route constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  ENROLLMENT: '/enroll/:courseId',
  PROFILE: '/profile',
  RESUME: '/resume',
  JOBS: '/jobs',
  NOT_FOUND: '*',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  COURSES: '/courses',
  ENROLLMENT: '/enrollment',
  ACTIVITIES: '/activities',
  PROGRESS: '/progress',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  USER: 'learnify_user',
  LANGUAGE: 'learnify_language',
  THEME: 'learnify_theme',
  SIDEBAR_STATE: 'learnify_sidebar',
  COURSE_PROGRESS: 'learnify_progress',
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  CURRENT_USER: ['currentUser'] as const,
  COURSES: ['courses'] as const,
  COURSE: (id: string) => ['course', id] as const,
  SEARCH_COURSES: (query: string) => ['searchCourses', query] as const,
  ENROLLED_COURSES: ['enrolledCourses'] as const,
  RECOMMENDED_COURSES: (userId: string) => ['recommendedCourses', userId] as const,
  RECENT_ACTIVITIES: (userId: string) => ['recentActivities', userId] as const,
  USER_STATS: (userId: string) => ['userStats', userId] as const,
  COURSE_PROGRESS: (courseId: string) => ['courseProgress', courseId] as const,
} as const;

// UI constants
export const UI_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_SEARCH_RESULTS: 50,
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 80,
  HEADER_HEIGHT: 64,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ANIMATION_DURATION: 200,
} as const;

// Validation constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  PHONE_REGEX: /^\+55\s\(\d{2}\)\s\d{4,5}-\d{4}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Theme constants
export const THEME = {
  COLORS: {
    PRIMARY: 'hsl(221.2 83.2% 53.3%)',
    SECONDARY: 'hsl(210 40% 98%)',
    ACCENT: 'hsl(210 40% 94%)',
    DESTRUCTIVE: 'hsl(0 84.2% 60.2%)',
    MUTED: 'hsl(210 40% 96%)',
    BORDER: 'hsl(214.3 31.8% 91.4%)',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: false,
  ENABLE_PWA: false,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: true,
  ENABLE_COURSE_RECOMMENDATIONS: true,
  ENABLE_SOCIAL_LOGIN: false,
} as const;

// Course related constants
export const COURSE = {
  LEVELS: ['beginner', 'intermediate', 'advanced'] as const,
  CATEGORIES: [
    'programming',
    'design',
    'business',
    'marketing',
    'photography',
    'music',
  ] as const,
  PRICE_RANGES: [
    { label: 'Free', min: 0, max: 0 },
    { label: 'R$ 1 - R$ 50', min: 1, max: 50 },
    { label: 'R$ 51 - R$ 200', min: 51, max: 200 },
    { label: 'R$ 201+', min: 201, max: Infinity },
  ] as const,
  DURATION_RANGES: [
    { label: '0-2 hours', min: 0, max: 2 },
    { label: '3-6 hours', min: 3, max: 6 },
    { label: '7-17 hours', min: 7, max: 17 },
    { label: '17+ hours', min: 17, max: Infinity },
  ] as const,
} as const;
