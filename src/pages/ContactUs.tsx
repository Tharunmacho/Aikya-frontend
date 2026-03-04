import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState } from "react";
import EnquiryDialog from "@/components/EnquiryDialog";
import images from "@/assets/imageAssets";

const ContactUs = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact Us | Aikya Builds Future</title>
        <meta
          name="description"
          content="Get in touch with Aikya Builders. We're here to help with all your real estate needs."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main>
        {/* Hero Section with Background Image */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${images.locations.chennai})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-white"
          >
            <h1 className="font-heading text-6xl md:text-7xl font-bold mb-4">
              Contact <span className="text-blue-300">Us</span>
            </h1>
          </motion.div>
        </section>

        {/* Quick Actions */}
        <section className="section-padding bg-white -mt-16 relative z-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Send Email */}
              <a
                href="mailto:enquiry@aikyabuildsfuture.com"
                className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-6 hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">Send a Mail</h3>
                </div>
              </a>

              {/* Chat on WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-6 hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-green-600"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">Chat on WhatsApp</h3>
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Let's Connect Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h2>
              <p className="font-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We're here to answer your queries and help you get started.
              </p>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="bg-gray-900 text-white px-12 py-5 rounded-full font-body font-semibold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl"
              >
                Enquire Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                Head Office
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Address</h3>
                <div className="font-body text-gray-600 space-y-2">
                  <p className="font-semibold">Aikya Builders and Promoters</p>
                  <p>No.247/B, Velachery Main Road,</p>
                  <p>Selaiyur, Chennai, Tamil Nadu 600073, India</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Email</h3>
                <a
                  href="mailto:enquiry@aikyabuildsfuture.com"
                  className="font-body text-gray-600 hover:text-gray-900 transition-colors"
                >
                  enquiry@aikyabuildsfuture.com
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Phone</h3>
                <div className="font-body text-gray-600 space-y-2">
                  <p>
                    <a href="tel:+919042666555" className="hover:text-gray-900 transition-colors">
                      +91 9042 666 555
                    </a>
                  </p>
                  <p>
                    <a href="tel:+914460096009" className="hover:text-gray-900 transition-colors">
                      +91 44 6009 6009
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-gray-800 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.097!2d80.2074!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA4MMKwMTInMjYuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="500"
                className="rounded-3xl shadow-2xl border-0"
                allowFullScreen
                loading="lazy"
                title="Aikya Builders Location"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Collaborate */}
        <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Looking to Collaborate with Us?
              </h2>
              <p className="font-body text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Partner with us to create impactful projects and drive mutual growth
              </p>
              <a
                href="/partner-with-us"
                className="inline-block bg-white text-gray-900 px-12 py-5 rounded-full font-body font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
              >
                Explore Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Enquiry Dialog */}
      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} />
    </>
  );
};

export default ContactUs;
