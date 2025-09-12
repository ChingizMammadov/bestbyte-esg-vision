
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MobileNavigation } from "@/components/MobileNavigation";
import { ScrollbarProvider } from "@/components/ScrollbarProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import CarbonCalculator from "./pages/CarbonCalculator";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import MonthlyReport from "./pages/MonthlyReport";
import AnnualReport from "./pages/AnnualReport";
import CustomReport from "./pages/CustomReport";
import EnvironmentalAnalytics from "./pages/EnvironmentalAnalytics";
import SocialAnalytics from "./pages/SocialAnalytics";
import GovernanceAnalytics from "./pages/GovernanceAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ScrollbarProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }>
                  <Route path="monthly" element={<MonthlyReport />} />
                  <Route path="annual" element={<AnnualReport />} />
                  <Route path="custom" element={<CustomReport />} />
                </Route>
                <Route path="/carbon-calculator" element={
                  <ProtectedRoute>
                    <CarbonCalculator />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }>
                  <Route path="environmental" element={<EnvironmentalAnalytics />} />
                  <Route path="social" element={<SocialAnalytics />} />
                  <Route path="governance" element={<GovernanceAnalytics />} />
                </Route>
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* <MobileNavigation /> */}
            </ScrollbarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
