import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Build <span className="text-gray-500 italic">Together</span>
          </h2>
          <p className="mx-auto max-w-xl font-body text-gray-600 text-sm md:text-base">
            Ready to transform your dreams into reality? Partner with India's leading real estate developer.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <textarea
              placeholder="Tell us about your requirements..."
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-body font-semibold text-white transition-all hover:bg-gray-800 shadow-lg"
            >
              {submitted ? "Message Sent!" : "Send Enquiry"}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900">Office Address</h4>
                <div className="mt-1 font-body text-sm text-gray-600 space-y-1">
                  <p>AIKYA BUILDERS PVT LTD</p>
                  <p>NO 2, EDEN PARK STREET, KRUNJI NAGAR, WEST TAMBARAM, CHENNAI - 600045</p>
                  <p>B. GOPALAKRISHNAN / M B FURHAN SIDDIQ</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900">Phone</h4>
                <div className="mt-1 font-body text-sm text-gray-600 space-y-1">
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900">Email</h4>
                <p className="mt-1 font-body text-sm text-gray-600">info@aikyabuildsfuture.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <iframe
            src="https://maps.google.com/maps?q=12.92,80.12&z=15&output=embed"
            width="100%"
            height="400"
            className="rounded-2xl shadow-xl"
            allowFullScreen
            loading="lazy"
            title="Aikya Builders Location"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
