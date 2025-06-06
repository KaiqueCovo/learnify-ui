
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { I18nProvider } from "@/contexts/I18nContext";
import { AppLayout } from "@/components/layout/AppLayout";

// Lazy load das páginas para melhorar performance
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const EnrollmentPage = lazy(() => import("./pages/EnrollmentPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:id" element={<CourseDetailPage />} />
                <Route path="enroll/:courseId" element={<EnrollmentPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="resume" element={<ResumePage />} />
                <Route path="jobs" element={<div className="p-6"><h1 className="text-2xl font-bold">Job Opportunities</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
