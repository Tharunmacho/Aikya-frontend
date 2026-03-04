import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Users, Landmark, TrendingUp, Package, CheckCircle2, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import images from "@/assets/imageAssets";

const PartnerWithUs = () => {
  const [partnershipData, setPartnershipData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    partnerType: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPartnershipData = async () => {
      try {
        const response = await cmsAPI.getPartnership();
        setPartnershipData(response.data);
      } catch (error) {
        console.error("Error fetching partnership:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartnershipData();
  }, []);

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      partnerType: prev.partnerType.includes(value)
        ? prev.partnerType.filter((type) => type !== value)
        : [...prev.partnerType, value],
    }));
  };

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
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        partnerType: [],
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const getIcon = (iconName: string) => {
    const icons: any = { Users, Landmark, TrendingUp, Package };
    return icons[iconName] || Users;
  };

  if (loading || !partnershipData) {
    return (
      <>
        <Navbar />
        <div className="pt-24 section-padding text-center">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Partner with Us | Aikya Builds Future</title>
        <meta
          name="description"
          content="Join hands with Aikya Builds Future. Opportunities for channel partners, landowners, investors, and vendors to grow together."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block mb-6">
                <div className="bg-gray-900 text-white px-6 py-3 rounded inline-block">
                  <span className="font-heading text-2xl font-bold">aikya</span>
                </div>
                <p className="font-body text-sm text-gray-600 mt-2">Building Future</p>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our Visionary <span className="text-gray-500 italic">Network</span>
              </h1>

              <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Collaborate with us to drive innovation and growth. Together, we can create impactful
                projects and build a brighter future
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Partner With <span className="text-gray-500 italic">Aikya?</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-xl"
            >
              <p className="font-body text-lg text-gray-700 leading-relaxed mb-8">
                At Aikya, partnerships are the foundation of our success. With decades of experience in delivering
                landmark projects, we have built a reputation for trust, innovation, and excellence. By partnering
                with us, you gain access to a network of resources, expertise, and opportunities that drive growth.
                Together, we can create projects that define the future.
              </p>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                By collaborating with us, you join a network that combines decades of expertise with cutting-edge
                resources. Whether it's creating infrastructure that drives progress or developing projects that
                redefine possibilities, our partnerships empower mutual growth and success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partnership Categories */}
        <section id="categories" className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Partnership <span className="text-gray-500">Categories</span>
              </h2>
            </motion.div>

            <div className="grid gap-12">
              {/* Channel Partners */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="order-2 md:order-1">
                  <img
                    src={images.partners[0]}
                    alt="Channel Partners"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">Channel Partners</h3>
                  <p className="font-body text-gray-600 mb-6">
                    Join as a channel partner and leverage our reputation and resources to expand your network,
                    boost your credibility, and achieve unparalleled growth in the industry. Together, we can reach
                    new heights.
                  </p>
                </div>
              </motion.div>

              {/* Landowners */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">Landowners</h3>
                  <p className="font-body text-gray-600 mb-6">
                    Transform your land into a valuable asset with our innovative and sustainable development
                    projects. We ensure that your land's potential is fully realized while maintaining transparency
                    and trust throughout the process.
                  </p>
                </div>
                <div>
                  <img
                    src={images.partners[1]}
                    alt="Landowners"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Investors */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="order-2 md:order-1">
                  <img
                    src={images.partners[2]}
                    alt="Investors"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">Investors</h3>
                  <p className="font-body text-gray-600 mb-6">
                    Become a part of projects that deliver high returns and meaningful impact. As an investor,
                    you'll gain access to lucrative opportunities, comprehensive insights, and a trusted partnership
                    for long-term growth.
                  </p>
                </div>
              </motion.div>

              {/* Vendors */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">Vendors</h3>
                  <p className="font-body text-gray-600 mb-6">
                    We value partnerships with quality vendors who help us deliver excellence. Join our network to
                    provide materials and services that contribute to successful project execution and shared success.
                  </p>
                </div>
                <div>
                  <img
                    src={images.partners[3]}
                    alt="Vendors"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Partnering with us is <span className="text-gray-500 italic">Easy</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-body text-lg text-gray-600 mb-8">
                  Have questions or need guidance? Our team is always ready to assist you with personalized support
                  and expert advice. Reach out to us anytime—it's our pleasure to help you.
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl"
              >
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-gray-900 focus:outline-none font-body text-gray-900 placeholder:text-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-gray-900 focus:outline-none font-body text-gray-900 placeholder:text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email Id *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-gray-900 focus:outline-none font-body text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Channel Partners", "Land Owner", "Investor", "Vendor"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.partnerType.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900"
                        />
                        <span className="font-body text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <textarea
                    placeholder="Your Message to us *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-gray-900 focus:outline-none font-body text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-full font-body font-semibold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                  <Send className="h-5 w-5" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PartnerWithUs;
