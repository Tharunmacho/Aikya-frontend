import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.signup({ fullName, email, password });
      
      if (response.success) {
        // Show success message (don't auto-login)
        toast({
          title: "Account Created!",
          description: `Your account has been created successfully. Please login to continue.`,
        });
        
        // Redirect to dashboard (which will show login)
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.response?.data?.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Aikya Builds Future</title>
        <meta name="description" content="Create your Aikya Builds Future account" />
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

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-card-glass rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Create Account
              </h1>
              <p className="font-body text-muted-foreground">
                Sign up to access Aikya Builders services
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="font-body text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-navy-light border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-body text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tharun@gmail.com"
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
                    placeholder="••••••"
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

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="font-body text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-navy-light border-border text-foreground placeholder:text-muted-foreground pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold py-6 text-base glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              {/* Log In Link */}
              <div className="text-center mt-6">
                <span className="font-body text-sm text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-body text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Log in
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

export default SignUp;
