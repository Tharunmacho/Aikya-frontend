import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        
        // Redirect based on user role
        setTimeout(() => {
          if (response.data.isAdmin) {
            navigate("/admin-cms");
          } else {
            navigate("/");
          }
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

  return (
    <>
      <Helmet>
        <title>Login | Aikya Builds Future</title>
        <meta name="description" content="Log in to your Aikya Builds Future account" />
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
          className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-body text-sm">Back</span>
        </motion.button>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-card-glass rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="font-body text-muted-foreground">
                Log in to your Aikya Builders account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="font-body text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="font-body text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold py-6 text-base glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log in"}
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
          </div>
        </motion.div>
      </div>

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
    </>
  );
};

export default Login;
