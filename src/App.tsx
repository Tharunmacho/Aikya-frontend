import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import News from "./pages/News";
import CSR from "./pages/CSR";
import Events from "./pages/Events";
import Careers from "./pages/Careers";
import GroupOfCompany from "./pages/GroupOfCompany";
import PartnerWithUs from "./pages/PartnerWithUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import AdminCMS from "./pages/AdminCMS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news" element={<News />} />
              <Route path="/csr" element={<CSR />} />
              <Route path="/events" element={<Events />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/group-of-company" element={<GroupOfCompany />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin-cms" element={<AdminCMS />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
