import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsItemsAPI } from "@/services/api";
import images from "@/assets/imageAssets";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await cmsItemsAPI.getServices();
        setServices(response.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  if (loading) {
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
        <title>Services | Aikya Builds Future - Infrastructure Development</title>
        <meta
          name="description"
          content="Aikya Builds Future offers comprehensive infrastructure services including Highway Construction, Warehouse Development, and Integrated Township projects across India."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${images.services.highway[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-6">
                <div className="bg-gray-900 text-white px-6 py-3 rounded inline-block">
                  <span className="font-heading text-2xl font-bold">aikya</span>
                </div>
                <p className="font-body text-sm text-gray-600 mt-2">Building Future</p>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Our Services
              </h1>
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Infrastructure Solutions
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                Aikya Builds Future offers a complete range of infrastructure development services, from highways and commercial projects to integrated township development. Our expertise spans across multiple sectors, delivering quality and excellence in every project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service: any, index: number) => (
          <section key={index} className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Images Grid */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  {service.image && (
                    <div className="col-span-2">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-3xl shadow-lg w-full object-cover h-64"
                      />
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <p className="font-body text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    {(service.features || []).map((feature: any, fIndex: number) => (
                      <div key={fIndex} className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="font-body text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Your <span className="text-gray-400 italic">Infrastructure Vision?</span>
              </h2>
              <p className="font-body text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Partner with Aikya Builds Future for world-class infrastructure development that exceeds expectations
              </p>
              <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-body font-semibold hover:bg-gray-100 transition-all shadow-lg">
                Get Started Today
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Services;
