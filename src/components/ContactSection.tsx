import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";

interface ContactData {
  heading: string;
  headingHighlight: string;
  description: string;
  companyName: string;
  address: string;
  contactPersons: string;
  phone: string;
  email: string;
  mapCoordinates: string;
}

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await cmsAPI.getContact();
        if (response.success && response.data) {
          setContactData(response.data);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            {contactData?.heading} <span className="text-gray-500 italic">{contactData?.headingHighlight}</span>
          </h2>
          <p className="mx-auto max-w-xl font-body text-gray-600 text-sm sm:text-base px-4">
            {contactData?.description}
          </p>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 sm:px-5 sm:py-4 font-body text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 sm:px-5 sm:py-4 font-body text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 sm:px-5 sm:py-4 font-body text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <textarea
              placeholder="Tell us about your requirements..."
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 sm:px-5 sm:py-4 font-body text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 sm:px-8 sm:py-4 font-body text-sm sm:text-base font-semibold text-white transition-all hover:bg-gray-800 shadow-lg active:scale-95"
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
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-sm sm:text-base font-semibold text-gray-900">Office Address</h4>
                <div className="mt-1 font-body text-xs sm:text-sm text-gray-600 space-y-1 break-words">
                  <p className="font-medium">{contactData?.companyName}</p>
                  <p className="leading-relaxed">{contactData?.address}</p>
                  <p className="text-gray-700">{contactData?.contactPersons}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-sm sm:text-base font-semibold text-gray-900">Phone</h4>
                <div className="mt-1 font-body text-xs sm:text-sm text-gray-600 space-y-1">
                  <a href={`tel:${contactData?.phone}`} className="hover:text-gray-900 transition-colors">
                    {contactData?.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-sm sm:text-base font-semibold text-gray-900">Email</h4>
                <a 
                  href={`mailto:${contactData?.email}`} 
                  className="mt-1 font-body text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors break-all block"
                >
                  {contactData?.email}
                </a>
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
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <iframe
            src={`https://maps.google.com/maps?q=${contactData?.mapCoordinates}&z=15&output=embed`}
            width="100%"
            height="300"
            className="rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl h-[300px] sm:h-[350px] md:h-[400px]"
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
    </section>
  );
};

export default ContactSection;
