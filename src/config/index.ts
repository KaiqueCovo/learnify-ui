// Environment configuration
export const config = {
  app: {
    name: 'Learnify',
    version: '1.0.0',
    description: 'Plataforma moderna de aprendizado online',
    url: process.env.VITE_APP_URL || 'http://localhost:5173',
  },
  
  api: {
    baseUrl: process.env.VITE_API_URL || '/api',
    timeout: 10000,
    retries: 3,
  },
  
  auth: {
    tokenKey: 'learnify_token',
    refreshTokenKey: 'learnify_refresh_token',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  storage: {
    prefix: 'learnify_',
    version: '1.0',
  },
  
  cache: {
    defaultStaleTime: 5 * 60 * 1000, // 5 minutes
    defaultGcTime: 10 * 60 * 1000, // 10 minutes
  },
  
  features: {
    enableAnalytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    enablePWA: process.env.VITE_ENABLE_PWA === 'true',
    enableOfflineMode: process.env.VITE_ENABLE_OFFLINE === 'true',
    enableDarkMode: true,
    enableI18n: true,
  },
  
  ui: {
    defaultTheme: 'light' as const,
    defaultLanguage: 'pt' as const,
    itemsPerPage: 12,
    maxUploadSize: 10 * 1024 * 1024, // 10MB
  },
  
  development: {
    enableDevTools: process.env.NODE_ENV === 'development',
    enableMockData: process.env.VITE_USE_MOCK_DATA !== 'false',
    logLevel: process.env.VITE_LOG_LEVEL || 'info',
  },
} as const;

// Type-safe environment variables
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  VITE_APP_URL: process.env.VITE_APP_URL,
  VITE_API_URL: process.env.VITE_API_URL,
  VITE_ENABLE_ANALYTICS: process.env.VITE_ENABLE_ANALYTICS,
  VITE_ENABLE_PWA: process.env.VITE_ENABLE_PWA,
  VITE_USE_MOCK_DATA: process.env.VITE_USE_MOCK_DATA,
} as const;

// Validate required environment variables
const requiredEnvVars = [] as const;

for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is not set`);
  }
}
