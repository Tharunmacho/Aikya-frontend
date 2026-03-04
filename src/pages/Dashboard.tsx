import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/api";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LeadershipSection from "@/components/LeadershipSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, login } = useAuth();
  const { toast } = useToast();
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        // Use auth context to login
        login(response.data);
        
        // Show success message
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${response.data.fullName}!`,
        });
        
        // Redirect to home page
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Dashboard - Login | Aikya Builds Future</title>
          <meta name="description" content="Login to your dashboard" />
        </Helmet>

        <div className="min-h-screen bg-navy-gradient relative overflow-hidden flex items-center justify-center">
          {/* Cosmic Background Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-glow/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="stars absolute inset-0"></div>
          </div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/")}
            className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <ArrowLeft size={20} />
            <span className="font-body text-sm">Back to Home</span>
          </motion.button>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <Card className="bg-card-glass border-border shadow-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Dashboard Login
                </CardTitle>
                <CardDescription className="font-body text-lg text-muted-foreground mt-2">
                  Login with your credentials to view your profile
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-body text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-navy-light border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="font-body text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-navy-light border-border text-foreground placeholder:text-muted-foreground pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold py-6 text-base glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Logging in..." : "Login to Dashboard"}
                  </Button>

                  {/* Sign Up Link */}
                  <div className="text-center mt-6">
                    <span className="font-body text-sm text-muted-foreground">
                      Don't have an account?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="font-body text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <style>{`
            .stars {
              background-image: 
                radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 60px 70px, #fff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 50px 50px, #fff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 90px 10px, #fff, rgba(0,0,0,0));
              background-repeat: repeat;
              background-size: 200px 200px;
              opacity: 0.4;
              animation: stars 20s linear infinite;
            }
            
            @keyframes stars {
              from { transform: translateY(0); }
              to { transform: translateY(-200px); }
            }
          `}</style>
        </div>
      </>
    );
  }

  // Show homepage content when authenticated
  return (
    <>
      <Helmet>
        <title>Dashboard | Aikya Builds Future</title>
        <meta name="description" content="Your personalized dashboard" />
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <LeadershipSection />
        <WhyChooseSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating Contact Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={scrollToContact}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-[#F4B942] hover:bg-[#F4B942]/90 text-[#0A0F1E] px-6 py-4 rounded-full font-body font-semibold shadow-2xl transition-all hover:scale-105"
        aria-label="Contact Us"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Contact Us</span>
      </motion.button>
    </>
  );
};

export default Dashboard;
