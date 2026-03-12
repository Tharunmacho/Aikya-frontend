import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useState, useEffect } from "react";
import { cmsItemsAPI } from "@/services/api";
import { MapPin, Briefcase, Clock } from "lucide-react";
import images from "@/assets/imageAssets";

const Careers = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const response = await cmsItemsAPI.getPositions();
        setPositions(response.data || []);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCareersData();
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
        <title>Careers - Join Aikya | Aikya Builds Future</title>
        <meta
          name="description"
          content="Join the Aikya Builds Future team and build your career with India's leading real estate and infrastructure company."
        />
      </Helmet>

      <Navbar />
      <FloatingContactButtons />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${images.projects.commercial[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="mx-auto max-w-7xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <div className="bg-gray-900 text-white px-6 py-3 rounded inline-block">
                  <span className="font-heading text-2xl font-bold">aikya</span>
                </div>
                <p className="font-body text-sm text-gray-600 mt-2">Building Future</p>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h1>
              
              <p className="font-body text-lg text-gray-600 max-w-3xl mx-auto">
                Build your career with a company that builds dreams.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl">
            {positions && positions.length > 0 ? (
              <div className="space-y-6">
                {positions.map((job: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {job.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span className="font-body text-sm">{job.location}</span>
                            </div>
                          )}
                          {job.department && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-body text-sm">{job.department}</span>
                            </div>
                          )}
                          {job.type && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="font-body text-sm">{job.type}</span>
                            </div>
                          )}
                        </div>
                        <p className="font-body text-gray-600">
                          {job.description}
                        </p>
                      </div>
                      <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-body font-semibold hover:bg-gray-800 transition-all whitespace-nowrap">
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-3xl p-16 text-center shadow-lg"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No Current Openings
                </h2>
                <p className="font-body text-gray-600 mb-4">
                  We currently don't have any open positions.
                </p>
                <p className="font-body text-gray-500">
                  Please check back later for new opportunities.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Work <span className="text-gray-500">With Us?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Career Growth",
                  description: "We invest in your professional development with training programs, mentorship, and clear career progression paths."
                },
                {
                  title: "Work-Life Balance",
                  description: "Enjoy flexible work arrangements, comprehensive benefits, and a supportive environment that values your well-being."
                },
                {
                  title: "Innovation Culture",
                  description: "Be part of cutting-edge projects where your ideas matter and innovation is encouraged at every level."
                }
              ].map((benefit: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="font-body text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Interested in Joining Our Team?
              </h2>
              <p className="font-body text-gray-600 mb-8">
                Send us your resume and we'll reach out when we have opportunities that match your profile.
              </p>
              <a
                href="mailto:careers@aikyabuildsfuture.com"
                className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-body font-semibold hover:bg-gray-800 transition-all shadow-lg"
              >
                Send Your Resume
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Careers;
