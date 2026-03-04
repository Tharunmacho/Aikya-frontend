import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset request
    setTimeout(() => {
      toast({
        title: "Reset Link Sent!",
        description: "If an account exists with this email, you will receive a password reset link.",
      });
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Aikya Builds Future</title>
        <meta name="description" content="Reset your password" />
      </Helmet>

      <div className="min-h-screen bg-navy-gradient relative overflow-hidden flex items-center justify-center">
        {/* Cosmic Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-glow/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="stars absolute inset-0"></div>
        </div>

        {/* Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-card-glass rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Forgot Password
              </h1>
              <p className="font-body text-muted-foreground text-base">
                Enter your email to reset your password
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

              {/* Reset Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold py-6 text-base glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending Reset Link..." : "Reset Password"}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center">
                <span className="font-body text-sm text-muted-foreground">
                  Remember your password?{" "}
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
};

export default ForgotPassword;
