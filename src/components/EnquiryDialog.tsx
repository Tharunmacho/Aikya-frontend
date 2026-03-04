import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnquiryDialog = ({ open, onOpenChange }: EnquiryDialogProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Enquiry Submitted!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] !bg-white border-gray-200 shadow-2xl [&>button]:text-gray-600 [&>button]:hover:text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-gray-900 text-center">
            Share Your Vision
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center font-body">
            Tell us about your venture idea and we'll help you make it a reality
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <div>
            <textarea
              placeholder="Tell us about your venture idea..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-body font-semibold text-white transition-all hover:bg-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialog;
